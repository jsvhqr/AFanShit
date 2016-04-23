/**
 * Created by jsvhqr on 2016-02-23.
 */


angular.module('AllianceFanshits').factory("DotaApiService",['$resource',function($resource){


    return $resource("/api/match/", {id: "@id", member: "@member"}, {
        matchHistory : {
            url : '/api/match/History/:member',
            isArray: 'true',
            method: 'GET'
        },
        matchDetails : {
            url: '/ap/match/Details/:id',
            method: 'GET'
        }
    })

}]);