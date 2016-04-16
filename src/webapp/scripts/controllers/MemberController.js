/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('MemberController', ['$routeParams','DotaApiService',function($routeParams, DotaApiService){

    var self = this;
    self.currentMember = $routeParams.teamMember;
    self.matchHistory = DotaApiService.query({
        member: self.currentMember
    });
    self.channel;

    if(self.currentMember === 'Akke'){
        self.channel = 'followAkke';
    }else if(self.currentMember === 'Loda'){
        self.channel = 'LiveAndLetLoda';
    }else if(self.currentMember === 'EGM'){
        self.channel = 'egm';
    }else if(self.currentMember === 'Bulldog'){
        self.channel = 'admiralBulldog';
    }else if(self.currentMember === 's4'){
        self.channel = 's4';
    }

    self.pageSize = 7;
    self.currentPage =1;

    self.numberOfPages=function(){
        return Math.ceil(self.matchHistory.length/self.pageSize);
    }

}]);