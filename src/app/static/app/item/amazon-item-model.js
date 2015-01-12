(function(){
	angular.module('models.amazonItems', ['services.constants', 'restangular'])
	.service('AmazonItems', ['Constants', 'Restangular', function (Constants, Restangular) {
		var amazonItems = Restangular.all('amazonitems');
		
		return amazonItems;
	}])
})();