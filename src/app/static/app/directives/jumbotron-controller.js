(function () {
	'use strict';
	
	angular.module('litisbnApp').controller('JumbotronController', [
		'EbayApi',
		'AmazonApi',
		'usSpinnerService', 
		'$scope',
		JumbotronController]);
	
	function JumbotronController(EbayApi, AmazonApi, usSpinnerService, $scope) {
		
		var vm = this;
		vm.useFilter = false;
		$('.my-cloak').removeClass('my-cloak');	
		vm.isbn = '';
		vm.filterMessage = 'Filtra';
		vm.itemFilter = {
			MinPrice: 0.5,
			MaxPrice: 1.5
		}
		
		vm.lookup = function(){
			usSpinnerService.spin('spinner-1');
			if (vm.useFilter){
				$scope.$parent.itemFilter = vm.itemFilter;
				EbayApi.callApi(vm.isbn, vm.itemFilter);
			} else {
				EbayApi.callApi(vm.isbn);
			};
			AmazonApi.callApi(vm.isbn);
			$scope.$parent.isbn = vm.isbn;
		};
		
		vm.displayFilter = function(){
			vm.useFilter = !vm.useFilter;
			if (!vm.useFilter){
				vm.filterMessage = 'Filtra';
			}
			else {
				vm.filterMessage = 'Nascondi filtro';
			};
		}

		vm.condNew = function(){
			vm.itemFilter.Condition = 'New';
		};
		
		vm.condUsed = function(){
			vm.itemFilter.Condition = 'Used';
		};
		
		vm.condUnspec = function(){
			vm.itemFilter.Condition = 'Unspecified';
		};
		
		vm.sellerPriv = function(){
			vm.itemFilter.SellerBusinessType = 'Private';
		};
		
		vm.sellerBis = function(){
			vm.itemFilter.SellerBusinessType = 'Business';
		};
		
		vm.sellingAuct = function(){
			vm.itemFilter.ListingType = 'Auction';
		};
		
		vm.sellingAuctBIN = function(){
			vm.itemFilter.ListingType = 'AuctionWithBIN';
		};
		
		vm.sellingClass = function(){
			vm.itemFilter.ListingType = 'Classified';
		};
		
		vm.sellingFix = function(){
			vm.itemFilter.ListingType = 'Fixed';
		};
		
		vm.sellingAll = function(){
			vm.itemFilter.ListingType = 'All';
		};
	};
	
	
})();