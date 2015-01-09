# -*- coding: utf-8 -*-
from flask import make_response
from . import core


@core.route('/')
def indexView():
    return make_response(open('app/static/index.html').read())
