app.controller("AuthCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $rootScope) {
    
    //Users variable in Firebase 
    var profileRef = new Firebase("https://total-zeit.firebaseio.com/profiles");
    var ref = new Firebase("https://total-zeit.firebaseio.com/");

    $scope.users = $firebaseArray(profileRef);


    $scope.user = {
      "email": "",
      "password": ""
    };

    // Authenticates user to firebase data
   // $scope.auth = $firebaseAuth(ref);


   //$scope.authData = null;
    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      console.log("authData", authData);
      //changes the profile picture based on how user is logged in
      $rootScope.authData = authData;
      $scope.userId = authData.uid;
      $rootScope.user = authData;
   
    });
    
    // Authorizes user by email/password
 $scope.login = function() {

      console.log($scope.authData);

      ref.authWithPassword($scope.user, function(error, authData) {
        console.log("LogCtrl", authData);
        if (error) {
          console.log("Auth with password error", error);
          $location.path('/#/login');
          // console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          var result = false;
          for(var i=0; i<$scope.users.length; i++){
            if($scope.users[i].uid===authData.uid){
              result=true;
            }
          }
          if(result===false){
            var userObj = {
              uid: authData.uid,
              email: authData.password.email
            };
            console.log(userObj);
            $scope.users.$add(userObj);
          }
          location.reload();
          $rootScope.user = $scope.authData;
        }
      });
    };
  }
]);