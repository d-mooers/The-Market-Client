import random
from Models import User


def verifyListingShape(listing: dict) -> list:
    LISTING_FIELDS = ['title', 'price', 'description', 'lngLat', 'imgUrl']
    missingFields = []
    for field in LISTING_FIELDS:
        if not field in listing:
            missingFields.append(field)
    return missingFields


def verifyUser(authId, userId) -> bool:
    user = User({'_id': userId})
    if not user.reload():
        return False
    return user['authId'] == authId


def makeId() -> str:
    return str(random.randint(0, 9999))
