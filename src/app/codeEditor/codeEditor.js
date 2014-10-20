angular.module('codeEditor', [])

    .factory('AceConfig', function () {
        var AceConfig = {};

        AceConfig.java = {
            mode: 'java',
            theme: 'eclipse',
            require: ['ace/ext/language_tools'],
            advanced: {
                enableSnippets: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            }
        };

        return AceConfig;
    })

    .directive('codeEditor', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'codeEditor/codeEditor.html',
            controller: 'CodeEditorCtrl',
            controllerAs: 'codeEditorCtrl'
        };
    })

    .controller('CodeEditorCtrl', function ($scope, Submissions, AceConfig) {
        $scope.Submissions = Submissions;
        $scope.AceConfig = AceConfig;
    })
;