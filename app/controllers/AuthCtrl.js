app.controller("AuthCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $rootScope) {
    var ref = new Firebase("https://total-zeit.firebaseio.com/");
    $scope.user = {
      "email": "",
      "password": ""
    };

    // Authenticates user to firebase data
    $scope.auth = $firebaseAuth(ref);


    $scope.authData = null;
    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      console.log("authData", authData);
      //changes the profile picture based on how user is logged in
      $scope.authData = authData;
      $rootScope.user = authData;
      console.log($scope.authData);
    });
    
    // Authorizes user by email/password
    $scope.login = function() {

      ref.authWithPassword($scope.user, function(error, authData) {
        console.log("LogCtrl", authData);
        if (error) {
          console.log("Auth with password error", error);
          $location.path('/#/login');
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          location.reload();
           $rootScope.user = $scope.authData;
        }
      });
    };
  }
]);