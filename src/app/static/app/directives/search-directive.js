(function() {
	"use strict";

	angular
	.module("litisbnApp")
	.directive("litiSearch", function () {
		return {
			restrict: "E",
			templateUrl: "static/app/search/single-search.html",
			controller: "SavedSearchController",
			controllerAs: "vm",
			scope: true
		};
	});   
}());