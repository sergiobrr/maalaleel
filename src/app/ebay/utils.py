# -*- coding: utf-8 -*-


def itemify(reply):
    _items = []
    for item in reply.searchResult.item:
        result = {'ebay': True}
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
        result['price'] = round(float(item.sellingStatus.currentPrice.value), 2)
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
        _items.append(result)
    paginationOutput = {
        'itemSearchURL': reply.itemSearchURL,
        'totalPages': int(reply.paginationOutput.totalPages),
        'entriesPerPage': int(reply.paginationOutput.entriesPerPage),
        'pageNumber': int(reply.paginationOutput.pageNumber),
        'totalEntries': int(reply.paginationOutput.totalEntries)
    }
    results = {
        'items': _items,
        'paginationOutput': paginationOutput
    }
    return results