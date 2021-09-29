from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
        }

class Pareja(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tiene_pareja = db.Column(db.Integer, unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)


    def __repr__(self):
        return '<tiene_pareja %r>' % self.tiene_pareja

    def serialize(self):
        return {
            "id": self.id,
            "tiene_pareja": self.tiene_pareja
        }

class Orientacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    orientacion = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)


    def __repr__(self):
        return '<orientacion %r>' % self.orientacion

    def serialize(self):
        return {
            "id": self.id,
            "orientacion": self.orientacion
        }

class Edad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rango = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<rango %r>' % self.rango

    def serialize(self):
        return {
            "id": self.id,
            "rango": self.rango
        }

class Tiempo_proceso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rango = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<rango %r>' % self.rango

    def serialize(self):
        return {
            "id": self.id,
            "rango": self.rango
        }

class Centro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<tipo %r>' % self.tipo

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo
        }

class Aborto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rango = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<rango %r>' % self.rango

    def serialize(self):
        return {
            "id": self.id,
            "rango": self.rango
        }

class Tratamiento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(20), unique=False, nullable=False)
    peso = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<tipo %r>' % self.tipo

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo
        }