angular.module('submission', [
    'submission.result',
    'submission.progress'
])

    .factory('Submissions', function ($http, BACKEND_URL, Assessments, submissionProgressDialog) {
        var Submissions = {
            current: {
                assessment: {},
                code: '',
                finished: false,
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
                finished: false,
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
                    Submissions.current.result = error; // TODO Display error
                })
                .finally(function () {
                    submissionProgressDialog.hide();
                    Submissions.current.finished = true;
                });
        };

        Submissions.hasResult = function () {
            return Submissions.current.assessment === Assessments.current && Submissions.current.finished && Submissions.current.result.pass !== undefined;
        };

        return Submissions;
    });