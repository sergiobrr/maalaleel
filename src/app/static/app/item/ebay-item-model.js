(function(){
	angular.module('models.ebayItems', ['services.constants', 'restangular'])
	.service('EbayItems', ['Constants', 'Restangular', function (Constants, Restangular) {
		var ebayItems = Restangular.all('ebayitems');
		
		return ebayItems;
	}])
})();