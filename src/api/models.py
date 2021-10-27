
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import and_

db = SQLAlchemy()

class GeneralModel: 
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def commit ():
        db.session.commit()

    def add (self):
        db.session.add(self)
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

connections = db.Table('connections',
    db.Column('user_connected', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('user_connecting', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

chats = db.Table('chats',
    db.Column('chat_id', db.Integer, db.ForeignKey('chat.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=True)
    profile_img = db.Column(db.String(250), unique=False, nullable=True)
    age = db.Column(db.Integer, unique=False, nullable=False)
    abortion_num = db.Column(db.Integer, unique=False, nullable=True)

    couple_id = db.Column(db.Integer, db.ForeignKey('couple.id'), nullable=True)
    process_id = db.Column(db.Integer, db.ForeignKey('process.id'), nullable=True)
    center_id = db.Column(db.Integer, db.ForeignKey('center.id'), nullable=True)
    treatment_id = db.Column(db.Integer, db.ForeignKey('treatment.id'), nullable=True)

    users_connected  = db.relationship("User",
                        secondary=connections,
                        primaryjoin=id==connections.c.user_connecting,
                        secondaryjoin=id==connections.c.user_connected,
                        backref="users_connecting")
    
    chats = db.relationship('Chat', secondary=chats, lazy='subquery',
        backref=db.backref('users', lazy=True))

    notifications = db.relationship('Notification', backref='user', lazy=True)

    messages = db.relationship('Message', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age,
            "abortion_num": self.abortion_num,
            "couple_id": self.couple_id,
            "process_id": self.process_id,
            "treatment_id": self.treatment_id,
            "center_id": self.center_id,
            "description": self.description,
            "profile_img": self.profile_img
        }

    def serialize_to_show(self): 
        user_obj = {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "abortion_num": self.abortion_num,
            "description": self.description,
            "profile_img": self.profile_img
        }
    
        if self.center_id is not None: 
            user_obj["center"] = self.center.type

        if self.treatment_id is not None:    
            user_obj["treatment"] = self.treatment.type

        if self.process_id is not None: 
            user_obj["process"] = '{0} - {1}'.format(self.process.min_value, self.process.max_value)

        if self.couple_id is not None: 
            user_obj["couple"] = self.couple.option
        
        return user_obj
    
    def get_user_by_id (id):
        return User.query.filter_by(id=id).first()

    def get_user_by_email (email):
        return User.query.filter_by(email=email).first()
    
    def get_all_users ():
        return User.query.all()
    
    def get_connected (self):
        return self.users_connected
    
    def get_chats (self):
        return self.chats
    
    def get_notifications (self):
        return self.notifications
    
    def filter_by_age (self):
        return User.query.filter(and_(User.age <= (self.age+8), User.age > (self.age-8), User.id != self.id)).all()
    
    def filter_by_treatment(self):
        return User.query.filter(and_(User.treatment_id == self.treatment_id, User.id != self.id)).all()

    def filter_by_process(self):
        return User.query.filter(and_(User.process_id is not None, User.process_id <= (self.process_id + 1), User.process_id > (self.process_id - 1), User.id != self.id)).all()

    def filter_by_abortion (self):
        return User.query.filter(and_(User.abortion_num is not None, User.abortion_num <= (self.abortion_num+2), User.abortion_num > (self.abortion_num-2), User.id != self.id)).all()

    def filter_by_center(self):
        return User.query.filter(and_(User.center_id == self.center_id, User.id != self.id)).all()

class Couple(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    option = db.Column(db.String(50), unique=True, nullable=False) 
    weight = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='couple', lazy=True)

    def __repr__(self):
        return '%r' % self.option

    def serialize(self):
        return {
            "id": self.id,
            "option": self.option
        }

    def get_all_couples ():
        return Couple.query.all()
    
    def get_couple_by_id (id):
        return Couple.query.filter_by(id=id).first()

class Process(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    max_value = db.Column(db.Integer, unique=False, nullable = False) 
    min_value = db.Column(db.Integer, unique=False, nullable = False)
    weight = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='process', lazy=True)

    def __repr__(self):
        return '{0} - {1}'.format(self.min_value, self.max_value)

    def serialize(self):
        return {
            "id": self.id,
            "max_value": self.max_value,
            "min_value": self.min_value
        }
    
    def get_all_process():
        return Process.query.all()

    def get_process_by_id (id):
        return Process.query.filter_by(id=id).first()

class Center(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)
    weight = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='center', lazy=True)

    def __repr__(self):
        return '%r' % self.type

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type
        }
    
    def get_all_centers(): 
        return Center.query.all()
    
    def get_center_by_id (id):
        return Center.query.filter_by(id=id).first()

class Treatment(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), unique=True, nullable=False)
    weight = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='treatment', lazy=True)

    def __repr__(self):
        return '%r' % self.type

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type
        }
    
    def get_all_treatment ():
        return Treatment.query.all()
    
    def get_treatment_by_id (id):
        return Treatment.query.filter_by(id=id).first()

class Chat(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, primary_key=False)
    
    messages = db.relationship('Message', backref='chat', lazy=True)

    def __repr__(self):
        return '%r' % self.id

    def serialize(self):
        users = self.get_chat_users()
        users = list(map(lambda user: user.serialize(), users))
        return {
            "id": self.id,
            "is_active": self.is_active,
            "users": users
        }
    
    def get_all_chats ():
        return Chat.query.all()
    
    def get_chat_by_id (id):
        return Chat.query.filter_by(id=id).first()

    def get_chat_users(self):
        return self.users
    
class Message(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(250), unique=False, nullable=False)
    pub_date = db.Column(db.DateTime, nullable=False,
        default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=True)

    def __repr__(self):
        return '<Message %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "value": self.value,
            "pub_date": "{0}/{1}/{2}".format(self.pub_date.day,self.pub_date.month,self.pub_date.year),
            "hour":"{0}:{1}".format(self.pub_date.hour,self.pub_date.minute),
            "user_id": self.user_id,
            "chat_id": self.chat_id        
            }

class Notification(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    is_new = db.Column(db.Boolean, primary_key=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __repr__(self):
        return  '%r' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name, 
            "is_new": self.is_new, 
            "user_id": self.user_id
        }
    
    def get_all_notifications ():
        return Notification.query.all()
    
    def get_notification_by_id (id):
        return Notification.query.filter_by(id=id).first()


            
            
            
            
            
