(function () {
	'use strict';
	
	angular.module('components.authInterceptor', [])
	.factory('AuthInterceptor', ['$q', '$rootScope', 'Constants', 'Auth', function($q, $rootScope, Constants, Auth) {
		var authInterceptor = {
			response: function(response) {
				if (response.config.url == Constants.loginUrl) {
					Auth.setToken(response.data);
				};
				return response;
			},
			request: function(config) {
				if (Auth.isLoggedIn()) {
					var payload = 'Token ' + Auth.getToken();
					config.headers.Authorization = payload;
				}
				return config;
			}
		};
		return authInterceptor;
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);
})();