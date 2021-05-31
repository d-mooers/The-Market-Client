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
        ownerId = request.args.get('owner')
        print(ownerId)
        if ownerId:
            return jsonify({"listings": Listings().find_user_listings(ownerId)}), 200
        else:
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


# returns list of all messages that pertain to the logged in user (must include their id in GET url call)
# sender/reciever info is decoded in user._id - you will have to find the user in the data base to conver to username
@app.route('/messages/<id>', methods=['GET'])
def get_messages(id):
    subject = request.args.get('subject')
    if subject:
        return jsonify({"messages": Messages().find_conversation(id, subject)}), 200
    return jsonify({"messages": Messages().find_all(id)}), 200


# POST: time and date taken from datetime import, user info passed. Verify all fields and save to collection
# POST: sender/reciever info must be passed. Must be user._id NOT username
@app.route('/messages', methods=['POST', 'DELETE'])
def post_messages():
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

    # idea: add booleans to msg json to show if sender/reciever has deleted msg or not
    # ex: Chase and Chris have a 10msg convo. Each msg has a boolean Chase and boolean Chris which are all true.
    # Chase deletes convo on his end - all chase booleans go false. So on a GET, Chris sees convo but Chase does not
    # optionally: add if boolean for both parties = false then delete from database
    if request.method == 'DELETE':
        return -1
