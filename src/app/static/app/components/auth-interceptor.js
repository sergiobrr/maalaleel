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
			responseError: function(rejection){
				if(rejection.status === 401 && rejection.config.url !== Constants.loginUrl){
					$rootScope.$broadcast('authInterceptor:loginRequired');
				};
				return $q.reject(rejection);
			},
			request: function(config) {
				if (Auth.isLoggedIn() && config.url !== Constants.logoutUrl) {
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