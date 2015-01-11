# -*- coding: utf-8 -*-


def itemify(result):
    items = []
    for book in result:
        item = {'amazon': True}

        item['title'] = unicode(book.ItemAttributes.Title)
        try:
            item['author'] = unicode(book.ItemAttributes.Author)
        except:
            item['author'] = 'non pervenuto'
        try:
            item['publisher'] = unicode(book.ItemAttributes.Manufacturer)
        except:
            item['publisher'] = 'non pervenuto'
        item['asin'] = unicode(book.ASIN)
        item['country'] = 'Italia'
        try:
            item['mediumImageUrl'] = unicode(book.MediumImage.URL)
        except:
            item['mediumImageUrl'] = '/static/images/placeholder.jpg'
        try:
            item['smallImageUrl'] = unicode(book.SmallImage.URL)
        except:
            item['smallImageUrl'] = '/static/images/placeholder.jpg'
        item['itemUrl'] = unicode(book.DetailPageURL)
        offers = {}
        if 'OfferSummary' in book.__dict__.keys():
            summary = book.OfferSummary
            if summary.TotalCollectible > 0:
                offers['collectibleOffer'] = {
                    'price': unicode(summary.LowestCollectiblePrice.FormattedPrice),
                    'amount': int(summary.LowestCollectiblePrice.Amount),
                    'condition': 'Da collezione'
                }
                item['price'] = round(float(summary.LowestCollectiblePrice.Amount) / 100, 2)
            if summary.TotalNew > 0:
                offers['newOffer'] = {
                    'price': unicode(summary.LowestNewPrice.FormattedPrice),
                    'amount': int(summary.LowestNewPrice.Amount),
                    'condition': 'Nuovo'
                }
                item['price'] = round(float(summary.LowestNewPrice.Amount) / 100, 2)
            if summary.TotalRefurbished > 0:
                offers['refurbishedOffer'] = {
                    'price': unicode(summary.LowestRefurbishedPrice.FormattedPrice),
                    'amount': int(summary.LowestRefurbishedPrice.Amount),
                    'condition': 'Rigenerato'
                }
                item['price'] = round(float(summary.LowestRefurbishedPrice.Amount) / 100, 2)
            if summary.TotalUsed > 0:
                offers['usedOffer'] = {
                    'price': unicode(summary.LowestUsedPrice.FormattedPrice),
                    'amount': int(summary.LowestUsedPrice.Amount),
                    'condition': 'Usato'
                }
                item['price'] = round(float(summary.LowestUsedPrice.Amount) / 100, 2)
            item['active'] = False
            item['category'] = {
                'name': unicode(book.BrowseNodes.BrowseNode.Name),
                'borwseNodeId': unicode(book.BrowseNodes.BrowseNode.BrowseNodeId)
            }
            item['offers'] = offers
            items.append(item)
    paginationOutput = {
        'limit': result.limit,
        'pages': result.pages,
        'results': result.results
    }
    results = {
        'items': items,
        'paginationOutput': paginationOutput
    }
    return results