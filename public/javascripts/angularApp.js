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
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.get($stateParams.id);
      }]
    },
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
  obj.get = function(post_id) {
    return $http.get('/posts/' + post_id).then(function(res) {
      return res.data;
    });
  };
  obj.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      obj.posts.push(data);
    });
  };
  obj.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote').success(function(data) {
      post.upvotes += 1;
    });
  };
  obj.addComment = function(post_id, comment) {
    return $http.post('/posts/' + post_id + '/comments', comment);
  };
  obj.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
      .success(function(data) {
        comment.upvotes += 1;
      });
  };
  return obj;
}])
.controller('MainCtrl', [
'$scope',
'posts',
function ($scope, posts) {
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
    posts.upvote(post);
  };
}])
.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
'post',
function($scope, posts, post) {
  $scope.post = post;
  $scope.addComment = function() {
    if ($scope.body === '') { return; }
    posts.addComment(post._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(comment) {
    posts.upvoteComment(post, comment);
  };
}]);
