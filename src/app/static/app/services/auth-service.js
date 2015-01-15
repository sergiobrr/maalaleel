(function(){
	angular.module('services.auth', ['angular-data.DSCacheFactory'])
	.factory('Auth', ['DSCacheFactory', 'Constants', '$rootScope', function(DSCacheFactory, Constants, $rootScope) {
		var self = this;
		self.userCache = DSCacheFactory('userCache', {storageMode: 'localStorage'});
		var _user = self.userCache.get('user');
		
		var setUser = function(user) {
			if(!user.role || user.role < 0) {
				user.role = Constants.ACCESS_LEVELS.pub;
			}
			_user = user;
			self.userCache.put('user', user);			
		};
		
		var setToken = function(token){
			if (_user) {
				_user.token = token;
				_user.role = Constants.ACCESS_LEVELS.user;
				$rootScope.$broadcast('event:auth-loginConfirmed');
			}
		};
				
				
		var isLoggedIn = function() {
			if (_user && _user.token) {
				return true;
			} else {
				return false;
			};			
		};
		
		return {
			setUser: setUser,
			isAuthorized: function(lvl) {
				if(_user) {
					return _user.role >= lvl;
				} else {
					return 1 >= lvl;
				};
			},
			isLoggedIn: isLoggedIn,
			getUser: function() {
				return _user;
			},
			getToken: function() {
				return _user ? _user.token : '';
			},
			logOut: function() {
				self.userCache.remove('user');
				_user = null;
				$rootScope.$broadcast('event:auth-loginCancelled');
			},
			setToken: setToken
		};
	}]);
})();