import random
from Models import User


def findMissingFields(obj: dict, fields: list) -> list:
    missingFields = []
    for field in fields:
        if not field in obj:
            missingFields.append(field)
    return missingFields


def verifyListingShape(listing: dict) -> list:
    LISTING_FIELDS = ['title', 'price',
                      'description', 'lngLat', 'imgUrl']
    return findMissingFields(listing, LISTING_FIELDS)


def verifyUserShape(user: dict) -> list:
    USER_FIELDS = ['username', 'email', 'password']
    return findMissingFields(user, USER_FIELDS)


def verifyLoginShape(login: dict) -> list:
    LOGIN_FIELDS = ['email', 'password']
    return findMissingFields(login, LOGIN_FIELDS)


def verifyAuthShape(auth: dict) -> list:
    AUTH_FIELDS = ['authId', '_id']
    return findMissingFields(auth, AUTH_FIELDS)


def verifyUser(authId, userId) -> bool:
    user = User({'_id': userId})
    if not user.reload():
        return False
    return user['authId'] == authId


def makeId() -> str:
    return str(random.randint(0, 9999))
