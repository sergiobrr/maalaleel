(function () {
	'use strict';
	
	angular.module('litisbnApp').controller('SavedSingleController', [
		'$routeParams',  
		'Searches',
		SavedSingleController
	]);
	
	function SavedSingleController($routeParams, Searches) {
		var vm = this;
		vm.searchId = $routeParams.idSearch
		
		Searches.one(vm.searchId).then(function(data){
			vm.search = data;
			vm.search.getItems().then(function(data){
				vm.items = data;
			}, function(error){
				console.log('error:', error);
			});
		}, function(error){
			console.log('error:', error);
		});
		
	};
})();