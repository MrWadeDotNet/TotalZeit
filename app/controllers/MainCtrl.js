app.controller("MainCtrl", ["$scope", 
  function($scope, $firebaseArray, currentAuth, $firebaseAuth, Auth, $location, $rootScope) {
    console.log("User:", $rootScope.user);

    $scope.userId = $rootScope.user;

}]);