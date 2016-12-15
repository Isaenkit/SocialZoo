(function(){

  var app = angular.module('socialZoo',['ngRoute']);

  app.directive('header',function(){
    return{
      restrict : 'A',
      templateUrl :'partials/common/header.html'
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
        templateUrl:'partials/common/home.html'
      })
      .when('/page2',{
        templateUrl:'partials/page2.html'
      })
      .when('/page3',{
        templateUrl:'partials/page3.html'
      })
      .when('/page4',{
        templateUrl:'partials/page4.html'
      })
  }]);

})();
