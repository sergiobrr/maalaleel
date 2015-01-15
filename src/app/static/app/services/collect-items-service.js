(function(){
	angular.module('services.collectItems',[
		'services.ebayApi', 
		'services.amazonApi', 
		'models.ebayItems',
		'models.amazonItems'
	])
	.factory('CollectItems', [
		'EbayApi', 
		'AmazonApi',
		'EbayItems',
		'AmazonItems',
		'$rootScope',
		'$q',
		function(EbayApi, AmazonApi, EbayItems, AmazonItems, $rootScope, $q){

		var amazonReady = false;
		var ebayReady = false;
		var items = [];
		
		$rootScope.$on('AmazonApi:resultReady', function(){
			if (ebayReady){
				items.push.apply(items, AmazonApi.getItems()); 
				ebayReady = false;
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				items = AmazonApi.getItems();
				amazonReady = true;
			};
		});
		
		$rootScope.$on('AmazonApi:errors', function(){
			if(ebayReady){
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
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				items = EbayApi.getItems();
				ebayReady = true;
			};
		});
		
		$rootScope.$on('EbayApi:errors', function(){
			if(amazonReady){
				amazonReady = false;
				$rootScope.$broadcast('CollectItems:itemsReady');
			} else {
				ebayReady = true;
			};
		});
					
		var getItems = function(){
			var _items = angular.copy(items)
			items = [];
			return _.sortBy(_items, 'price');
		}
		
		var saveItems = function(search, items){
			var deferred = $q.defer();
			var _items = _.map(items, function(item){
				return _.extend({}, item, {searchId: search._id});
			});
			var ebayItems = _.filter(_items, {ebay: true});
			var amazonItems = _.filter(_items, {amazon: true});
			EbayItems.post(ebayItems).then(function(data){
			}, function(error){
				console.log('error', error);
			})
			.finally(function(){
				AmazonItems.post(amazonItems).then(function(data){
					deferred.resolve();
				}, function(error){
					console.log('error', error);
					deferred.resolve();
				});
			});
			
			return deferred.promise;
		};
				
		return {
			getItems: getItems,
			saveItems: saveItems
		};
		
	}]);

})();
