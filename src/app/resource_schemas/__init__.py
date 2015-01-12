# -*- coding: utf-8 -*-


class SearchSchema():
    schema = {
        'searchData': {
            'type': 'datetime',
            'required': True
        },
        'keywords': {
            'type': 'string',
            'required': True
        },
        'active': {
            'type': 'boolean',
            'required': True
        },
        'itemfilter': {
            'type': 'dict'
        }
    }


class EbayItemSchema():

    schema = {
        'searchId': {
            'type': 'objectid',
            'required': True,
            'data_relation': {
                'resource': 'searches',
                'embeddable': True
            }
        },
        'itemId': {
            'type': 'string',
            'required': True
        },
        'title': {
            'type': 'string',
            'required': True
        },
        'country': {
            'type': 'string'
        },
        'galleryURL': {
            'type': 'string'
        },
        'location': {
            'type': 'string'
        },
        'viewItemURL': {
            'type': 'string',
            'required': True
        },
        'sellingStatus': {
            'type': 'dict',
            'schema': {
                'currentPrice': {
                    'type': 'dict',
                    'schema': {
                        '_currencyId': {
                            'type': 'string',
                            'required': True
                        },
                        'value': {
                            'type': 'number',
                            'required': True
                        }
                    }
                },
                'timeLeft': {
                    'type': 'string'
                },
                'convertedCurrentPrice': {
                    'type': 'dict',
                    'schema': {
                        '_currencyId': {
                            'type': 'string',
                            'required': True
                        },
                        'value': {
                            'type': 'number',
                            'required': True
                        }
                    }
                },
                'sellingState': {
                    'type': 'string'
                }
            }
        },
        'primaryCategory': {
            'type': 'dict',
            'schema': {
                'categoryId': {
                    'type': 'string'
                },
                'categoryName': {
                    'type': 'string'
                }
            }
        },
        'condition': {
            'type': 'dict',
            'schema': {
                'conditionId': {
                    'type': 'string'
                },
                'conditionDisplayName': {
                    'type': 'string'
                }
            }
        },
        'productId': {
            'type': 'dict',
            'schema': {
                '_type': {
                    'type': 'string'
                },
                'value': {
                    'type': 'string'
                }
            }
        },
        'active': {
            'type': 'boolean'
        },
        'price': {
            'type': 'number'
        },
        'ebay': {
            'type': 'boolean',
            'required': True
        }
    }


class AmazonItemSchema():
    schema = {
        'searchId': {
            'type': 'objectid',
            'required': True,
            'data_relation': {
                'resource': 'searches',
                'embeddable': True
            }
        },
        'title': {
            'type': 'string',
            'required': True
        },
        'author': {
            'type': 'string',
            'required': True
        },
        'publisher': {
            'type': 'string',
            'required': True
        },
        'asin': {
            'type': 'string',
            'required': True
        },
        'country': {
            'type': 'string',
            'required': True
        },
        'mediumImageUrl': {
            'type': 'string',
            'required': True
        },
        'smallImageUrl': {
            'type': 'string',
            'required': True
        },
        'itemUrl': {
            'type': 'string',
            'required': True
        },
        'offers': {
            'type': 'dict',
            'schema': {
                'collectibleOffer': {
                    'type': 'dict'
                },
                'newOffer': {
                    'type': 'dict'
                },
                'refurbishedOffer': {
                    'type': 'dict'
                },
                'usedOffer': {
                    'type': 'dict'
                }
            }
        },
        'price': {
            'type': 'number'
        },
        'active': {
            'type': 'boolean'
        },
        'category': {
            'type': 'dict'
        },
        'amazon': {
            'type': 'boolean',
            'required': True
        }
    }

## Our API will expose two resources (MongoDB collections): 'people' and
## 'works'. In order to allow for proper data validation, we define beaviour
## and structure.
#people = {
    ## 'title' tag used in item links.
    #'item_title': 'person',

    ## by default the standard item entry point is defined as
    ## '/people/<ObjectId>/'. We leave it untouched, and we also enable an
    ## additional read-only entry point. This way consumers can also perform GET
    ## requests at '/people/<lastname>/'.
    #'additional_lookup': {
        #'url': 'regex("[\w]+")',
        #'field': 'lastname'
    #},

    ## Schema definition, based on Cerberus grammar. Check the Cerberus project
    ## (https://github.com/nicolaiarocci/cerberus) for details.
    #'schema': {
        #'firstname': {
            #'type': 'string',
            #'minlength': 1,
            #'maxlength': 10,
        #},
        #'lastname': {
            #'type': 'string',
            #'minlength': 1,
            #'maxlength': 15,
            #'required': True,
            ## talk about hard constraints! For the purpose of the demo
            ## 'lastname' is an API entry-point, so we need it to be unique.
            #'unique': True,
        #},
        ## 'role' is a list, and can only contain values from 'allowed'.
        #'role': {
            #'type': 'list',
            #'allowed': ["author", "contributor", "copy"],
        #},
        ## An embedded 'strongly-typed' dictionary.
        #'location': {
            #'type': 'dict',
            #'schema': {
                #'address': {'type': 'string'},
                #'city': {'type': 'string'}
            #},
        #},
        #'born': {
            #'type': 'datetime',
        #},
    #}
#}

#works = {
    ## if 'item_title' is not provided Eve will just strip the final
    ## 's' from resource name, and use it as the item_title.
    ##'item_title': 'work',

    ## We choose to override global cache-control directives for this resource.
    #'cache_control': 'max-age=10,must-revalidate',
    #'cache_expires': 10,

    #'schema': {
        #'title': {
            #'type': 'string',
            #'required': True,
        #},
        #'description': {
            #'type': 'string',
        #},
        #'owner': {
            #'type': 'objectid',
            #'required': True,
            ## referential integrity constraint: value must exist in the
            ## 'people' collection. Since we aren't declaring a 'field' key,
            ## will default to `people._id` (or, more precisely, to whatever
            ## ID_FIELD value is).
            #'data_relation': {
                #'resource': 'people',
                ## make the owner embeddable with ?embedded={"owner":1}
                #'embeddable': True
            #},
        #},
    #}
#}