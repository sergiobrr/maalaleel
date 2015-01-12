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

		vm.itemsToSave = [];
		
		$rootScope.$on('CollectItems:itemsReady', function(){
			console.log('Arrivato messaggio.....');
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

		vm.saveSearch = function(){
			usSpinnerService.spin('spinner-1');
			Searches.create($scope.isbn, true, $scope.itemFilter).then(function(data){
				CollectItems.saveItems(data, vm.items).then(function(){
					Notifications.success('Ricerca salvata', 'Keywords:' + $scope.isbn);
				});
			}, function(error){
				console.log('error', error);
				Notifications.error('Errore salvando la ricerca', error);
			})
			.finally(function(){
				vm.loadSearches();
				usSpinnerService.stop('spinner-1');
			});
		};
		
		$scope.loadSearch = function($event, search){
			$event.preventDefault();
			usSpinnerService.spin('spinner-1');
			search.getItems().then(function(data){
				vm.items = data;
				$scope.isbn = search.keywords;
				$scope.$parent.displayItems = true;
			}, function(error){
				console.log('error', error);
			})
			.finally(function(){
				usSpinnerService.stop('spinner-1');
			});
		};

		vm.loadSearches = function(){
			usSpinnerService.spin('spinner-2');
			Searches.allActive().then(function(data){
				vm.savedSearches = data;
			}, function(error){
				console.log('error', error);
			})
			.finally(function(){
				usSpinnerService.stop('spinner-2');
			});
		};
				
		vm.loadSearches();
	}
})();

//		vm.getNumber = function(num) {
//			if (num > 99) {
//				num = 99;
//			}
//			return new Array(num);
//		};
//		
//		vm.goToPage = function(pageNumber){
//			usSpinnerService.spin('spinner-1');
//			console.log('pagina', pageNumber);
//			EbayApi.callApi($scope.isbn, $scope.itemFilter, pageNumber);
//		}

