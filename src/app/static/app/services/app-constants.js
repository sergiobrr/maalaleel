(function(){
	angular.module('services.constants',[])
	.constant('Constants', {
		ebayApiUrl: 'http://shop.smimemail.net/ebay/',
		amazonApiUrl: 'http://shop.smimemail.net/amazon/',
		restangularBaseUrl: 'http://shop.smimemail.net/api/',
		loginUrl: 'http://shop.smimemail.net/login/',
		ACCESS_LEVELS: {
			pub: 1,
			user: 2
		}
	});
})();