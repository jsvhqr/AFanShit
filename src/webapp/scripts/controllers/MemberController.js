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

    self.getStartTime = function (unix_timestamp) {


        var date = new Date(unix_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;

    }

}]);
