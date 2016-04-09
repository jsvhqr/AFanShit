/**
 * Created by jsvhqr on 2016-02-23.
 */


angular.module('AllianceFanshits').factory("DotaApiService",['$resource',function($resource){

    return $resource("/matchHistory/:teamMember",{teamMember: "@teamMember"});

}]);