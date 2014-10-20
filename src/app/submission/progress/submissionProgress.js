angular.module('submission.progress', [])

    .factory('submissionProgressDialog', function ($mdDialog) {
        var dialog = {};

        dialog.show = function () {
            $mdDialog.hide();
            $mdDialog.show({
                controller: 'SubmissionProgressDialogCtrl',
                templateUrl: 'submission/progress/submissionProgressDialog.html',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        };

        dialog.hide = $mdDialog.hide;

        return dialog;
    })

    .controller('SubmissionProgressDialogCtrl', function () {
    });