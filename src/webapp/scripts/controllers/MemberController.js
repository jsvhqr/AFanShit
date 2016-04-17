/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('MemberController', ['$routeParams','DotaApiService','$uibModal',function($routeParams, DotaApiService,$uibModal){

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

    self.pageSize = 8;
    self.currentPage = 0;

    self.numberOfPages=function(){
        return Math.ceil(self.matchHistory.length/self.pageSize);
    };
    self.currentMatchID;
    self.animationsEnabled = true;
    self.getmatchDetails = function (id) {

        self.currentMatchID = id;
        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            templateUrl: '../views/modalMatchDetails.html',
            controller: 'MemberController as memberController',
            size: 'lg'
        });

        modalInstance.result.then(function () {
        }, function () {
        });

        self.toggleAnimation = function () {
            self.animationsEnabled = !self.animationsEnabled;
        };
    };

    self.id = self.currentMatchID;

    self.ok = function () {
        $uibModalInstance.close();
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


}]);