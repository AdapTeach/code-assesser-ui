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

        service.submitCode = function (exercise) {
            var body = {
                code: exercise.code
            };
            var deferred = $q.defer();
            console.log(exercise);
            $http.post(BACKEND_URL + exercise.id, body).success(function(data){
                console.log(data);
                service.result = data.result;
                deferred.resolve();
            }).error(function(err){
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

        return service;

    });