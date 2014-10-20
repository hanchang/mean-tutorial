angular.module('reNews', ['ui.router'])
.factory('posts', [function() {
  // Use an object instead of just the posts array so we can 
  // easily add new objects and methods in the future!
  var obj = {
    posts: []
  };
  return obj;
}])
.controller('MainCtrl', [
'$scope',
'posts',
function ($scope, posts) {
  $scope.test = 'Hello world!';
  $scope.posts = posts.posts;
  $scope.addPost = function() {
    if ($scope.title === '') { return; } // Don't allow empty title!
    $scope.posts.push({
      title: $scope.title, 
      link: $scope.link,
      upvotes: 0
    });
    // Clear title and link for next post.
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}]);
