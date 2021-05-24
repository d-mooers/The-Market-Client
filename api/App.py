from flask import Flask, request, jsonify
from flask_cors import CORS
from Utils import verifyListingShape, verifyUserShape, verifyUser, verifyLoginShape, verifyAuthShape, verifyMessageShape
from Models import Listings, User, Messages
from datetime import date, datetime, time
from basicauth import decode
app = Flask(__name__)
CORS(app)


@app.route('/items', methods=['GET', 'POST'])
def get_items():
    if request.method == 'GET':
        return jsonify({"listings": Listings().find_all()}), 200
    if request.method == 'POST':
        auth = request.headers
        print(auth)
        listing = request.get_json()
        issues = verifyListingShape(listing)
        if len(issues) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": issues}), 400
        if not verifyUser(auth['Auth'], auth['User']):
            return jsonify({'erorr': 'Unauthorized'}), 401
        listing['owner'] = auth['User']
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

    if request.method == 'DELETE' and id:
        auth = request.headers
        item = Listings({'_id': id})

        if not item.reload():
            return jsonify({"error": "Item not found"}), 404
        if (not verifyUser(auth['Auth'], auth['User'])) or auth['User'] != item['owner']:
            return jsonify({'erorr': 'Unauthorized'}), 401

        resp = item.remove()
        return jsonify({}), 204


@app.route('/users')
def register_user():
    if request.method == 'GET':
        auth = request.headers.get("Authorization")
        # Decodes basic auth into email and password!
        email, password = decode(auth)
        user = User().getUserByEmailPass(email, password)
        if user:
            del user['password']
            return jsonify(user), 200
        return jsonify({"message": "Incorrect email and password combination"}), 401


@app.route('/users', methods=['POST'])
def register():
    if request.method == 'POST':
        newUser = request.get_json()
        missingFields = verifyUserShape(newUser)
        if len(missingFields) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": missingFields}), 400
        user = User(newUser)
        user.addUser()
        return jsonify(user), 201


# GET call requires context (user) to be sent to related msgs can be sorted
# POST - might need to add a check that validates user?
@app.route('/messages/<id>', methods=['GET', 'POST', 'DELETE'])
def get_messages(id):
    # returns list of all messages - TODOO: change to only send msgs pertaining to the logged in user
    if request.method == 'GET':
        user = User().getUserById(id)
        return jsonify({"messages": Messages().find_all(id)}), 200
    # time and date taken from datetime import, user info passed. Verify all fields and save to collection
    if request.method == 'POST':
        msg = request.get_json()
        tempTime = datetime.now()
        msg['time'] = str(time(tempTime.hour, tempTime.minute,
                          tempTime.second, tempTime.microsecond))
        msg['date'] = str(date.today())
        missingFields = verifyMessageShape(msg)
        if len(missingFields) > 0:
            return jsonify({"message": "Bad request, missing fields", "details": missingFields}), 400
        msg = Messages(msg)
        msg.save()
        return jsonify(msg), 201

    if request.method == 'DELETE':
        return -1
