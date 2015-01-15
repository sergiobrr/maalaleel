(function() {
	"use strict";

	angular
	.module("litisbnApp")
	.directive("litiAmazonItem", function () {
		return {
			restrict: "E",
			templateUrl: "static/app/item/amazon-item/amazon-item.html"
		};
	});   
}());