'use strict';

module.exports = function ($scope, $cookies, $state, Auth) {

  $scope.loading = false;
  $scope.error = null;

  $scope.login = function (user) {
    $scope.loading = true;
    $scope.error = null;

    Auth.login(user)
    .then(function (session) {
      $cookies.put('token', session.token);
      $cookies.putObject('user', session.user);
      return $state.go('home');
    })
    .catch(function (err) {
      $scope.error = err.message;
    })
    .finally(function () {
      $scope.loading = false;
    });
  };

};
