app.controller("ProfileCtrl", 
  ["$scope",
  "$firebaseArray",
  "$firebaseAuth",
  "$location",
  "$rootScope",
  "$firebaseObject",
  function($scope, $firebaseArray, $firebaseAuth, $location, $rootScope, $firebaseObject) {



    $rootScope.users.$loaded()
    .then(function(){
      for(var i=0; i<$rootScope.users.length; i++){
        console.log($rootScope.user.uid, $rootScope.users[i].uid);
        if($rootScope.users[i].uid===$rootScope.user.uid){

          $rootScope.currentUser = $rootScope.users[i];
          $rootScope.currUserDbId = $rootScope.users[i].$id;
          $rootScope.currUserEmail = $rootScope.users[i].email;
          $rootScope.currUserUid = $rootScope.users[i].uid;

          console.log($rootScope.currUserDbId);
          console.log($rootScope.currUserEmail);
          console.log($rootScope.currUserUid);

        }
      }

    var ref2 = new Firebase("https://total-zeit.firebaseio.com/profiles/" + $rootScope.currUserDbId);

    $scope.userData = $firebaseObject(ref2);

    console.log($scope.userData);

    });


}]);