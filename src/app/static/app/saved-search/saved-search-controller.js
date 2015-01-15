(function () {
	'use strict';
	
	angular.module('litisbnApp').controller('SavedSearchController', [ 
		'usSpinnerService', 
		'$rootScope',
		'$scope',
		'Searches',
		'Auth',
		SavedSearchController
	]);
	
	function SavedSearchController(usSpinnerService, $rootScope, $scope, Searches, Auth) {
		var vm = this;
		
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
		
		if(Auth.isLoggedIn()){
			vm.loadSearches();
		};
		
		$rootScope.$on('SeachController:savedSearch', function(){
			vm.loadSearches();
		});
	}
})();


