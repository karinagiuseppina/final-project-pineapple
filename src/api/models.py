from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
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
    # cloudinary_id = db.Column(db.Integer, db.ForeignKey('cloudinary_image.id'))

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

class Couple(db.Model):
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

class Process(db.Model):
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

class Center(db.Model):
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

class Treatment(db.Model):
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

class Cloudinary_image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.String(100), unique=True, nullable=False)
    public_id = db.Column(db.String(100), unique=False, nullable=False)
    version_id= db.Column(db.String(100), unique=False, nullable=False)
    version = db.Column(db.String(100), unique=False, nullable=False)
    secure_url = db.Column(db.String(150), unique=False, nullable=False)
    # user = db.relationship("User", backref="cloudinary_image", uselist=False, lazy=True)

    def __repr__(self):
        return '%r' % self.secure_url

    def serialize(self):
        return {
            "asset_id": self.asset_id,
            "public_id": self.public_id,
            "version_id": self.version_id,
            "version": self.version, 
            "secure_url": self.secure_url
        }