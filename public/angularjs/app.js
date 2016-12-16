(function(){

  var app = angular.module('socialZoo',['ngRoute']);

  app.controller('zooCtrl',function(zooService, $scope){

    $scope.zoos = [];
    zooService.getAllPosts().then(function(response) {
      // console.log(response.data);
      $scope.zoos = response.data;
    });

  });

  app.controller('zooProfileCtrl',function(zooService,$scope,$routeParams){
    var zooId = $routeParams.zooId;
    console.log(zooId);
    $scope.profile = {};
    zooService.getOnePost(zooId).then(function(response){
      $scope.profile = response.data;
      console.log($scope.profile);
    });
  });

  app.controller('formCtrl',function($scope,zooService){
    this.contact = function() {
      zooService.postAddOne({
        name: $scope.name,
        address: $scope.address,
        description: $scope.description,
        population: $scope.population,
        superficy: $scope.superficy,
        species: $scope.species,
        hours: $scope.hours,
        price: $scope.price
      }).then(function(response){
        window.location.href = "#/page2"
      });
    }


  });

  // controller de post //
  app.controller('testController', function(appService, $scope) {
          var _this = this;
          $scope.posts = [];
          $scope.master = [];
          // $scope.test = function(postID) {
          //   console.log('aaa', postID);
          //   return "<h1>a</h1>";
          // }
          this.commentsFetch = function(arrayPosts) {

            console.log("commentsFetch() :", arrayPosts)
            for(var i=0;i<arrayPosts.length;i++) {
              let postID = arrayPosts[i]._id;
              console.log('IDpost', postID);
              $scope.master = [];
              appService.getAllComment(postID).then(function(data) {
                let commentsForThisPost = data.data;
                console.log(commentsForThisPost);

                let key = postID;
                let obj = {};
                obj[key] = commentsForThisPost;

                $scope.master.push(commentsForThisPost);
                console.log('là', $scope.master)
              });
            }
            console.log('ici',$scope.master)
          }

          // Methode pour ajouter un commentaire
          this.addComment = function(form, postID) {
            let commentaire = form.commentaire;
            if(commentaire.length > 0) {
              console.log(commentaire);
              zooService.addComment(postID, commentaire).then(function() {
                zooService.getAllPosts().then(function(data) {
                  $scope.posts = data.data;
                  // console.log($scope.posts);
                  _this.commentsFetch(data.data);
                });
              });
            }
          };

          // Méthode d'ajout de post
        this.addPost = function(form) {
          var titre = form.titre;
          var texte = form.texte;
          if(titre.length > 0 && texte.length > 0) {
            var post = {
              titre: titre,
              texte: texte
            }
            appService.addPost(post).then(function(data) {
              appService.getAllPosts().then(function(data) {
                $scope.posts = data.data;
                // console.log($scope.posts);
                _this.commentsFetch(data.data);
              });
            });
          }
        }
    });

  app.directive('header',function(){
    return{
      restrict : 'A',
      templateUrl :'partials/common/header.html',
      link: function($scope, $element) {
        $(".button-collapse").sideNav();
      }
    }
  });
  app.directive('main',function(){
    return{
      restrict: 'A',
      templateUrl: 'partials/home/home.html'
    }
  });
  app.directive('footer',function(){
    return{
      restrict:'A',
      templateUrl: 'partials/common/footer.html'
    }
  });

  app.config(['$routeProvider',function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl:'partials/home/home.html'
      })
      .when('/page2',{
        templateUrl:'partials/page2.html',
        controller: 'zooCtrl',
        controllerAs: 'storeZoo'
      })
      .when('/page3/:zooId',{
        templateUrl:'partials/page3.html',
        controller:'zooProfileCtrl',
        controllerAs:'profile'
      })
      .when('/page4',{
        templateUrl:'partials/page4.html',
        controller:'formCtrl',
        controllerAs:'formulaire'
      })
  }]);

  app.factory('zooService', function($http) {
    return {
      getAllPosts: getAllPosts,
      getOnePost: getOnePost,
      postAddOne: postAddOne,
      addPost: addPost,
      addComment: addComment

    };

    function getAllPosts() {
      return $http.get('/api/zoo').then(complete).catch(failed);
    }
    function getOnePost(zooid) {
      return $http.get('/api/zoo/'+zooid).then(complete).catch(failed);
    }
    function postAddOne(zoo) {
      return $http.post('/api/zoo', zoo).then(complete).catch(failed);
    }
    function complete(response) {
      return response;
    }
    function addPost(post) {
      return $http.post('/api/message/', {
            post: post
          }).then(complete).catch(failed);
        }
    function addComment(postID, commentaire) {
      return $http.post('/api/message', {
                postID: postID,
                comment: commentaire
              }).then(complete).catch(failed);
            }

    function failed(error) {
      console.log(error.statusText);
    }

  });

})();
