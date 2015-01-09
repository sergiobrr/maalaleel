# -*- coding: utf-8 -*-
from flask import Blueprint

core = Blueprint('core', __name__)

from . import views