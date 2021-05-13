from flask import Flask, request, jsonify
from flask_cors import CORS
from Utils import verifyListingShape, verifyUserShape, verifyUser, verifyLoginShape
from Models import Listings, User
app = Flask(__name__)
CORS(app)


@app.route('/items', methods=['GET', 'POST'])
def get_items():
    if request.method == 'GET':
        return jsonify({"listings": Listings().find_all()}), 200
    if request.method == 'POST':
        listing = request.get_json()
        issues = verifyListingShape(listing)
        if len(issues) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": issues}), 400
        listing = Listings(listing)
        listing.save()
        return jsonify(listing), 201


@app.route('/items/<id>')
def get_item(id):
    if request.method == 'GET' and id:
        item = Listings({'_id': id})
        if item.reload():
            return jsonify(item), 200
        if item == None:
            return jsonify({"error": "Item not found"}), 404


@app.route('/users', methods=['GET', 'POST'])
def register_user():
    if request.method == 'GET':
        auth = request.get_json()
        missingFields = verifyLoginShape(auth)
        if len(missingFields) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": missingFields}), 400
        user = User().getUserByEmailPass(auth['email'], auth['password'])
        if user:
            return jsonify(user), 200
        return jsonify({"message": "Incorrect email and password combination"}), 401
    if request.method == 'POST':
        newUser = request.get_json()
        missingFields = verifyUserShape(newUser)
        if len(missingFields) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": missingFields}), 400
        user = User(newUser)
        user.addUser()
        return jsonify(user), 201
