# -*- coding: utf-8 -*-
from flask import Blueprint
from eve.auth import TokenAuth
from flask import current_app
from flask import request, Response, abort

auth = Blueprint('auth', __name__)


class TokenAuth(TokenAuth):

    def check_auth(self, token, allowed_roles, resource, method):
        accounts = current_app.data.driver.db['accounts']
        account = accounts.find_one({'token': token})
        if account and '_id' in account:
            self.set_request_auth_value(account['_id'])
        return accounts.find_one({'token': token})

    def authenticate(self):
        """ Returns a standard a 401 response that enables basic auth.
        Override if you want to change the response and/or the realm.
        """
        resp = Response(None, 401)
        abort(401, description='Please provide proper credentials',
              response=resp)

    def authorized(self, allowed_roles, resource, method):
        """ Validates the the current request is allowed to pass through.

        :param allowed_roles: allowed roles for the current request, can be a
                              string or a list of roles.
        :param resource: resource being requested.
        """
        token = None
        try:
            token = request.headers.get('Authorization').split(' ')[1]
        except:
            pass
        return token and self.check_auth(token, allowed_roles, resource,
                                        method)

from . import views