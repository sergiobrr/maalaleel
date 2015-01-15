(function() {
	"use strict";

	angular
	.module("litisbnApp")
	.directive("litiEbayItem", function () {
		return {
			restrict: "E",
			templateUrl: "static/app/item/ebay-item/ebay-item.html"
		};
	});   
}());