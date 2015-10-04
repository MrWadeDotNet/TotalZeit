app.controller("FlightCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$firebaseObject",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $firebaseObject, $rootScope)  {
//Getting user Data



   var userProfile = new Firebase("https://total-zeit.firebaseio.com/profiles/" + $rootScope.currUserDbId);

      $scope.userDataObj = $firebaseObject(userProfile);

      $scope.userDataObj.$loaded().then(function()
        { 
         $scope.userFirstName = $scope.userDataObj.fName;
         $scope.userLastName = $scope.userDataObj.lName;
         $scope.userFullName = $scope.userFirstName + " " + $scope.userLastName;
         $scope.userEmail = $scope.userDataObj.email;
        }).then(function(){
           // Object to create Flight 
           $scope.flightInformation = {
              "createdBy" : $scope.userFullName,
              "email" : $scope.userEmail,
              "origin" : "",
              "destination" : "",
              "flightTime" : "",
              "description" : "",
              "aircraftId" : "",
              "aircraftType" : "",
              "maxWeight" : "",
              "assigned" : false,
              "assignedUser" : "",
              "scheduledDate" : ""
                    };

        });





    var fbRef = new Firebase("https://total-zeit.firebaseio.com/");

    var flightsRef = fbRef.child("flights");
   

    



    $scope.createFlight = function()  { 
       console.log($scope.flightInformation);

      flightsRef.push($scope.flightInformation, function () {
      console.log("Creating Flight");
      });

    };


    $scope.viewFlights = function() {

    };



}]);
