app.controller("editProfileCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $rootScope)  {


     var ref2 = new Firebase("https://total-zeit.firebaseio.com/profiles");
    $scope.users = $firebaseArray(ref2);
    

    $scope.users.$loaded()
    .then(function(){
      for(var i=0; i<$scope.users.length; i++){
        console.log($scope.user.uid, $scope.users[i].uid);
        if($scope.users[i].uid===$scope.user.uid){
          $scope.currentUser = $scope.users[i];
          $rootScope.currentUserId = $scope.users[i].$id;
          console.log($scope.currentUser);
        }
      }
    });

    var fbRef = new Firebase("https://total-zeit.firebaseio.com/profiles/" + $rootScope.currentUserId);
   // var editRef = new Firebase("https://total-zeit.firebaseio.com/profiles" + $
// Data from firebase 

    $scope.userInformation = {
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