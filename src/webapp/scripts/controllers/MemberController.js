/**
 * Created by jsvhqr on 2016-02-27.
 */


angular.module('AllianceFanshits').controller('MemberController', ['$routeParams','DotaApiService','$uibModal','$scope',function($routeParams, DotaApiService,$uibModal,$scope){

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

    $scope.animationsEnabled = true;
    $scope.modalInstance;
    $scope.member;
    $scope.id;
    self.getmatchDetails = function (id) {

        $scope.id = id;
        $scope.member = self.currentMember;
        $scope.modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            templateUrl: '../views/modalMatchDetails.html',
            scope: $scope,
            size: 'lg'
        });

        $scope.modalInstance.result.then(
            function () {
                        },
            function () {
                        }
        );

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

        $scope.ok = function () {
            $scope.modalInstance.close();
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };
    };





}]);