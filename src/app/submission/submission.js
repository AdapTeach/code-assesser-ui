angular.module('submission', [
    'submission.result',
    'submission.progress'
])
    .factory('Submissions', function ($http, BACKEND_URL, Assessments, submissionProgressDialog) {
        var base = {
                current: {
                    assessment: {},
                    code: '',
                    finished: false,
                    result: {}
                }
            },
            Submissions = angular.copy(base);

        Submissions.resetCurrent = function () {
            Submissions.current = base;
            Submissions.current.code = Assessments.current.startCode;
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
                    Submissions.current.result = data;
                })
                .error(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    submissionProgressDialog.hide();
                    Submissions.current.finished = true;
                });
        };

        Submissions.hasResult = function () {
            return Submissions.current.assessment === Assessments.current &&
                Submissions.current.finished &&
                Submissions.current.result !== undefined &&
                Submissions.current.result.pass !== undefined;
        };

        return Submissions;
    });