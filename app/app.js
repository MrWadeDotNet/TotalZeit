var app = angular.module("TotalZeit", ["ngRoute","firebase"])
.run([
   "$firebaseAuth",
   "$rootScope",
   "$firebaseArray",
  function($firebaseAuth, $rootScope, $firebaseArray){
  

    var ref = new Firebase("https://total-zeit.firebaseio.com/");
    this.auth = $firebaseAuth(ref);
    $rootScope.user = ref.getAuth();


  // console.log($rootScope.user.uid);

    var ref2 = new Firebase("https://total-zeit.firebaseio.com/profiles");

    $rootScope.users = $firebaseArray(ref2);


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
    });


  }
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/main.html',
    controller: 'MainCtrl'
  }).when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'AuthCtrl'
  }).when('/about', {
    templateUrl: 'partials/about.html'
  }).when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignUpCtrl'
  }).when('/editprofile', {
    templateUrl: 'partials/editprofile.html',
    controller: 'editProfileCtrl'
  })
  .when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'ProfileCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

}]);