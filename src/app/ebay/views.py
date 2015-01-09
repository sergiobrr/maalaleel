# -*- coding: utf-8 -*-
from flask import current_app
from . import ebay
from ebaysdk.finding import Connection as finding
from flask import request
import json


@ebay.route('/ebay/', methods=['GET'])
def lookUpView():
    searchParams = request.args
    keywords = searchParams['keywords']
    itemFilter = []
    for arg in searchParams:
        if arg not in ['keywords', 'paginationInput']:
            param = {'name': arg, 'value': searchParams[arg]}
            itemFilter.append(param)
    api_request = {'keywords': keywords, 'itemFilter': itemFilter}
    if 'paginationInput' in searchParams.keys():
        api_request['paginationInput'] = {'pageNumber': int(searchParams['paginationInput'])}
    appid = current_app.config['EBAY_APPID']
    api = finding(siteid='EBAY-IT', appid=appid)
    response = api.execute('findItemsAdvanced', api_request)
    items = []
    #print response.reply.paginationOutput
    for item in response.reply.searchResult.item:
        result = {}
        result['title'] = item.title
        result['itemId'] = item.itemId
        try:
            result['country'] = item.country
        except:
            result['country'] = 'non pervenuto'
        try:
            result['galleryURL'] = item.galleryURL
        except:
            result['galleryURL'] = ''
        result['location'] = item.location
        result['viewItemURL'] = item.viewItemURL
        sellingStatus = {}
        sellingStatus['currentPrice'] = {'_currencyId': item.sellingStatus.currentPrice._currencyId,
                                            'value': round(float(item.sellingStatus.currentPrice.value), 2)}
        sellingStatus['timeLeft'] = item.sellingStatus.timeLeft
        sellingStatus['convertedCurrentPrice'] = {'_currencyId': item.sellingStatus.convertedCurrentPrice._currencyId,
                                            'value': round(float(item.sellingStatus.convertedCurrentPrice.value), 2)}
        sellingStatus['sellingState'] = item.sellingStatus.sellingState
        result['sellingStatus'] = sellingStatus
        primaryCategory = {'categoryId': item.primaryCategory.categoryId,
                                            'categoryName': item.primaryCategory.categoryName}
        result['primaryCategory'] = primaryCategory
        try:
            condition = {'conditionId': item.condition.conditionId,
                                            'conditionDisplayName': item.condition.conditionDisplayName}
            result['condition'] = condition
        except:
            condition = {'conditionId': 'non pervenuto',
                                            'conditionDisplayName': 'non pervenuto'}
            result['condition'] = condition
        try:
            productId = {'_type': item.productId._type, 'value': item.productId.value}
            result['productId'] = productId
        except:
            productId = {'_type': 'non pervenuto', 'value': 'non pervenuto'}
            result['productId'] = productId
        result['active'] = False
        items.append(result)
    paginationOutput = {
        'itemSearchURL': response.reply.itemSearchURL,
        'totalPages': int(response.reply.paginationOutput.totalPages),
        'entriesPerPage': int(response.reply.paginationOutput.entriesPerPage),
        'pageNumber': int(response.reply.paginationOutput.pageNumber),
        'totalEntries': int(response.reply.paginationOutput.totalEntries)
    }
    results = {
        'items': items,
        'paginationOutput': paginationOutput
    }
    #result['items'] = items
    #results.paginationOutput = response.reply.paginationOutput
    serialized = json.dumps(results)
    return serialized