angular.module('submission.result', [])

    .directive('submissionResult', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'submission/result/submissionResult.html',
            controller: 'SubmissionResultCtrl',
            controllerAs: 'submissionResultCtrl'
        };
    })

    .controller('SubmissionResultCtrl', function ($scope, Submissions) {
        console.log(Submissions);
        $scope.Submissions = Submissions;
    });