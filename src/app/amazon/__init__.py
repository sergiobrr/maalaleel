# -*- coding: utf-8 -*-
from flask import Blueprint

amazon = Blueprint('amazon', __name__)

from . import views