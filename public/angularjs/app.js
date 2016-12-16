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
      console.log($scope.profile)
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
      postAddOne: postAddOne

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
    function failed(error) {
      console.log(error.statusText);
    }

  });

})();
