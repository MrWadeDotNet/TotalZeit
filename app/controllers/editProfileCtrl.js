app.controller("editProfileCtrl", ["$scope", 
  function($scope, $firebaseArray, currentAuth, $firebaseAuth, Auth, $location, $rootScope) {
    $scope.userId = $rootScope.user;
    var ref = new Firebase("https://total-zeit.firebaseio.com/profiles");




    $scope.userInformation = {
      "userId" : "$scope.userId",
      "fName" : "",
      "lName" : "",
      "street" : "",
      "state" : "",
      "zip" : "",
      "height" : "",
      "weight" : "",
      "license" : "",
      "homeAirport" : "",
      "hoursPic" : "",
      "hoursTT" : "",
      "rating" : ""

    };

 $scope.personalInfo = function () {

      var personalElement = angular.element( document.querySelector(".personalinfo"));
      var pilotElement = angular.element( document.querySelector(".pilotinfo"));
      
      personalElement.removeClass("hide");
      pilotElement.removeClass("show");
      pilotElement.addClass("hide");

    };


    $scope.pilotInfo = function () {

      var personalElement = angular.element( document.querySelector(".personalinfo"));
      var pilotElement = angular.element( document.querySelector(".pilotinfo"));
     
      personalElement.addClass("hide");
      pilotElement.addClass("show");


    };

}]);