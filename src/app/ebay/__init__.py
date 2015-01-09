# -*- coding: utf-8 -*-
from flask import Blueprint

ebay = Blueprint('ebay', __name__)

from . import views