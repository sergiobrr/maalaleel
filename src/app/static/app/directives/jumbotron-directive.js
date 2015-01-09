(function() {
  "use strict";
  angular
  .module("litisbnApp")
  .directive("litiJumbotron", function () {
    return {
      restrict: "E",
      templateUrl: "static/app/partials/jumbotron.html",
			controllerAs: 'vm',
			controller: 'JumbotronController',
			scope: true
    };
  });    
}());