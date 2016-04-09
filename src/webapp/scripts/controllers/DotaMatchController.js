/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('DotaMatchController',[,'DotaApiService',function($routeParams,DotaApiService){

    var self = this;

    self.getMatchHistory = function(teamMember){

        return DotaApiService.query(teamMember);

    }


}]);