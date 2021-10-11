"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Couple, Treatment, Process, Center
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
import json
import bcrypt
from sqlalchemy import update

api = Blueprint('api', __name__)

@api.route("/testdb", methods=['GET'])
def fill_database():
    f = open("/workspace/final-project-pineapple/src/api/testDatabase.JSON", "r")
    content = f.read()
    jsondecoded = json.loads(content)

    for center in jsondecoded['centers']:
        new_center = Center(type = center['type'], weight = center['weight'])
        db.session.add(new_center)

    for treatment in jsondecoded['treatments']:
        new_treatment = Treatment(type = treatment['type'], weight = treatment['weight'])
        db.session.add(new_treatment)

    for time_slot in jsondecoded['process_time_slots']:
        new_time = Process(min_value = time_slot['min_value'], max_value = time_slot['max_value'], weight = time_slot['weight'])
        db.session.add(new_time)

    for couple in jsondecoded['couples']:
        new_couple = Couple(option = couple['option'], weight = couple['weight'])
        db.session.add(new_couple)
    
    for user in jsondecoded['users']:
        password = user['password'].encode('utf8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)
        new_user = User(name = user['name'], email = user['email'], password = hashed_password, age = user['age'], abortion_num = user['abortion_num'])
        db.session.add(new_user)

    db.session.commit()

    return jsonify({"msg": "OK!"})


@api.route("/findpossiblematches", methods=["GET"])
@jwt_required()
def find_possible_matches():
    actual_user_id = get_jwt_identity()
    actual_user = User.query.filter_by(id=current_user_id).first()

    result = session.query(User).filter(User.age + 8 > actual_user.age, User.age - 8 > actual_user.age)

    array_users = []
    for user in result:
        if actual_user.treatment_id is not None and user.treatment_id == actual_user.treatment_id:
                array_users.append(user)
        
        if actual_user.process_id is not None: 
            if user.process_id < 4 + actual_user.process_id and user.process_id > 4 - actual_user.process_id:
                array_users.append(user)


    return jsonify(array_users), 200

@api.route("/editProfile", methods=["PUT"])
def edit_profile():
    # actual_user_id = get_jwt_identity()
    user_id = request.json.get("user_id", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None) 
    age = request.json.get("age", None) 
    abortion_num = request.json.get("abortion_num", None) 
    couple_id = request.json.get("couple_id", None) 
    process_id = request.json.get("process_id", None) 
    center_id = request.json.get("center_id", None) 
    treatment_id = request.json.get("treatment_id", None) 

    # if user_id != actual_user_id: 
    #     return jsonify({"msg": "Unauthorized"}), 401
    
    if name is None or email is None or age is None:
        return jsonify({"msg": "El nombre, email y age son obligatorios."})

    user = User.query.filter_by(id=user_id).first()
    user.name =  name
    user.age = age
    user.abortion_num = abortion_num
    user.couple_id = couple_id
    user.process_id = process_id
    user.center_id = center_id
    user.treatment_id = treatment_id

    if password is not None:
        password = password.encode('utf8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)

        user.password: hashed_password


    db.session.commit()

    return jsonify({"msg": "ok"}), 200

@api.route("/getdata", methods=["GET"])
@jwt_required()
def get_user_data():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    return jsonify(user.serialize()), 200


@api.route('/centers', methods=['GET'])
def get_centers():
    centers = Center.query.all()

    centers = list(map(lambda center: center.serialize(), centers))
    return jsonify(centers), 200

@api.route("/create-user", methods=["POST"])
def create_user():
    name = request.json.get("name")
    email =request.json.get("email")
    age = request.json.get("age")
    password = request.json.get("password").encode('utf8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

    user = User(name=name, email=email, age=age, password=hashed_password)

    print(user)
    db.session.add(user)
    db.session.commit()

    # access_token = create_access_token(user.id)

    # return jsonify({"access_token" : access_token})

    return jsonify(user.id)

@api.route("/update-abortion", methods=["PUT"])
# @jwt_required()
def update_abortion():
    
    # user_id = get_jwt_identity()
    abortion_num = request.json.get("abortion_num", None) 
    user_id = request.json.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    user.abortion_num = abortion_num
    db.session.commit()

    return jsonify(user.id), 200

@api.route("/update-center", methods=["PUT"])
# @jwt_required()
def update_center():
    
    # user_id = get_jwt_identity()
    center_id = request.json.get("center_id", None) 
    user_id = request.json.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    user.center_id= center_id
    db.session.commit()

    return jsonify(user.id), 200

@api.route("/update-couple", methods=["PUT"])
# @jwt_required()
def update_couple():
    
    # user_id = get_jwt_identity()
    couple_id = request.json.get("couple_id", None) 
    user_id = request.json.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    user.couple_id= couple_id
    db.session.commit()

    return jsonify(user.id), 200


@api.route("/update-treatment", methods=["PUT"])
# @jwt_required()
def update_treatment():
    
    # user_id = get_jwt_identity()
    treatment_id = request.json.get("treatment_id", None) 
    user_id = request.json.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    user.treatment_id= treatment_id
    db.session.commit()

    return jsonify(user.id), 200

@api.route("/update-processtimeslot", methods=["PUT"])
# @jwt_required()
def update_processtimeslot():
    
    # user_id = get_jwt_identity()
    process_id = request.json.get("process_id", None) 
    user_id = request.json.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    user.process_id= process_id
    db.session.commit()

    return jsonify(user.id), 200
    
# @api.route("/findpossiblematches", methods=["GET"])
# @jwt_required()
# def find_possible_matches():
@api.route('/couples', methods=['GET'])
def get_couples():
    couples = Couple.query.all()

    couples = list(map(lambda couple: couple.serialize(), couples))
    return jsonify(couples), 200

@api.route('/processtimeslots', methods=['GET'])
def get_process_time_slots():
    time_slots = Process.query.all()

    time_slots = list(map(lambda time_slot: time_slot.serialize(), time_slots))
    return jsonify(time_slots), 200

@api.route('/treatments', methods=['GET'])
def get_treatments():
    treatments = Treatment.query.all()

    treatments = list(map(lambda treatment: treatment.serialize(), treatments))
    return jsonify(treatments), 200
