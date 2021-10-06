"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
from flask import Flask, request, jsonify, url_for, Blueprint
#from api.models import db, User, Pareja, Tiempo_proceso, Centro, Tratamiento
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

#### FILLS TEST DATABASE
@api.route("/testdb", methods=['GET'])
def fill_database():
    f = open("/workspace/final-project-pineapple/src/api/testDatabase.JSON", "r")
    content = f.read()
    jsondecoded = json.loads(content)

#### USERS
    for user in jsondecoded['users']:
        new_user = User(name = user['name'], email = user['email'], edad = user['edad'], num_aborto = user['num_aborto'], password = user['password'])
        db.session.add(new_user)
    
    db.session.commit()
    users = User.query.all()
    users = list(map (lambda user: user.serialize(), users)) 

#### CENTROS
    for centro in jsondecoded['centros']:
        new_centro = Centro(tipo = centro['tipo'], peso = centro['peso'])
        db.session.add(new_centro)
    
    db.session.commit()
    centros = Centro.query.all()
    centros = list(map (lambda centro: centro.serialize(), centros)) 

#### TRATAMIENTOS
    for tratamiento in jsondecoded['centros']:
        new_tratamiento = Tratamiento(tipo = tratamiento['tipo'], peso = tratamiento['peso'])
        db.session.add(new_tratamiento)
    
    db.session.commit()
    tratamientos = Tratamiento.query.all()
    tratamientos = list(map (lambda tratamiento: tratamiento.serialize(), tratamientos)) 

#### TIEMPO PROCESO
    for tiempo in jsondecoded['tiempo_proceso']:
        new_tiempo = Tiempo_proceso(menor_valor = tiempo['menor_valor'], mayor_valor = tiempo['mayor_valor'], peso = tiempo['peso'])
        db.session.add(new_tiempo)
    
    db.session.commit()
    tiempos = Tiempo_proceso.query.all()
    tiempos = list(map (lambda tiempo: tiempo.serialize(), tiempos))

#### PAREJAS
    for pareja in jsondecoded['pareja']:
        new_pareja = Pareja(opcion = pareja['opcion'], peso = pareja['peso'])
        db.session.add(new_pareja)
    
    db.session.commit()
    parejas = Pareja.query.all()
    parejas = list(map (lambda pareja: pareja.serialize(), parejas))   

    return jsonify({"msg": "OK!"}), 200



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200


#### LOGIN
@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    for user in jsondecoded['users']:
        new_user = User(name = user['name'], email = user['email'], edad = user['edad'], num_aborto = user['num_aborto'], password = user['password'])
    
    if username != new_user['name'] or password != new_user['password']:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

""" @api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200  """


