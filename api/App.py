from flask import Flask, request, jsonify
from flask_cors import CORS
from Utils import verifyListingShape, verifyUserShape, verifyUser, verifyLoginShape, verifyAuthShape, verifyTransacationShape
from Models import Listings, User, Transaction
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
        email, password = decode(auth) # Decodes basic auth into email and password!
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
    
@app.route('/transactions', methods=['POST'])
def checkout():
    if request.method == 'POST':
        auth = request.headers
        transaction = request.get_json()
        if (not verifyUser(auth['Auth'], auth['User'])) :
            return jsonify({'message': 'User is unauthorized'}), 401
        missingFields = verifyTransacationShape(transaction)
        if len(missingFields) > 0:
            return jsonify({"message": "Bad request, missing fields",
                "details": missingFields}), 400
        if transaction['card'][-4:] == "1111":
            return jsonify({'message': 'Card rejected!'}), 403

        listing = Listings({'_id': transaction['listingId']})
        listing.reload()
        transaction['listing'] = listing
        listing.remove()
        toAdd = Transaction(transaction)
        toAdd.save()
        return jsonify('success'), 201
 
