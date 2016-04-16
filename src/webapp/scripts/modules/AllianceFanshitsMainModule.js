/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */                                 


var app = angular.module('AllianceFanshits', ['ngRoute', 'ngtweet','ngResource', 'ui.bootstrap']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as homeController'
      }).
      when('/:teamMember', {
        templateUrl: 'views/teamMemberView.html',
        controller : 'MemberController as memberController'
      }).     
      otherwise({
        redirectTo: 'views/home.html'
      });
  }]);

app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});