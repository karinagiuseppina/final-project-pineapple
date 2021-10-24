"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Couple, Treatment, Process, Center, Conversation, Message
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
import json
import datetime
import bcrypt
from sqlalchemy import update
from sqlalchemy import and_


api = Blueprint('api', __name__)



# TEST DB    
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
        decoded_password = hashed_password.decode('utf8')
        new_user = User(name = user['name'], email = user['email'], password = decoded_password, age = user['age'], abortion_num = user['abortion_num'])
        db.session.add(new_user)

    db.session.commit()

    return jsonify({"msg": "OK!"})


@api.route("/findpossiblematches", methods=["GET"])
# @jwt_required()
def find_possible_matches():
    # actual_user_id = get_jwt_identity()
    user_id = 2
    actual_user = User.query.filter_by(id=user_id).first()

    result = User.query.filter(and_(User.age <= (actual_user.age+8), User.age > (actual_user.age-8), User.id != user_id)).all()
    
    print(result)
    array_users= result
    # for user in result:
    #     # if actual_user.treatment_id is not None:
    #     #     print(user)
    #         if user.treatment_id == actual_user.treatment_id:
                
    #             # if actual_user.process_id is not None and user.process_id is not None: 
    #                 if user.process_id <= (actual_user.process_id + 4) and (user.process_id > actual_user.process_id -4 ):
    #                     array_users.append(user)
           
        
    print(array_users)            
    posibles_matches_users = list(map (lambda user: user.serialize(), array_users))
    
    return jsonify(posibles_matches_users), 200

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
    description = request.json.get("description", None) 

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
    user.description = description

    if password is not None:
        password = password.encode('utf8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)
        decoded_password = hashed_password.decode('utf8')

        user.password: decoded_password


    db.session.commit()

    return jsonify({"msg": "ok"}), 200

@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()

    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@api.route("/user/<id>", methods=["GET"])
def get_user(id):
    user = User.query.filter_by(id=id).first()
    return jsonify(user.serialize()), 200

@api.route("/user/show-info/<id>", methods=["GET"])
def get_user_info(id):
    user = User.query.filter_by(id=id).first()
    user_obj = {
            "id": user.id,
            "name": user.name,
            "age": user.age,
            "abortion_num": user.abortion_num,
            "description": user.description
        }
    
    if user.center_id is not None: 
        center_type = Center.query.filter_by(id=user.center_id).first()
        user_obj["center"] = center_type.type

    if user.treatment_id is not None:    
        treatment_type = Treatment.query.filter_by(id=user.treatment_id).first()
        user_obj["treatment"] = treatment_type.type

    if user.process_id is not None: 
        process_range = Process.query.filter_by(id=user.process_id).first()
        user_obj["process"] = '{0} - {1}'.format(process_range.min_value, process_range.max_value)

    if user.couple_id is not None: 
        couple_type = Couple.query.filter_by(id=user.couple_id).first()
        user_obj["couple"] = couple_type.option

    return jsonify(user_obj), 200

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
    decoded_password = hashed_password.decode('utf8')
    user = User(name=name, email=email, age=age, password=decoded_password)

    db.session.add(user)
    db.session.commit()

    # access_token = create_access_token(user.id)

    # return jsonify({"access_token" : access_token})

    return jsonify(user.id), 200

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


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None).encode('utf8')
    
    user = User.query.filter_by(email=email).first()

    if user is None or email != user.email or email is None or not bcrypt.checkpw(password, user.password.encode('utf8')):
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token = create_access_token(identity=user.id)
    print(access_token)
    return jsonify({"user_id": user.id, "name": user.name, "token": access_token})


@api.route('/start-conversation', methods=["POST"])
def start_conversation():
    conversation = Conversation()
    conversation.save()
    return jsonify(conversation.serialize()), 200

@api.route('/conversation/<int:conversation_id>/messages', methods=["GET"])
def get_conversation_messages(conversation_id):
    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    messages = list(map(lambda message: message.serialize(), messages))
    return jsonify(messages), 200

@api.route('/conversation/<int:conversation_id>/send-message', methods=["GET","POST"])
def send_message(conversation_id):
    json = request.get_json()

    new_message_text = json.get('message')
    sender_id = json.get('sender_id')

    message = Message(
        value=new_message_text, 
        created_at=datetime.date(year=2021, month=1, day=1), 
        user_id=sender_id, 
        conversation_id=conversation_id
    )
    message.save()
    return jsonify(message.serialize()), 200

