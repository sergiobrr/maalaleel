(function() {
  "use strict";
  angular
  .module("litisbnApp")
  .directive("litiJumbotron", function () {
    return {
      restrict: "E",
      templateUrl: "static/app/jumbotron/jumbotron.html",
			controller: 'JumbotronController',
			scope : {
				isbn: '=',
				displayitems: '=',
				results: '='
			}
    };
  });    
}());