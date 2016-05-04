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

    self.getStartTime = function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + self.n(hour) + ':' + self.n(min) + ':' + self.n(sec) ;
            return time;
        }

    self.n = function(n){
        return n > 9 ? "" + n: "0" + n;
    }

}]);
