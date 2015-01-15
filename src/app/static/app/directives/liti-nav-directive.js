(function() {
	"use strict";

	angular
	.module("litisbnApp")
	.directive("litiNav", function () {
		return {
			restrict: "E",
			templateUrl: "static/app/directives/liti-nav.html",
			controllerAs: 'vm',
			controller: 'LitiNavController'
		};
	});   
}());