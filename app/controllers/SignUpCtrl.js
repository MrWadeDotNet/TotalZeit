app.controller("SignUpCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseObject",
   "$rootScope",
  function($scope, $routeParams, $firebaseObject,$rootScope) {
    var ref = new Firebase("https://total-zeit.firebaseio.com/");


    console.log($routeParams)

    // Grabs user input from DOM
    $scope.user = {
      "email": "",
      "password": ""
    };
console.log("Current User ID", $rootScope.currentUserId);

    // Adds new user to firebase authentication via email/password
    $scope.createUser = function() {

      ref.createUser($scope.user, function(error, userData) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              $scope.message = "The new user account cannot be created because the email is already in use.";
              break;
            case "INVALID_EMAIL":
              $scope.message = "The specified email is not a valid email.";
              break;
              case "INVALID_PASSWORD":
              $scope.message = "The specified password is incorrect.";
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          //after User successfully created move on to profile information.
          $location.path('/#/editprofile');
        }
      });
  


    }; 
  }
]);