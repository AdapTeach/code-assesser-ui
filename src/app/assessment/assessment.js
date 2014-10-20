angular.module('assessment', ['ui.router'])

    .config(function ($stateProvider) {
        $stateProvider.state('assessment', {
            url: '/assessment/:id',
            templateUrl: 'assessment/assessment.html',
            controller: 'AssessmentCtrl as assessmentCtrl',
            resolve: {
                assessment: function ($stateParams, Assessments, Submissions) {
                    return Assessments.load($stateParams.id).then(function () {
                        Submissions.current.code = angular.copy(Assessments.current.startCode);
                    });
                }
            }
        });
    })

    .factory('Assessments', function ($http, BACKEND_URL) {
        var Assessments = {};

        Assessments.current = {};

        Assessments.load = function (assessmentId) {
            return $http.get(BACKEND_URL + assessmentId).success(function (data) {
                Assessments.current = data;
            });
        };

        return Assessments;
    })

    .controller('AssessmentCtrl', function ($scope, Assessments, Submissions) {
        $scope.Assessments = Assessments;
        $scope.Submissions = Submissions;
    });