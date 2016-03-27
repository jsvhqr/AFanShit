/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('AllianceFanshits').controller('HomeController',['$routeParams',function($routeParams){

        var self = this;
        self.upcommingGames = 0;
        self.currentMember = $routeParams.teamMember;

}]);