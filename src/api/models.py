from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    edad = db.Column(db.Integer, unique=False, nullable=False)
    num_aborto = db.Column(db.Integer, unique=False, nullable=False)
    pareja_id = db.Column(db.Integer, db.ForeignKey('pareja.id'), nullable=False)
    tiempo_proceso_id = db.Column(db.Integer, db.ForeignKey('tiempo_proceso.id'), nullable=False)
    centro_id = db.Column(db.Integer, db.ForeignKey('centro.id'), nullable=False)
    tratamiento_id = db.Column(db.Integer, db.ForeignKey('tratamiento.id'), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "edad": self.edad
        }

class Pareja(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    opcion = db.Column(db.Integer, unique=False, nullable=False) #no tengo, tengo una relación con una mujer, tengo una relación con un hombre, tengo una relación
    peso = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='pareja', lazy=True)

    def __repr__(self):
        return '<tiene_pareja %r>' % self.tiene_pareja

    def serialize(self):
        return {
            "id": self.id,
            "tiene_pareja": self.tiene_pareja
        }

class Tiempo_proceso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    menor_valor = db.Column(db.Integer, unique=False, nullable = False) 
    mayor_valor = db.Column(db.Integer, unique=False, nullable = False)
    peso = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='tiempo_proceso', lazy=True)

    def __repr__(self):
        return '<rango %r>' % self.rango

    def serialize(self):
        return {
            "id": self.id,
            "mayor_valor": self.mayor_valor,
            "menor_valor": self.menor_valor
        }

class Centro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='centro', lazy=True)

    def __repr__(self):
        return '<tipo %r>' % self.tipo

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo
        }

class Tratamiento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)
    users = db.relationship('User', backref='tratamiento', lazy=True)

    def __repr__(self):
        return '<tipo %r>' % self.tipo

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo
        }