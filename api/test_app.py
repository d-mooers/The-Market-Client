import pytest
import App
from Models import Listings, User


def test_find_all_listings():
    assert len(Listings().find_all()) > 0


def test_find_listing_by_Id():
    expected = {
        "_id": "609b670702bdf47a0a1692fa",
        "title": "Bicycle",
        "price": "100.29",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "imgUrl": "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
        "condition": "New",
        "lngLat": [
            -120.6803504,
            35.2938962
        ]}
    actual = Listings({'_id': "609b670702bdf47a0a1692fa"})
    assert actual.reload()
    assert actual == expected


def test_login():
    expectedUserName = 'Test Test'
    user = User().getUserByEmailPass("test@test.com", "1234")
    assert user is None