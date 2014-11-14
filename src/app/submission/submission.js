angular.module('submission', [
    'submission.result',
    'submission.progress'
])
    .factory('Submissions', function ($http, BACKEND_URL, Assessments, submissionProgressDialog) {
        var Submissions = {};

        Submissions.submit = function (submission) {
            submissionProgressDialog.show();
            Submissions.current = angular.copy(submission);
            Submissions.current.result = {};
            return $http.post(BACKEND_URL + submission.assessment.id, submission)
                .success(function (data) {
                    Submissions.current.result = data;
                })
                .error(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    submissionProgressDialog.hide();
                });
        };

        Submissions.hasResult = function () {
            return Submissions.current !== undefined &&
                Submissions.current.assessment === Assessments.current &&
                Submissions.current.result !== undefined &&
                Submissions.current.result.pass !== undefined;
        };

        return Submissions;
    });