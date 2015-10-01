app.controller("RootCtrl", 
  ["$scope",
  "$rootScope",
  "$firebaseAuth",
  "$firebaseArray",
  "$location",
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, $location) {
    var ref = new Firebase("https://total-zeit.firebaseio.com/");
    $scope.auth = $firebaseAuth(ref);
    var ref2 = new Firebase("https://total-zeit.firebaseio.com/profiles");
    $scope.users = $firebaseArray(ref2);

    $scope.user = $rootScope.user;

    $scope.search = "";

    $scope.logout = function(){
      $scope.auth.$unauth();
      $location.path('/#/');
      location.reload();
    };

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
  }
]);