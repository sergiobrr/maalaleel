(function(){
	angular.module('models.searches', ['restangular'])
	.service('Searches', ['Restangular', function (Restangular) {
		Restangular.extendModel('searches', function(model){
			model.getEbayItems = function(){
				return Restangular.all('ebayitems').customGETLIST('', {where: {searchId: this._id}});
			},
			model.deleteSearch = function(){
				Restangular.all('ebayitems').customGETLIST('', {where: {searchId: this._id}}).then(function(data){
					_.forEach(data, function(item){
						Restangular.one('ebayitems', item._id).remove('', {'If-Match': item._etag}).then(function(data){
						}, function(error){
							console.log(error);
						});
					});
				});
				return Restangular.one('searches', this._id).patch({active: false}, '', {'If-Match': this._etag});
			};
//			model.ebayItemNum = Restangular.all('ebayitems').customGETLIST('', {where: {searchId: 'this._id'}}).$object;
			return model;
		});
		
		var all = function(){
			return Restangular.all('searches');
		};
		
		var allActive = function(){
			return Restangular.all('searches').customGETLIST('', {where: {active: true}, sort: '[("searchData",-1)]'});
		};
		
		var one = function(_id){
			return Restangular.one('searches', _id).get();
		};
		
		var create = function(keywords, active, itemFilter){
			var id;
			var now = new Date();
			var search = {
				searchData: now.toUTCString(),
				keywords: keywords,
				active: active
			};
			if (typeof itemFilter != undefined) {
				search.itemfilter = itemFilter;
			};
			
			return Restangular.all('searches').post(search);
		};
		
		var updateEbayList = function(search, ebayList){
			console.log('ebayList', ebayList);
			return Restangular.one('searches', search._id).patch({ebayitems: ebayList}, '', {'If-Match': search._etag});
		};

		return {
			all: all,
			allActive: allActive,
			one: one,
			create: create,
			updateEbayList: updateEbayList
		}
	}])
})();

//Thu, 08 Jan 2015 05:30:38 GMT
//Thu, 08 Jan 2015 05:32:47 GMT