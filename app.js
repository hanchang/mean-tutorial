angular.module('reNews', [])
.controller('MainCtrl', [
'$scope',
function ($scope) {
  $scope.test = 'Hello world!';
  $scope.posts = [
    { title: 'Housing starts on the rise', upvotes: 3 },
    { title: 'Interest rates at all time low', upvotes: 6 },
    { title: 'Population growth stabilizing', upvotes: 1 },
    { title: 'Proposition G in SF still being debated', upvotes: 9 }
  ];
  $scope.addPost = function(){
    if ($scope.title === '') { return; } // Don't allow empty title!
    $scope.posts.push({title: $scope.title, upvotes: 0});
    $scope.title = ''; // Clear title for next post.
  };
}]);
