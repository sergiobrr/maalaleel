# -*- coding: utf-8 -*-


"""
    litisbn config file per eve + ebay
"""

import os
from app.resource_schemas import EbayItemSchema, SearchSchema

# We want to seamlessy run our API both locally and on Heroku so:
if os.environ.get('PORT'):
    # We're hosted on Heroku!  Use the MongoHQ sandbox as our backend.
    MONGO_HOST = '192.168.1.139'
    MONGO_PORT = 27017
    MONGO_USERNAME = 'sergio'
    MONGO_PASSWORD = '123'
    MONGO_DBNAME = 'isbn_db'

    # also, correctly set the API entry point
    SERVER_NAME = 'eve-demo.herokuapp.com'
else:
    # Running on local machine. Let's just use the local mongod instance.
    MONGO_HOST = '192.168.1.139'
    MONGO_PORT = 27017
    MONGO_USERNAME = 'sergio'
    MONGO_PASSWORD = '123'
    MONGO_DBNAME = 'isbn_db'

    # let's not forget the API entry point (not really needed anyway)
    #SERVER_NAME = '127.0.0.1:5000'

URL_PREFIX = 'api'
# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
#CACHE_CONTROL = 'max-age=20'
#CACHE_EXPIRES = 20
CACHE_CONTROL = ''
CACHE_EXPIRES = 0

DEBUG = True

searches = {
    'cache_control': '',
    'cache_expires': 0,
    'item_title': 'ricerca',
    'schema': SearchSchema.schema
}

ebayitems = {
    'item_title': 'oggetto',
    'schema': EbayItemSchema.schema
}

# The DOMAIN dict explains which resources will be available and how they will
# be accessible to the API consumer.
DOMAIN = {
    'searches': searches,
    'ebayitems': ebayitems
}

EBAY_APPID = 'SergioBr-c17f-444c-9e45-efb0f673196e'