app.controller("FlightCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$firebaseObject",
   "$rootScope",
   "$filter",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $firebaseObject, $rootScope, $filter)  {
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
              "date": ""
                   };



        });





    var fbRef = new Firebase("https://total-zeit.firebaseio.com/");

    var flightsRef = fbRef.child("flights");
   
  

    $scope.createFlight = function()  { 

     /* var dateString = angular.element('#date').val();
     /* console.log(dateString);
      var date = new Date(dateString);
      $scope.flightInformation.date = date.toString();
  */
    $scope.date = $filter("date"); //(Date.now(), 'yyyy-MM-dd');
    $scope.flightInformation.date = date.value.replace(/-/g, "/");

    console.log($scope.flightInformation);    
    
      flightsRef.push($scope.flightInformation, function () {
      console.log("Creating Flight");
      });

    };


    $scope.viewFlights = function() {

    var viewFlightInfo = new Firebase("https://total-zeit.firebaseio.com/flights");

    $scope.flights = $firebaseObject(viewFlightInfo);

    console.log($scope.flights.key);


    };



}]);
