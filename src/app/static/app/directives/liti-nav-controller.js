(function () {
	'use strict';
	
	angular.module('litisbnApp')
	.controller('LitiNavController', ['$scope', 'Auth', '$http', 'Constants', 'Notifications', LitiNavController]);
	
	function LitiNavController($scope, Auth, $http, Constants, Notifications) {
		var vm = this;
		
		vm.isLoggedIn = false;
		vm.username = 'pippo@poppi.pop';
		vm.password = '123';
		
		vm.login = function(){
			vm.user = {username: vm.username, password: window.btoa(vm.username + ':' + vm.password)}
			Auth.setUser(vm.user);			
			var encodedCredentials = window.btoa(vm.username + ':' + vm.password);
			$http.defaults.headers.common['Authorization'] = 'Basic ' + encodedCredentials;
			$http.get(Constants.loginUrl).then(function(data){
				vm.isLoggedIn = Auth.isLoggedIn();
			}, function(error){
				Notifications.error('Nome utente e/o password errati', '');
				console.log('error', error);
			});
		};
		
		vm.logout = function(){
			var user = Auth.getUser();
			$http.defaults.headers.common['Authorization'] = 'Basic ' + user.password;
			$http.get(Constants.logoutUrl).then(function(data){
				Auth.logOut();
			}, function(error){
				console.log('error', error);
			});
		};

		$scope.$on('authInterceptor:loginRequired', function(){
			Notifications.warning('Autenticazione richiesta', 'Inserire nome utente e password per continuare.');
		});
		
		$scope.$on('event:auth-loginConfirmed', function(){
			Notifications.success('Autenticazione avvenuta con successo');
			vm.isLoggedIn = true;
		});
		
		$scope.$on('event:auth-loginCancelled', function(){
			vm.isLoggedIn = false;
		});
		
	};
})();