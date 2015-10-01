app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://total-zeit.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);