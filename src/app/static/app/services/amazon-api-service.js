(function(){
	angular.module('services.amazonApi',['services.constants'])
	.factory('AmazonApi', ['Constants', '$http', '$rootScope', function(Constants, $http, $rootScope){
		var url = Constants.amazonApiUrl;

		var paginationOutput;
		var items = [];
		var error;
		
		
		var callApi = function(keywords){
			var params = {keywords: keywords};
			$http.get(url, {params: params})
			.then(function(data){
				paginationOutput = data.data.paginationOutput;
				items = data.data.items;
				$rootScope.$broadcast('AmazonApi:resultReady');
			}, function(error){
				console.log('error:', error);
				error = error;
				$rootScope.$broadcast('AmazonApi:errors');
			});
		};
			
		var getItems = function(){
			return items;
		};
		
		var getPagination = function(){
			return paginationOutput;
		};
		
		var getError = function(){
			return error;
		};
		
		
		return {
			getItems: getItems,
			getPagination: getPagination,
			callApi: callApi,
			getError: getError
		};
		
	}]);

})();
