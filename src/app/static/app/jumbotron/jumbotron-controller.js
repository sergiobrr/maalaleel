(function () {
	'use strict';
	
	angular.module('litisbnApp').controller('JumbotronController', [
		'EbayApi',
		'AmazonApi',
		'usSpinnerService', 
		'$scope',
		'$http',
		JumbotronController]);
	
	function JumbotronController(EbayApi, AmazonApi, usSpinnerService, $scope, $http) {
		
		$scope.useFilter = false;
		$scope.filterMessage = 'Filtra';
		$scope.itemFilter = {
			MinPrice: 0.5,
			MaxPrice: 1.5
		}
		
		$scope.lookup = function(){
			usSpinnerService.spin('spinner-1');
			console.log()
			if ($scope.useFilter){
				EbayApi.callApi($scope.isbn, $scope.itemFilter);
			} else {
				EbayApi.callApi($scope.isbn);
			};
			AmazonApi.callApi($scope.isbn);
		};
		
		$scope.displayFilter = function(){
			$scope.useFilter = !$scope.useFilter;
			if (!$scope.useFilter){
				$scope.filterMessage = 'Filtra';
			}
			else {
				$scope.filterMessage = 'Nascondi filtro';
			};
		}

		$scope.condNew = function(){
			$scope.itemFilter.Condition = 'New';
		};
		
		$scope.condUsed = function(){
			$scope.itemFilter.Condition = 'Used';
		};
		
		$scope.condUnspec = function(){
			$scope.itemFilter.Condition = 'Unspecified';
		};
		
		$scope.sellerPriv = function(){
			$scope.itemFilter.SellerBusinessType = 'Private';
		};
		
		$scope.sellerBis = function(){
			$scope.itemFilter.SellerBusinessType = 'Business';
		};
		
		$scope.sellingAuct = function(){
			$scope.itemFilter.ListingType = 'Auction';
		};
		
		$scope.sellingAuctBIN = function(){
			$scope.itemFilter.ListingType = 'AuctionWithBIN';
		};
		
		$scope.sellingClass = function(){
			$scope.itemFilter.ListingType = 'Classified';
		};
		
		$scope.sellingFix = function(){
			$scope.itemFilter.ListingType = 'Fixed';
		};
		
		$scope.sellingAll = function(){
			$scope.itemFilter.ListingType = 'All';
		};
		
	};	
})();