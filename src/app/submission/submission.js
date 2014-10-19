angular.module('submission', [])

    .factory('Submissions', function ($http, BACKEND_URL, Assessments, submissionProgressDialog) {
        var Submissions = {
            current: {
                assessment: {},
                code: '',
                result: {}
            }
        };

        Submissions.submitCurrent = function () {
            return Submissions.submit(Assessments.current, Submissions.current.code);
        };

        Submissions.submit = function (assessment, submittedCode) {
            submissionProgressDialog.show();
            Submissions.current = {
                assessment: assessment,
                code: submittedCode,
                result: {}
            };
            var body = {
                code: submittedCode
            };
            return $http.post(BACKEND_URL + assessment.id, body)
                .success(function (data) {
                    Submissions.current.result = data.result;
                })
                .error(function (error) {
                    Submissions.current.result = error;
                })
                .finally(function () {
                    submissionProgressDialog.hide();
                });
        };

        return Submissions;
    })

    .factory('submissionProgressDialog', function ($mdDialog) {
        var dialog = {};

        dialog.show = function () {
            $mdDialog.hide();
            $mdDialog.show({
                controller: 'SubmissionProgressDialogCtrl',
                templateUrl: 'submission/submissionProgressDialog.html',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        };

        dialog.hide = $mdDialog.hide;

        return dialog;
    })

    .controller('SubmissionProgressDialogCtrl', function () {
    })

    .directive('submissionResult', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'submission/submissionResult.html',
            controller: 'SubmissionResultCtrl',
            controllerAs: 'submissionResultCtrl'
        };
    })

    .controller('SubmissionResultCtrl', function (Submissions) {
        this.Submissions = Submissions;
    });