angular.module('backend', [])

    .constant('BACKEND_URL', 'http://localhost:5000/')

    .factory('backend', function (BACKEND_URL, $http) {

        var service = {};

        service.submit = function (assessmentId, submittedCode) {
            var body = {
                code: submittedCode
            };
            return $http.post(BACKEND_URL + assessmentId, body);
        };

        return service;

    });