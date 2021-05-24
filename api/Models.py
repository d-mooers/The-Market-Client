import pymongo
from bson import ObjectId
import dns
import os
import uuid
from dotenv import load_dotenv


class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                {"_id": ObjectId(self._id)}, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result:
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp


class Listings(Model):
    load_dotenv()
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)
    db = db_client['users']

    collection = db.db_client['listings']

    def find_all(self):
        listings = list(self.collection.find())
        for listing in listings:
            listing["_id"] = str(listing['_id'])
        return listings

    def find_user_listings(self, ownerId):
        listings = list(self.collection.find({ "owner" : ownerId}))
        for listing in listings:
            listing["_id"] = str(listing['_id'])
        return listings

class User(Model):
    load_dotenv()
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)
    db = db_client['users']
    collection = db.db_client['auth']

    def verifyUser(self, authId):
        if self._id:
            user = self.collection.find_one({"_id": ObjectId(self._id)})
            if user['authId'] == authId:
                return user
        return {
            'message': 'unauthorized',
            'auth': False
        }

    def getUserByEmailPass(self, email, password):
        user = self.collection.find_one({"email": email, "password": password})
        if user:
            user['authId'] = uuid.uuid4()
            user['_id'] = str(user['_id'])
            self.collection.update_one(
                {"_id": ObjectId(user['_id'])}, {'$set': {'authId': user['authId']}})
            return user
        return None
    
    def getUserByUsernamePass(self, username, password):
        user = self.collection.find_one({"username": username, "password": password})
        if user:
            user['authId'] = uuid.uuid4()
            user['_id'] = str(user['_id'])
            self.collection.update_one(
                {"_id": ObjectId(user['_id'])}, {'$set': {'authId': user['authId']}})
            return user
        return None


    def addUser(self):
        self['authId'] = uuid.uuid4()
        self.save()
