(function () {
	'use strict';
	
	angular.module('litisbnApp')
	.controller('SavedSearchController', ['EbayItems', '$scope', SavedSearchController]);
	
	function SavedSearchController(EbayItems, $scope) {
		var vm = this;
		
		$scope.search.getEbayItems().then(function(data){
			vm.ebayItemsNum = data.length;
			var sellingStatuses = _.pluck(data, 'sellingStatus');
			sellingStatuses = _.pluck(sellingStatuses, 'currentPrice');
			vm.maxPrice = _.max(sellingStatuses, 'value');
			vm.minPrice = _.min(sellingStatuses, 'value');
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