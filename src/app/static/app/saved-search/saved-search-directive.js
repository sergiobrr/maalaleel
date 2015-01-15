(function() {
	"use strict";

	angular
	.module("litisbnApp")
	.directive("litiSearch", function () {
		return {
			restrict: "E",
			templateUrl: "static/app/saved-search/saved-search-one.html",
			controller: "SavedSearchDirectiveController",
			controllerAs: 'vm',
			scope: true
		};
	});   
}());