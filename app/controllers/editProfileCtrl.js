app.controller("editProfileCtrl", ["$scope", 
  function($scope, $firebaseArray, currentAuth, $firebaseAuth, Auth, $location, $rootScope) {
  //  $scope.userId = $rootScope.user;
    var fbRef = new Firebase("https://total-zeit.firebaseio.com/profiles");




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

      $scope.personalElement = angular.element( document.querySelector(".personalinfo"));
      $scope.pilotElement = angular.element( document.querySelector(".pilotinfo"));

    $scope.personalInfo = function () {

      
      $scope.personalElement.removeClass("hide");
      $scope.pilotElement.removeClass("show");
      $scope.pilotElement.addClass("hide");

    };


    $scope.pilotInfo = function () {

      $scope.personalElement.addClass("hide");
      $scope.pilotElement.addClass("show");
    };

    $scope.submitToProfile = function () {

      fbRef.set($scope.userInformation, function () {
        console.log("Writing Data to Profile");
      });

    };

}]);