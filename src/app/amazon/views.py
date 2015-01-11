# -*- coding: utf-8 -*-
from flask import current_app
from . import amazon
import amazonproduct
#import lxml
from flask import request
import json
from werkzeug.exceptions import NotFound
from .utils import itemify


@amazon.route('/amazon', methods=['GET'])
def lookup():
    searchParams = request.args
    keywords = searchParams['keywords']

    api = amazonproduct.API(cfg=current_app.config['AMAZON_CREDENTIALS'])
    try:
        result = api.item_search(
            'Books',
            Keywords=keywords,
            ResponseGroup='ItemAttributes, Offers, Images, BrowseNodes'
        )
        results = itemify(result)
        serialized = json.dumps(results)
        return serialized
    except:
        raise NotFound()



