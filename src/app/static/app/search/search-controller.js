(function () {
	'use strict';
	
	angular.module('litisbnApp').controller('SearchController', [ 
		'usSpinnerService', 
		'CollectItems',
		'Searches',
		'$rootScope',
		'$scope',
		'Notifications',
		'toaster',
		SearchController
	]);
	
	function SearchController(usSpinnerService, CollectItems, Searches, $rootScope, $scope, Notifications, toaster) {
		var vm = this;
				
		$scope.$parent.displayItems = false;

		vm.showSaved = true;
		vm.btnMessage = 'Nascondi ricerche salvate';
		vm.itemsToSave = [];
		
		$rootScope.$on('CollectItems:itemsReady', function(){
			vm.items = CollectItems.getItems();
			if (vm.items.length > 0) {
				$scope.$parent.displayItems = true;
			}
			usSpinnerService.stop('spinner-1');
		});
		
		$rootScope.$on('AmazonApi:errors', function(){
			Notifications.info('Nessun risultato da Amazon', 'Non ci sono risultati per la ricerca di: ' + $scope.isbn);
		});
		
		$rootScope.$on('EbayApi:errors', function(){
			Notifications.info('Nessun risultato da Ebay', 'Non ci sono risultati per la ricerca di: ' + $scope.isbn);
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

