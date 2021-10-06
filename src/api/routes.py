"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


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

@api.route("/signup", methods=["POST"])
def create_user():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    edad = request.json.get("edad", None)
    num_aborto = request.json.get("num_aborto", None)
    pareja = request.json.get("pareja", None)
    tiempo_proceso = request.json.get("tiempo_proceso", None)
    centro = request.json.get("centro", None)
    tratamiento = request.json.get("tratamiento", None)


    # Query your database for username and password
    if email is None or password is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    user = User(email=email, name=name, password = password, pareja= pareja, num_aborto, tiempo_proceso = tiempo_proceso,centro = centro, tratamiento = tratamiento)

    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200