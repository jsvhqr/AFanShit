/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('MemberController', ['$routeParams','DotaApiService','$scope',function($routeParams, DotaApiService,$scope){

    var self = this;
    self.currentMember = $routeParams.teamMember;
    self.matchHistory;
    self.matchDetails;
    self.detailsAvailable = false;
    DotaApiService.matchHistory({
        member: self.currentMember
    }).$promise.then(function(result){
        self.matchHistory = result;
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

    self.pageSize = 8;
    self.currentPage = 0;
    self.numberOfPages=function(){
        return Math.ceil(self.matchHistory.length/self.pageSize);
    };
    
    self.getmatchDetails = function (id) {
        self.matchDetails = DotaApiService.matchDetails({id : id}).$promise.then(function(result){
            self.matchDetails = result;
            self.detailsAvailable = true;
        })
    }

}]);
