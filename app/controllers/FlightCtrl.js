app.controller("FlightCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$firebaseObject",
   "$rootScope",
   "$filter",
   "$window",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $firebaseObject, $rootScope, $filter, $window)  {
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
              "cost": "",
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
        $window.location.href = '/viewFlights';
         console.log("Creating Flight");
      });

    };


    $scope.viewFlights = function() {

    var viewFlightInfo = new Firebase("https://total-zeit.firebaseio.com/flights");

   // $scope.flights = $firebaseObject(viewFlightInfo);
    


    $scope.flights = $firebaseArray(viewFlightInfo);
      console.log($scope.flights);

    };

    $scope.assignFlight = function(key) {
      

        var userProfile = new Firebase("https://total-zeit.firebaseio.com/profiles/" + $rootScope.currUserDbId);

      $scope.userDataObj = $firebaseObject(userProfile);

        $scope.userDataObj.$loaded().then(function()
        { 
         $scope.userFirstName = $scope.userDataObj.fName;
         $scope.userLastName = $scope.userDataObj.lName;
         $scope.userFullName = $scope.userFirstName + " " + $scope.userLastName;
         $scope.userEmail = $scope.userDataObj.email;
         $scope.userUid = $scope.userDataObj.uid;
        }).then(function(){
           // Object to create Flight 
         $scope.dataKey = key;
          var assignFlightRef = new Firebase("https://total-zeit.firebaseio.com/flights/" + $scope.dataKey);
     //Gathered FB object for Flight ID
         $scope.assignObj = $firebaseObject(assignFlightRef);
          console.log($scope.assignObj);
                //Reassigned values to FB Object 
          $scope.newObj = {};
          $scope.newObj.assignedUser = $scope.userFullName;
          $scope.newObj.assigned = true;
          $scope.newObj.assignedId = $scope.userUid;
                //Updated Values on FB
          assignFlightRef.update($scope.newObj, function () {
           console.log("Updating Flight");

            });

        });

    };

/* VIEW ASSIGNED FLIGHTS INOP 

    $scope.viewAssignedFlights = function() {

       var userProfile = new Firebase("https://total-zeit.firebaseio.com/profiles/" + $rootScope.currUserDbId);

      $scope.userDataObj = $firebaseObject(userProfile);

       $scope.userDataObj.$loaded().then(function()
        {
         $scope.userFirstName = $scope.userDataObj.fName;
         $scope.userLastName = $scope.userDataObj.lName;
         $scope.userFullName = $scope.userFirstName + " " + $scope.userLastName;
         $scope.userEmail = $scope.userDataObj.email;
         $scope.userUid = $scope.userDataObj.uid;
        }).then(function(){
      
          var assignedFlightsRef = new Firebase("https://total-zeit.firebaseio.com/flights")
          .startAt($scope.userUid)
          .endAt($scope.userUid)
          .once('value', function(snap) {
            console.log("Snaps", snap.val());
          });

          //$scope.assignedFlightsObj = $firebaseObject(assignedFlightsRef);

          // console.log($scope.assignedFlightsObj);

                    assignedFlightsRef.on("value", function(snapshot) {
              console.log(snapshot.val());

             $scope.myFlights = snapshot.val; 

            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });

           });
  }
*/


}]);
