var app = angular.module("TotalZeit", ["ngRoute", "firebase"]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/feed.html',
    controller: 'MainCtrl',
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
  }).when('/new', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl',
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  }

 // Login Controller 

/*  .controller('LoginCtrl', function($scope) {
  var projectList = this;
  projectList.projects = projects;
    })*/