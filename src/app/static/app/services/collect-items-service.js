(function(){
	angular.module('services.collectItems',['services.ebayApi', 'services.amazonApi'])
	.factory('CollectItems', ['EbayApi', 'AmazonApi', '$rootScope', function(EbayApi, AmazonApi, $rootScope){

		var amazonReady = false;
		var ebayReady = false;
		var items = [];
		
		$rootScope.$on('AmazonApi:resultReady', function(){
			if (ebayReady){
				items.push.apply(items, AmazonApi.getItems()); 
				amazonReady = false;
				ebayReady = false;
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				items = AmazonApi.getItems();
				amazonReady = true;
			};
		});
		
		$rootScope.$on('AmazonApi:errors', function(){
			if(ebayReady){
				amazonReady = false;
				ebayReady = false;
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				amazonReady = true;
			};
		});
		
		$rootScope.$on('EbayApi:resultReady', function(){
			if (amazonReady){
				items.push.apply(items, EbayApi.getItems());
				amazonReady = false;
				ebayReady = false;
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				items = EbayApi.getItems();
				ebayReady = true;
			};
		});
		
		$rootScope.$on('EbayApi:errors', function(){
			if(amazonReady){
				amazonReady = false;
				ebayReady = false;
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				ebayReady = true;
			};
		});
		
		var getItems = function(){
			var _items = angular.copy(items);
			items = []
			return _.sortBy(_items, 'price');
		}

		
		
		return {
			getItems: getItems
		};
		
	}]);

})();
