(function() {
  "use strict";
  angular
  .module("litisbnApp")
  .directive("litiEbayCategory", function () {
    return {
    	restrict: "E",
    	templateUrl: "static/app/categories/ebay-category.html",
  	};
	});    
}());