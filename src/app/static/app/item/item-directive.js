(function() {
	"use strict";

	angular
	.module("litisbnApp")
	.directive("litiItem", function () {
		return {
			restrict: "E",
			templateUrl: "static/app/item/item.html"
		};
	});    
}());