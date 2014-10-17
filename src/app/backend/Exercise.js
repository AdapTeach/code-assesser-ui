angular.module('backend', [])

    .constant('BACKEND_URL', 'http://localhost:5010/')

    .factory('$atExercise', function (BACKEND_URL, $http, $q) {

        var service = {};

        service.init = function(assessmentId){
            var deferred = $q.defer();
            $http.get(BACKEND_URL + assessmentId).success(function(data){
                service.assessment = data;
                deferred.resolve();
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.submit = function (assessmentId, submittedCode) {
            var body = {
                code: submittedCode
            };
            return $http.post(BACKEND_URL + assessmentId, body);
        };

        return service;

    });