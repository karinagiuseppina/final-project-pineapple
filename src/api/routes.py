"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pareja, Tratamiento, Tiempo_proceso, Centro
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
import json
import bcrypt

api = Blueprint('api', __name__)

@api.route("/testdb", methods=['GET'])
def fill_database():
    f = open("/workspace/final-project-pineapple/src/api/testDatabase.JSON", "r")
    content = f.read()
    jsondecoded = json.loads(content)

    for centro in jsondecoded['centros']:
        new_centro = Centro(tipo = centro['tipo'], peso = centro['peso'])
        db.session.add(new_centro)

    for tratamiento in jsondecoded['tratamientos']:
        new_tratamiento = Tratamiento(tipo = tratamiento['tipo'], peso = tratamiento['peso'])
        db.session.add(new_tratamiento)

    for rango_tiempo_proceso in jsondecoded['tiempo_proceso']:
        new_tiempo = Tiempo_proceso(menor_valor = rango_tiempo_proceso['menor_valor'], mayor_valor = rango_tiempo_proceso['mayor_valor'], peso = rango_tiempo_proceso['peso'])
        db.session.add(new_tiempo)

    for pareja in jsondecoded['pareja']:
        new_pareja = Pareja(opcion = pareja['opcion'], peso = pareja['peso'])
        db.session.add(new_pareja)
    
    for user in jsondecoded['users']:
        password = user['password'].encode('utf8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)
        new_user = User(name = user['name'], email = user['email'], password = hashed_password, edad = user['edad'], num_aborto = user['num_aborto'])
        db.session.add(new_user)

    db.session.commit()

    return jsonify({"msg": "OK!"})


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route("/findpossiblematches", methods=["GET"])
@jwt_required()
def find_possible_matches():
    actual_user_id = get_jwt_identity()
    actual_user = User.query.filter_by(id=current_user_id).first()

    result = session.query(User).filter(User.edad + 8 > actual_user.edad, User.edad - 8 > actual_user.edad)

    array_users = []
    for user in result:
        if actual_user.tratamiento is not None and user.tratamiento == actual_user.tratamiento):
            array_users.append(user)
        
        if actual_user.tiempo_proceso is not None: 
            if user.tiempo_proceso < 4 + actual_user.tiempo_proceso and user.tiempo_proceso > 4 - actual_user.tiempo_proceso:
                array_users.append(user)


    return jsonify(array_users), 200