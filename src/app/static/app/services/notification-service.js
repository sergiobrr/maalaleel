(function(){
	angular.module('services.notifications',['toaster'])
	.factory('Notifications', ['toaster', '$rootScope', function(toaster, $rootScope){
		
		return {
			success: function(title, text){
				toaster.pop('success', title, text);
			},
			info: function(title, text){
				toaster.pop('info', title, text);
			},
			error: function(title, text){
				toaster.pop('error', title, text);
			}
		};
		
	}]);
})();
