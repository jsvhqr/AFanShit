/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */                                 


var app = angular.module('AllianceFanshits', ['ngRoute', 'ngtweet','ngResource']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as homeController'
      }).
      when('/:teamMember', {
        templateUrl: 'views/TeamMemberView.html',
        controller : 'HomeController as homeController'
      }).     
      otherwise({
        redirectTo: 'views/home.html'
      });
  }]);
