"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Pareja, Tratamiento, Tiempo_proceso, Centro
from api.routes import api
from api.admin import setup_admin
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt, get_jwt_identity, set_access_cookies, unset_jwt_cookies
import json
#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
jwt = JWTManager(app)

# database condiguration
if os.getenv("DATABASE_URL") is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# TEST DB    
@app.route("/testdb", methods=['GET'])
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

        new_user = User(name = user['name'], email = user['email'], password = user['password'], edad = user['edad'], num_aborto = user['num_aborto'])
        db.session.add(new_user)

    db.session.commit()

    return jsonify({"msg": "OK!"})

#### LOGIN
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    users = User.query.all()
    users_output = []

    for user in users:
        users_data = {}
        users_data['id'] = user.id
        users_data['name'] = user.name
        users_data['password'] = user.password

        users_output.append(users_data)
    
    print(username)
    print(password)

    for user in users_output: 
        @jwt.user_identity_loader
        def user_identity_lookup(user):
            return user.id

        if username == user['name'] or password == user['password']:
            #return jsonify({"msg": "Bad username or password"}), 401
            access_token = create_access_token(identity=user['id'])
            print(access_token)
            return jsonify(access_token=access_token)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
