/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('HomeController',['$routeParams','DotaApiService',function($routeParams,DotaApiService){

    var self = this;

    self.getMatchHistory = function($routeParams){

        return DotaApiService.query($routeParams.teamMember);

    }


}]);