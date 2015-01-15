# -*- coding: utf-8 -*-
from werkzeug.security import check_password_hash, generate_password_hash
from flask import current_app


def get_account(username):
    accounts = current_app.data.driver.db['accounts']
    return accounts.find_one({'username': username})


def check_auth(username, password):
    account = get_account(username)
    return account and check_password_hash(account['password'], password)


def create_token(username):
    account = get_account(username)
    token = generate_password_hash(account['password']).split(':')[2].split('$')[2]
    current_app.data.driver.db['accounts'].update({'_id': account['_id']}, {'$set': {'token': token}}, upsert=False)
    return token


def delete_token(username):
    account = get_account(username)
    current_app.data.driver.db['accounts'].update({'_id': account['_id']}, {'$set': {'token': ''}}, upsert=False)
    return 'You have been logged out'