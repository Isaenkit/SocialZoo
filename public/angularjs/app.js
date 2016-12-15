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

})();
