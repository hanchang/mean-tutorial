angular.module('reNews', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl'
  });
  $stateProvider.state('posts', {
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });

  $urlRouterProvider.otherwise('home');
}])
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
      upvotes: 0,
      // Temporary fake comments for testing
      comments: [
        { author: 'Joe', body: 'Cool post!', upvotes: 0 },
        { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }
      ]
    });
    // Clear title and link for next post.
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}])
.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {
  $scope.post = posts.posts[$stateParams.id];
}]);
