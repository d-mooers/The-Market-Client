import pytest
import App
from Models import User

def test_verifyUser():
    expectedUserName = "Fizzpop"
    user = User().verifyUser("60ab1600e933a30ddc3ed417")
    assert user['username'] == expectedUserName

def test_verifyUser_failure():
    user = User().verifyUser("")
    assert user['message'] == 'unauthorized'

def test_get_User_by_emailpass():
    expectedUserName = "Fizzpop"
    user = User().getUserByEmailPass("chase@test.com", "razeMain")
    assert user['username'] == expectedUserName

def test_get_User_by_userpass():
    expectedUserName = "Fizzpop"
    user = User().getUserByUsernamePass("Fizzpop", "razeMain")
    assert user['username'] == expectedUserName

def test_add_User():
    user = User()
    user['username'] = "test"
    user['password'] = "aaaaaaaa"
    user.addUser()
    actual = User.getUserByUsernamePass("test", "aaaaaaaa")
    assert actual['username'] == user['username']
    user.remove()
    