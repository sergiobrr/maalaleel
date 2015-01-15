# -*- coding: utf-8 -*-
import os
from eve import Eve
from app.auth import TokenAuth


def create_app():
    '''app factory'''
    app = Eve(static_folder=os.path.dirname(
        os.path.realpath(__file__)) + "/static/",
        static_url_path="/static",
        auth=TokenAuth
    )

    from .core import core as core_blueprint
    app.register_blueprint(core_blueprint)

    from .ebay import ebay as ebay_blueprint
    app.register_blueprint(ebay_blueprint)

    from .amazon import amazon as amazon_blueprint
    app.register_blueprint(amazon_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    return app