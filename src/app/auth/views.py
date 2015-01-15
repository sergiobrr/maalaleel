# -*- coding: utf-8 -*-
from flask import make_response
from flask import request
from . import auth
from .utils import check_auth, create_token, delete_token
import base64
from werkzeug.exceptions import BadRequest, Unauthorized


@auth.route('/login', methods=['GET'])
def loginView():
    try:
        auth_request = request.headers.get('Authorization').split(' ')[1]
        username, password = base64.decodestring(auth_request).split(':')
        if check_auth(username, password):
            return make_response(create_token(username))
        else:
            return Unauthorized()
    except:
        return BadRequest()


@auth.route('/logout', methods=['GET'])
def logoutView():
    try:
        auth_request = request.headers.get('Authorization').split(' ')[1]
        username, password = base64.decodestring(auth_request).split(':')
        if check_auth(username, password):
            return make_response(delete_token(username))
        else:
            return Unauthorized()
    except:
        return BadRequest()


