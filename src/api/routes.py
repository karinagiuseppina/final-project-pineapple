"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Couple, Treatment, Process, Center, Chat, Message, Notification
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
import json
import datetime
import bcrypt
from sqlalchemy import update
from sqlalchemy import and_

import cloudinary
import cloudinary.uploader
import cloudinary.api

api = Blueprint('api', __name__)



# TEST DB    
@api.route("/testdb", methods=['GET'])
def fill_database():
    f = open("./testDatabase.JSON", "r")
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

def append_user(users, array):
    for user in array:
        if user in users:
            users[user] = users[user] + 1
        else :
            users[user] = 1
    
@api.route("/findpossiblematches", methods=["GET"])
@jwt_required()
def find_possible_matches():
    user_id = get_jwt_identity()
    actual_user = User.query.filter_by(id=user_id).first()

    users= {}
    array_users=[]

    result_filter_by_age = User.filter_by_age(actual_user)
    append_user(users, result_filter_by_age)

    result_filter_by_treatment = User.filter_by_treatment(actual_user)
    append_user(users, result_filter_by_treatment)

    if actual_user.process_id is not None: 
        result_filter_by_process = User.filter_by_process(actual_user)
        append_user(users, result_filter_by_process) 

    result_filter_by_couples = User.filter_by_couple(actual_user)
    append_user(users, result_filter_by_couples)
    

    if actual_user.abortion_num is not None:
        result_filter_by_abortion = User.filter_by_abortion(actual_user)
        append_user(users, result_filter_by_abortion)
      
       
    result_filter_by_centers = User.filter_by_center(actual_user)
    append_user(users, result_filter_by_centers)
    
    sort_users = sorted(users.items(), key=lambda x: x[1], reverse= True )

    for user in sort_users:
        if user[0] not in actual_user.users_connected:
            array_users.append(user[0])

    posibles_matches_users = list(map (lambda user: user.serialize_to_show(), array_users))

    return jsonify(posibles_matches_users), 200


@api.route("/editProfile", methods=["PUT"])
@jwt_required()
def edit_profile():
    actual_user_id = get_jwt_identity()
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
    profile_img = request.json.get("profile_img", None) 


    if user_id != actual_user_id: 
        return jsonify({"msg": "Unauthorized"}), 401
    
    if name is None or email is None or age is None:
        return jsonify({"msg": "El nombre, email y age son obligatorios."})

    user = User.get_user_by_id(user_id)
    user.name =  name
    user.age = age
    user.abortion_num = abortion_num
    user.couple_id = couple_id
    user.process_id = process_id
    user.center_id = center_id
    user.treatment_id = treatment_id
    user.description = description

    if profile_img is not None:
        user.profile_img = profile_img


    if password is not None and password != "":
        password = password.encode('utf8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt)
        decoded_password = hashed_password.decode('utf8')

        user.password = decoded_password


    User.commit()

    return jsonify({"msg": "ok"}), 200

@api.route('/upload-file', methods=['PUT'])
@jwt_required()
def upload_file():
    files= request.files

    cloudinary.config( 
        cloud_name = os.getenv('cloud_name'), 
        api_key = os.getenv('api_key'), 
        api_secret = os.getenv('api_secret')
    )
    file_to_upload = request.files.get('file')
    if file_to_upload:
      upload_result = cloudinary.uploader.upload(file_to_upload)
      return jsonify({'profile_image': upload_result['secure_url']}), 200

    return jsonify(''), 400


@api.route("/users", methods=["GET"])
def get_users():
    users = User.get_all_users()

    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@api.route("/user/<id>", methods=["GET"])
def get_user(id):
    user= User.get_user_by_id(id)
    return jsonify(user.serialize()), 200

@api.route("/users/show-info", methods=["GET"])
def get_users_show_info():
    users = User.get_all_users()

    users = list(map(lambda user: user.serialize_to_show(), users))
    return jsonify(users), 200

@api.route("/user/show-info/<id>", methods=["GET"])
def get_user_info(id):
    user= User.get_user_by_id(id)
    return jsonify(user.serialize_to_show()), 200

@api.route('/centers', methods=['GET'])
def get_centers():
    centers = Center.get_all_centers()

    centers = list(map(lambda center: center.serialize(), centers))
    return jsonify(centers), 200

@api.route("/set-image", methods=["PUT"])
def set_image():
    
    profile_img = request.json.get("profile_img") 
    user_id = request.json.get("user_id")
    user= User.get_user_by_id(user_id)
    user.profile_img = profile_img
    User.commit()
    print(profile_img)

    return jsonify(user.id), 200

@api.route("/create-user", methods=["POST"])
def create_user():
    name = request.json.get("name")
    email =request.json.get("email")
    age = request.json.get("age")
    profile_img = request.json.get("profileImage")
    password = request.json.get("password").encode('utf8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
    decoded_password = hashed_password.decode('utf8')
    user = User(name=name, email=email, age=age, profile_img=profile_img, password=decoded_password)

    User.save(user)

    # access_token = create_access_token(user.id)

    # return jsonify({"access_token" : access_token})

    return jsonify(user.id), 200

@api.route("/update-abortion", methods=["PUT"])
@jwt_required()
def update_abortion():
    
    user_id = get_jwt_identity()
    abortion_num = request.json.get("abortion_num", None) 
    user_id = request.json.get("user_id")
    user= User.get_user_by_id(user_id)
    user.abortion_num = abortion_num
    User.commit()

    return jsonify(user.id), 200

@api.route("/update-center", methods=["PUT"])
@jwt_required()
def update_center():
    
    user_id = get_jwt_identity()
    center_id = request.json.get("center_id", None) 
    user_id = request.json.get("user_id")
    user= User.get_user_by_id(user_id)
    user.center_id= center_id
    User.commit()

    return jsonify(user.id), 200

@api.route("/update-couple", methods=["PUT"])
@jwt_required()
def update_couple():
    
    user_id = get_jwt_identity()
    couple_id = request.json.get("couple_id", None) 
    user_id = request.json.get("user_id")
    user= User.get_user_by_id(user_id)
    user.couple_id= couple_id
    User.commit()

    return jsonify(user.id), 200


@api.route("/update-treatment", methods=["PUT"])
@jwt_required()
def update_treatment():
    
    user_id = get_jwt_identity()
    treatment_id = request.json.get("treatment_id", None) 
    user_id = request.json.get("user_id")
    user= User.get_user_by_id(user_id)
    user.treatment_id= treatment_id
    User.commit()

    return jsonify(user.id), 200

@api.route("/update-processtimeslot", methods=["PUT"])
@jwt_required()
def update_processtimeslot():
    
    user_id = get_jwt_identity()
    process_id = request.json.get("process_id", None) 
    user_id = request.json.get("user_id")
    user= User.get_user_by_id(user_id)
    user.process_id= process_id
    User.commit()

    return jsonify(user.id), 200
    

@api.route('/couples', methods=['GET'])
def get_couples():
    couples = Couple.get_all_couples()

    couples = list(map(lambda couple: couple.serialize(), couples))
    return jsonify(couples), 200

@api.route('/processtimeslots', methods=['GET'])
def get_process_time_slots():
    time_slots = Process.get_all_process()

    time_slots = list(map(lambda time_slot: time_slot.serialize(), time_slots))
    return jsonify(time_slots), 200

@api.route('/treatments', methods=['GET'])
def get_treatments():
    treatments = Treatment.get_all_treatment()

    treatments = list(map(lambda treatment: treatment.serialize(), treatments))
    return jsonify(treatments), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None).encode('utf8')
    
    user= User.get_user_by_email(email)

    if user is None or email != user.email or email is None or not bcrypt.checkpw(password, user.password.encode('utf8')):
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token = create_access_token(identity=user.id)
    return jsonify({"user_id": user.id, "name": user.name, "token": access_token})

@api.route('/refresh-token', methods=['POST'])
def refresh_token():
    user_id = request.json.get("user_id", None)        
    access_token = create_access_token(identity=user_id)
    return jsonify({"token": access_token})

@api.route('/chat/<int:chat_id>/messages', methods=["GET"])
@jwt_required()
def get_conversation_messages(chat_id):
    chat = Chat.get_chat_by_id(chat_id)
    messages = chat.messages
    messages = list(map(lambda message: message.serialize(), messages))
    return jsonify(messages), 200

@api.route('/chat/<int:chat_id>/send-message', methods=["POST"])
@jwt_required()
def send_message_conversation(chat_id):
    json = request.get_json()

    new_message_text = json.get('message')
    sender_id = get_jwt_identity()
    date = datetime.datetime.utcnow()

    message = Message(
        value=new_message_text,
        pub_date=date,
        user_id=sender_id,
        chat_id=chat_id
    )
    message.save()

    return jsonify(message.serialize()), 200

@api.route("/user/asks/<id_listening>", methods=["PUT"])
@jwt_required()
def user_connects_with_user(id_listening):
    user_asking = User.get_user_by_id(get_jwt_identity())
    user_listening = User.get_user_by_id(id_listening)

    user_asking.users_connected.append(user_listening)

    if user_asking in user_listening.users_connected: 
        new_chat = Chat(is_active = True)
        user_asking.chats.append(new_chat)
        user_listening.chats.append(new_chat)
        Chat.save(new_chat)

        noti_user_asking = Notification(name = "¡{0} es tu nueva piña!".format(user_listening.name), is_new= True)
        user_asking.notifications.append(noti_user_asking)
        Notification.add(noti_user_asking)

        noti_user_listening = Notification(name = "¡{0} es tu nueva piña!".format(user_asking.name), is_new= True)
        user_listening.notifications.append(noti_user_listening)
        Notification.add(noti_user_listening)

        Notification.commit()
        User.commit()
        Chat.save(new_chat)

        return jsonify({"chat" : True}), 200
    else:
        noti_user_listening = Notification(name = "{0} quiere conectar contigo.".format(user_asking.name), is_new= True)
        user_listening.notifications.append(noti_user_listening)
        Notification.add(noti_user_listening)
        Notification.commit()

    User.commit()

    return jsonify({"chat" : False}), 200

@api.route('user/<id>/users_connected', methods=['GET'])
def get_users_connected(id):
    user = User.get_user_by_id(id)

    users_connected = user.get_connected()

    users_connected = list(map(lambda user: user.serialize(), users_connected))

    return jsonify({"connected": users_connected}), 200

@api.route('user/users_pending', methods=['GET'])
@jwt_required()
def get_users_pending():
    user = User.get_user_by_id(get_jwt_identity())

    users_connected = user.get_connected()

    users_pending = []

    for user_connected in users_connected:
        if user not in user_connected.users_connected:
            users_pending.append(user_connected)

    users_pending = list(map(lambda user: user.serialize_to_show(), users_pending))

    return jsonify(users_pending), 200

@api.route('user/users_asking', methods=['GET'])
@jwt_required()
def get_users_asking():
    current_user = User.get_user_by_id(get_jwt_identity())

    users = User.get_all_users()

    users_asking = []

    for user in users:
        if current_user in user.users_connected and user not in current_user.users_connected:
            users_asking.append(user)

    users_asking = list(map(lambda user: user.serialize_to_show(), users_asking))

    return jsonify(users_asking), 200

@api.route('user/<id>/notifications', methods=['GET'])
def get_user_notifications(id):
    user = User.get_user_by_id(id)

    notifications = user.notifications
    notifications_seen = user.notifications

    notifications = list(map(lambda notification: notification.serialize(), notifications))

    for notification_seen in notifications_seen:
        if notification_seen.is_new == True:
            notification_seen.is_new = False
    User.commit()

    return jsonify({"notification": notifications}), 200

@api.route('/user/chats', methods=['GET'])
@jwt_required()
def get_user_chats():
    current_user_id = get_jwt_identity()
    current_user = User.get_user_by_id(current_user_id)

    chats = current_user.get_chats()

    chat_list = []
    for chat in chats:
        if chat.is_active:
            users = chat.get_chat_users()
            user_chatting_with = next(user for user in users if user is not current_user)
            temp = {"id": chat.id, "is_active": chat.is_active, "user": {"name": user_chatting_with.name, "profile_img": user_chatting_with.profile_img}}
            chat_list.append(temp)

    return jsonify(chat_list), 200

@api.route('/chat/<id>', methods=['GET'])
def get_chat_info(id):
    chat = Chat.get_chat_by_id(id)
    return jsonify(chat.serialize()), 200


@api.route('/delete_chat/<id>', methods=['PUT'])
@jwt_required()
def delete_chat(id):
    user_requesting = User.get_user_by_id(get_jwt_identity())
    chat = Chat.get_chat_by_id(id)

    users = chat.get_chat_users()
    user_to_be_deleted = next(user for user in users if user is not user_requesting)
    
    chat.is_active = False
    Chat.commit()

    user_requesting.users_connected.remove(user_to_be_deleted)
    user_to_be_deleted.users_connected.remove(user_requesting)
    User.commit()
    return jsonify({"msg": "ok"}), 200


@api.route('/decline_user_connected/<user_requesting>', methods=['PUT'])
@jwt_required()
def decline_user_connected(user_requesting):
    user_listening = User.get_user_by_id(get_jwt_identity())
    user_requesting = User.get_user_by_id(user_requesting)
    user_requesting.users_connected.remove(user_listening)
    User.commit()
    return jsonify({"msg": "ok"}), 200

@api.route('/delete_user_connected/<user_id>', methods=['PUT'])
@jwt_required()
def delete_user_connected(user_id):
    user = User.get_user_by_id(get_jwt_identity())
    user_to_delete = User.get_user_by_id(user_id)

    user.users_connected.remove(user_to_delete)
    User.commit()
    return jsonify({"msg": "ok"}), 200