import random


def verifyListingShape(listing: dict) -> list:
    LISTING_FIELDS = ['title', 'price', 'description', 'lngLat', 'imgUrl']
    missingFields = []
    for field in LISTING_FIELDS:
        if not field in listing:
            missingFields.append(field)
    return missingFields


def makeId() -> str:
    return str(random.randint(0, 9999))
