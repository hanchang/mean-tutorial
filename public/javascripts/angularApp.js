angular.module('reNews', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/home.html',
    resolve: {
      postPromise: ['posts', function(posts){
        return posts.getAll();
      }]
    },
    controller: 'MainCtrl'
  });
  $stateProvider.state('posts', {
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });

  $urlRouterProvider.otherwise('home');
}])
.factory('posts', ['$http', function($http) {
  // Use an object instead of just the posts array so we can 
  // easily add new objects and methods in the future!
  var obj = {
    posts: []
  };
  obj.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, obj.posts);
    });
  };
  obj.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      obj.posts.push(data);
    });
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
    posts.create({
      title: $scope.title,
      link: $scope.link,
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
  $scope.addComment = function() {
    if ($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  }
}]);
