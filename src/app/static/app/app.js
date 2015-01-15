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
	'angular-data.DSCacheFactory',
	'ui.router',
  'angularSpinner',
	'restangular',
  'models.ebayItems',
	'models.amazonItems',
  'models.searches',
	'services.auth',
	'services.constants',
	'services.ebayApi',
	'services.amazonApi',
	'services.collectItems',
	'services.notifications',
	'components.authInterceptor'
])
.run(function(Auth, $rootScope, $state) {
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if (!Auth.isAuthorized(toState.access_level)) {
			if(Auth.isLoggedIn()) {
				$state.transitionTo('container.search', {}, {reload: false});
				event.preventDefault();
			} else {
				$state.transitionTo('container.search', {}, {reload: false});
				event.preventDefault();
			};
		};
	});
	
	$rootScope.$on('event:auth-loginConfirmed', function(){	
	});
	
	$rootScope.$on('event:auth-loginCancelled', function(){
	});
})
.config(function ($stateProvider, $urlRouterProvider, RestangularProvider, Constants) {
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
	
	$stateProvider
	.state('container', {
		url: '',
		templateUrl: 'static/app/partials/container.html',
		abstract: true,
		access_level: 1
	})
	.state('container.search', {
		url: '/search',
		views: {
			'searchView': {
				templateUrl: 'static/app/search/search.html'
			}
		},
		access_level: 1
	})
	.state('container.profile', {
		url: '/profile',
		views: {
			'profileView': {
				templateUrl: 'static/app/profile/profile.html'
			}
		},
		access_level: 2
	})
	.state('container.about', {
		url: '/about',
		views: {
			'profileView': {
				templateUrl: 'static/app/about/about.html'
			}
		},
		access_level: 1
	})
	.state('container.contacts', {
		url: '/contacts',
		views: {
			'profileView': {
				templateUrl: 'static/app/contacts/contacts.html'
			}
		},
		access_level: 1
	});
	$urlRouterProvider.otherwise('/search');

});