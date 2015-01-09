(function () {
	'use strict';
	
	angular.module('litisbnApp').controller('SearchController', [ 
		'usSpinnerService', 
		'EbayApi',
		'EbayItems',
		'Searches',
		'$rootScope',
		'$scope',
		SearchController
	]);
	
	function SearchController(usSpinnerService, EbayApi, EbayItems, Searches, $rootScope, $scope) {
		var vm = this;
				
		$scope.$parent.displayEbay = false;

		vm.showErrors = false;
		vm.showSaved = true;
		vm.btnMessage = 'Nascondi ricerche salvate';
		vm.itemsToSave = [];
		vm.visiblePannels = {};
		
		$rootScope.$on('EbayApi:resultReady', function(){
			vm.items = EbayApi.getItems();
			vm.paginationOutput = EbayApi.getPagination();
			for (var key in vm.items) {
				vm.visiblePannels[key] = false;
			};
			$scope.$parent.displayEbay = true;
			vm.currentPage = EbayApi.getCurrentPage();
			usSpinnerService.stop('spinner-1');
		});
		
		$rootScope.$on('EbayApi:errors', function(){
			vm.error = EbayApi.getError();
			vm.showErrors = true;
			usSpinnerService.stop('spinner-1');
		});
		
		vm.toggleSaved = function(){
			if (vm.showSaved) {
				vm.btnMessage = 'Mostra ricerche salvate';
				vm.showSaved = false;					
			} else {
				vm.btnMessage = 'Nascondi ricerche salvate';
				vm.showSaved = true;
			}
		};
		
		vm.showPanel = function(key){
			vm.visiblePannels[key] = !vm.visiblePannels[key];
		};
		
		vm.hideErrors = function(){
			vm.showErrors = false;
		};

		vm.saveSearch = function(){
			usSpinnerService.spin('spinner-1');
			Searches.create($scope.isbn, true, $scope.itemFilter).then(function(data){
				var search = data;
				_.forEach(vm.items, function(category, key){
					var itemsToSave = _.filter(category, {active: true});
					if (itemsToSave.length > 0){
						_.forEach(itemsToSave, function(item){
							item.searchId = search._id
						});
						EbayItems.post(itemsToSave).then(function(data){
							vm.items[key] = itemsToSave;
						}, function(error){
							console.log('error', error);
						});
					} else {
						delete vm.items[key];
					};
				});
				vm.loadSearches();
				usSpinnerService.stop('spinner-1');
			}, function(error){
				console.log('error', error);
				usSpinnerService.stop('spinner-1');
			});
		};

		vm.loadSearches = function(){
			usSpinnerService.spin('spinner-2');
			Searches.allActive().then(function(data){
				vm.savedSearches = data;
				usSpinnerService.stop('spinner-2');
			}, function(error){
				console.log('error', error);
				usSpinnerService.stop('spinner-2');
			});
		};
		
		vm.getNumber = function(num) {
			if (num > 99) {
				num = 99;
			}
			return new Array(num);
		};
		
		vm.goToPage = function(pageNumber){
			usSpinnerService.spin('spinner-1');
			console.log('pagina', pageNumber);
			EbayApi.callApi($scope.isbn, $scope.itemFilter, pageNumber);
		}
		
		vm.loadSearches();

	}
})();

