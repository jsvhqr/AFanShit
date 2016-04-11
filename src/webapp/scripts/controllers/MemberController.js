/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('MemberController', ['$routeParams','DotaApiService',function($routeParams, DotaApiService){

    var self = this;
    self.currentMember = $routeParams.teamMember;
    self.matchHistory = DotaApiService.query({
        member: self.currentMember
    });


}]);