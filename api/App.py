from flask import Flask, request, jsonify
from flask_cors import CORS
from Utils import verifyListingShape, verifyUserShape, verifyUser, verifyLoginShape, verifyAuthShape
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


@app.route('/items/<id>', methods=['GET', 'DELETE'])
def get_item(id):
    if request.method == 'GET' and id:
        item = Listings({'_id': id})
        if item.reload():
            return jsonify(item), 200
        if item == None:
            return jsonify({"error": "Item not found"}), 404
    if request.method == 'GET' and id:
        auth = request.get_json()
        item = Listings({'_id': id})

        missingFields = verifyAuthShape(auth)
        if len(missingFields) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": missingFields}), 400
        if not item.reload():
            return jsonify({"error": "Item not found"}), 404
        if not verifyUser(auth['authId'], auth['_id']) or auth['_id'] != item['owner']:
            return jsonify({'erorr': 'Unauthorized'}), 401

        resp = item.remove()
        if resp.deleted_count == 1:
            return jsonify({}), 204
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
