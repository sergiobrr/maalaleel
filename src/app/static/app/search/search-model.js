(function(){
	angular.module('models.searches', ['restangular'])
	.service('Searches', ['Restangular', '$q', function (Restangular, $q) {
		Restangular.extendModel('searches', function(model){
			model.getItems = function(){
				var deferred = $q.defer();
				var _id = this._id;
				var items = [];
				Restangular.all('ebayitems').customGETLIST('', {where: {searchId: _id}}).then(function(data){
					items = data;
				}, function(error){
					console.log('error', error);
				})
				.finally(function(){
					Restangular.all('amazonitems').customGETLIST('', {where: {searchId: _id}}).then(function(data){
						items.push.apply(items, data);
					}, function(error){
						console.log('error', error);
					})
					.finally(function(){
						deferred.resolve(_.sortBy(items, 'price'));
					});
				});
				return deferred.promise;
			},
			model.deleteSearch = function(){
				Restangular.all('ebayitems').customGETLIST('', {where: {searchId: this._id}}).then(function(data){
					_.forEeach(data, function(item){
						Restangular.one('ebayitems', item._id).remove('', {'If-Match': item._etag}).then(function(data){
						}, function(error){
							console.log('error', error);
						});
					});
				}, function(error){
					console.log('error', error);
				});
				Restangular.all('amazonitems').customGETLIST('', {where: {searchId: this._id}}).then(function(data){
					_.forEach(data, function(item){
						Restangular.one('amazonitems', item._id).remove('', {'If-Match': item._etag}).then(function(data){	
						}, function(error){
							console.log('error', error);
						});
					});
				}, function(error){
					console.log('error', error);
				});
				return Restangular.one('searches', this._id).patch({active: false}, '', {'If-Match': this._etag});
			};
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
			console.log('ricerca', search);
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
