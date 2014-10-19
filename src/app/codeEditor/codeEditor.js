angular.module('codeEditor', [])

    .directive('codeEditor', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'codeEditor/codeEditor.html',
            controller: 'CodeEditorCtrl',
            controllerAs: 'codeEditorCtrl'
        };
    })

    .controller('CodeEditorCtrl', function (Submissions) {
        this.Submissions = Submissions;
        this.aceConfig = {
            mode: 'java',
            theme: 'eclipse',
            require: ['ace/ext/language_tools'],
            advanced: {
                enableSnippets: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            }
        };
    })
;