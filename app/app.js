var app = angular.module("TotalZeit", ["ngRoute","firebase"])
.run([
   "$firebaseAuth",
   "$rootScope",
  function($firebaseAuth, $rootScope){
    var ref = new Firebase("https://total-zeit.firebaseio.com/");
    this.auth = $firebaseAuth(ref);
    $rootScope.user = ref.getAuth();
   // console.log($rootScope.user.uid);
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
  .otherwise({
    redirectTo: '/'
  });

}]);


