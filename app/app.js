'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router', 
  'header',
  'draw',
  'draw.tree',
  'myApp.version'
])

.config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
   $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise("/");
  $stateProvider

  .state('inicio', {
    url: '/',
    templateUrl: 'view/add.html' 
  })

  .state('draw', {
    url: '/draw',   
    templateUrl: 'view/draw.html',
    controller: 'DrawController'
  });


 // $routeProvider.otherwise({redirectTo: '/'});
}]);
