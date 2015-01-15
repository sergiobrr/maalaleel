(function () {
	'use strict';
	
	angular.module('litisbnApp')
	.controller('LitiNavController', ['$scope', 'Auth', '$http', 'Constants', '$state', LitiNavController]);
	
	function LitiNavController($scope, Auth, $http, Constants, $state) {
		var vm = this;
		
		vm.login = function(){
			console.log(vm.username, vm.password);
			Auth.setUser({username: vm.username, password: vm.password});			
			var encodedCredentials = window.btoa(vm.username + ':' + vm.password);
			$http.defaults.headers.common['Authorization'] = 'Basic ' + encodedCredentials;
			$http.get(Constants.loginUrl).then(function(data){
				console.log(data);			
			}, function(error){
				console.log('error', error);
			});
		};
		
		vm.goToSearch = function($event){
			$event.preventDefault();
			$state.transitionTo('container.search', {}, {reload: false});
		};
	};
})();