(function(){
	angular.module('services.ebayApi',['services.constants'])
	.factory('EbayApi', ['Constants', '$http', '$rootScope', function(Constants, $http, $rootScope){
		var url = Constants.ebayApiUrl;

		var paginationOutput;
		var items = [];
		var error;
		var currentPage;
		
		
		var callApi = function(keywords, itemFilter, pageNumber){
			var params = {keywords: keywords};
			if (typeof itemFilter != undefined){
				for (var key in itemFilter){
					params[key] = itemFilter[key]
				}
			};
			if(typeof pageNumber != undefined) {
				params['paginationInput'] = pageNumber;
			};
			$http.get(url, {params: params})
			.then(function(data){
				paginationOutput = data.data.paginationOutput;
				currentPage = paginationOutput.pageNumber;
				items = data.data.items;
				$rootScope.$broadcast('EbayApi:resultReady');
			}, function(error){
				console.log('error:', error);
				$rootScope.$broadcast('EbayApi:errors');
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
		
		var getCurrentPage = function(){
			return currentPage;
		}
		
		
		return {
			getItems: getItems,
			getPagination: getPagination,
			callApi: callApi,
			getError: getError,
			getCurrentPage: getCurrentPage
		};
		
	}]);

})();
