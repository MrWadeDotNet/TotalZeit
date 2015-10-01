app.controller("editProfileCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $rootScope)  {

    console.log($rootScope.currUserDbId);

    var fbRef = new Firebase("https://total-zeit.firebaseio.com/profiles/" + $rootScope.currUserDbId);
   // var editRef = new Firebase("https://total-zeit.firebaseio.com/profiles" + $
// Data from firebase 

    $scope.userInformation = {
      "uid" : $rootScope.currUserUid,
      "email" : $rootScope.currUserEmail,
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

      console.log($scope.userInformation);

      fbRef.set($scope.userInformation, function () {
        console.log("Writing Data to Profile");
        //will navigate to profile page.
      });

    };

}]);