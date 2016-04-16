/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('MemberController', ['$routeParams','DotaApiService', '$uibModal',function($routeParams, DotaApiService, $uibModal){

    var self = this;
    self.currentMember = $routeParams.teamMember;
    self.animationsEnabled = true;
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

    self.pageSize = 8;
    self.currentPage = 0;

    self.numberOfPages=function(){
        return Math.ceil(self.matchHistory.length/self.pageSize);
    };
    self.matchDetails = function (id) {

        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            templateUrl: '../views/matchDetailsModal.html',
            controller: self,
            id: id
        });
    };

}]);