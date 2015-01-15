(function () {
	'use strict';
	
	angular.module('litisbnApp')
	.controller('SavedSearchDirectiveController', ['$scope', SavedSearchDirectiveController]);
	
	function SavedSearchDirectiveController($scope) {
		var vm = this;
		
		$scope.search.getItems().then(function(data){
			vm.itemsNum = data.length;
			vm.maxPrice = _.max(data, 'price');
			vm.minPrice = _.min(data, 'price');
		});
		
		vm.deleteSearch = function(search, $event){
			$event.preventDefault();
			search.deleteSearch().then(function(data){
				$scope.$parent.vm.loadSearches();
			}, function(error){
				console.log('error', error);
			});
		};		
	};
})();