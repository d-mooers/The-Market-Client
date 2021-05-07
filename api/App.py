from flask import Flask, request, jsonify
from flask_cors import CORS
from Utils import verifyListingShape, makeId
app = Flask(__name__)
CORS(app)

listings = [
    {
        "title": "Bicycle",
        "price": 100.29,
        "desc":
        "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
        "lngLat": [-120.45, 35.38],
        "imgUrl":
        "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
        "id": "asdbcs",
    },
    {
        "title": "Never Opened Before PS5",
        "price": 849.99,
        "desc":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "lngLat": [-121.4, 45.38],
        "imgUrl":
        "https://gmedia.playstation.com/is/image/SIEPDC/playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul20?$1600px--t$",
        "id": "asdkj12esa",
    },

]


@app.route('/items', methods=['GET', 'POST'])
def get_items():
    if request.method == 'GET':
        return jsonify({"listings": listings}), 200
    if request.method == 'POST':
        listing = request.get_json()
        issues = verifyListingShape(listing)
        if len(issues) > 0:
            return jsonify({"message": "Bad request, missing fields",
                            "details": issues}), 400
        listing['id'] = makeId()
        listings.append(listing)
        return jsonify(listing), 201


@app.route('/items/<id>')
def get_item(id):
    if request.method == 'GET' and id:
        item = None
        for itm in listings:
            if itm['id'] == id:
                item = itm
        if item == None:
            return jsonify({"error": "Item not found"}), 404
        return jsonify(item), 200


# if __name__ == "__main__":
#     app.run()
