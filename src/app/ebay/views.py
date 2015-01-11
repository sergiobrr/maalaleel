# -*- coding: utf-8 -*-
from flask import current_app
from . import ebay
from ebaysdk.finding import Connection as finding
from flask import request
import json
from .utils import itemify
from werkzeug.exceptions import NotFound


@ebay.route('/ebay/', methods=['GET'])
def lookUpView():
    searchParams = request.args
    keywords = searchParams['keywords']
    itemFilter = []
    for arg in searchParams:
        if arg not in ['keywords', 'paginationInput']:
            param = {'name': arg, 'value': searchParams[arg]}
            itemFilter.append(param)
    api_request = {'keywords': keywords, 'itemFilter': itemFilter, 'categoryId': current_app.config['EBAY_BOOKS_CAT']}
    if 'paginationInput' in searchParams.keys():
        api_request['paginationInput'] = {'pageNumber': int(searchParams['paginationInput'])}
    appid = current_app.config['EBAY_APPID']
    api = finding(siteid='EBAY-IT', appid=appid)
    response = api.execute('findItemsAdvanced', api_request)
    if 'item' in response.reply.searchResult.__dict__.keys():
        results = itemify(response.reply)
        serialized = json.dumps(results)
        return serialized
    else:
        raise NotFound()
