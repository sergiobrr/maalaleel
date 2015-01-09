# -*- coding: utf-8 -*-
import os
from eve import Eve


def create_app():
    '''app factory'''
    app = Eve(static_folder=os.path.dirname(os.path.realpath(__file__)) + "/static/", static_url_path="/static")

    from .core import core as core_blueprint
    app.register_blueprint(core_blueprint)

    from .ebay import ebay as ebay_blueprint
    app.register_blueprint(ebay_blueprint)

    return app