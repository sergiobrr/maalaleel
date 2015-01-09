'use strict';

/**
 * @ngdoc overview
 * @name litisbnApp
 * @description
 * # litisbnApp
 *
 * Main module of the application.
 */
angular
  .module('litisbnApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'angularSpinner',
		'restangular',
    'models.ebayItems',
    'models.searches',
		'services.constants',
		'services.ebayApi'
  ])
  .config(function ($routeProvider, RestangularProvider, Constants) {
		RestangularProvider.setBaseUrl(Constants.restangularBaseUrl)
		.setRestangularFields({
  		selfLink: '_links.self.href',
			id: '_id',
			etag: '_etag'
		})
		.addResponseInterceptor(function(data, operation, what, url, response, deferred){
			if (operation === 'getList') {
				var result = data._items;
				result._meta = data._meta;
				result._links = data._links;
				return result;
			}
			return data;
		});
	
    $routeProvider
      .when('/', {
        templateUrl: 'static/app/search/search.html'
      })
      .when('/about', {
        templateUrl: 'static/app/about/about.html',
        controller: 'AboutCtrl'
      })
      .when('/ricerca/:idSearch', {
        templateUrl: 'static/app/saved-search/saved-search.html'
      })
		
      .otherwise({
        redirectTo: '/'
      });
  });