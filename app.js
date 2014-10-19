angular.module('reNews', [])
.controller('MainCtrl', [
'$scope',
function ($scope) {
  $scope.test = 'Hello world!';
  $scope.posts = [
    'Housing starts on the rise',
    'Interest rates at all time low',
    'Population growth stabilizing',
    'Proposition G in SF still being debated'
  ];
}]);
