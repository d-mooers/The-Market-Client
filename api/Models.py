import pymongo
from bson import ObjectId
import dns
import os
from dotenv import load_dotenv


class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)
    db = db_client['users']

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
    collection = super.db.db_client['listings']

    def find_all(self):
        listings = list(self.collection.find())
        for listing in listings:
            listing["_id"] = str(listing['_id'])
        return listings