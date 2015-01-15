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
				
		$scope.displayitems = false;
		$scope.isbn = 'feltrinelli minaccia';
		$scope.results = false;
		vm.testVar = false;

		vm.itemsToSave = [];
		
		$rootScope.$on('CollectItems:itemsReady', function(){
			console.log('Arrivatttiii');
			vm.items = CollectItems.getItems();
			if (vm.items.length > 0) {
				console.log('display1', $scope.displayitems);
				$scope.displayitems = true;
				vm.testVar = true;
				console.log('display1', $scope.displayitems);
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
					$rootScope.$broadcast('SeachController:savedSearch');
				});
			}, function(error){
				console.log('error', error);
				Notifications.error('Errore salvando la ricerca', error);
			})
			.finally(function(){
				usSpinnerService.stop('spinner-1');
			});
		};
		
		$scope.loadSearch = function($event, search){
			$event.preventDefault();
			usSpinnerService.spin('spinner-1');
			search.getItems().then(function(data){
				vm.items = data;
				$scope.isbn = search.keywords;
				$scope.displayitems = true;
			}, function(error){
				console.log('error', error);
			})
			.finally(function(){
				usSpinnerService.stop('spinner-1');
			});
		};
		
		$scope.$on('requestContextChanged', function(){
			console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!');
		})
		
		console.log('displayStart', $scope.displayitems);
	}
})();


