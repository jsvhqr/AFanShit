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

        var unsortedArray = result;
        unsortedArray.sort(function(x,y){
            x.start_time - y.start_time;
        })

        self.matchHistory = unsortedArray;

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
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        }



}]);
