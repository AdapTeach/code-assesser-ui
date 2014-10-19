angular.module('assessment', ['ui.router'])

    .config(function ($stateProvider) {
        $stateProvider.state('assessment', {
            url: '/assessment/:id',
            templateUrl: 'assessment/assessment.tpl.html',
            controller: 'AssessmentCtrl as assessmentCtrl',
            resolve: {
                assessment: function (Assessments, $stateParams) {
                    return Assessments.load($stateParams.id);
                }
            }
        });
    })

    .factory('Assessments', function ($q, $http, BACKEND_URL) {
        var Assessments = {};

        Assessments.current = {};
        Assessments.result = {};

        Assessments.load = function (assessmentId) {
            var deferred = $q.defer();
            $http.get(BACKEND_URL + assessmentId).success(function (data) {
                Assessments.current = data;
                deferred.resolve();
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        Assessments.submit = function (code) {
            var body = {
                code: code
            };
            var deferred = $q.defer();
            $http.post(BACKEND_URL + Assessments.current.id, body).success(function (data) {
                Assessments.result = data.result;
                deferred.resolve();
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        return Assessments;
    })

    .controller('AssessmentCtrl', function ($stateParams, $mdDialog, Assessments) {
        var self = this;
        this.Assessments = Assessments;
        this.submission = {
            code: angular.copy(Assessments.current.startCode)
        };
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
        this.submitCode = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                controller: 'ResultDialogCtrl',
                templateUrl: 'assessment/dialog-result.tpl.html',
                clickOutsideToClose: false,
                escapeToClose: false,
                locals: {
                    codeToSubmit: self.submission.code
                }
            }).then(function () {
                console.log('success');
            }).catch(function (err) {
                console.log('error');
            });
        };
    })

    .controller('ResultDialogCtrl', function (Assessments, codeToSubmit, $mdDialog, $scope) {
        Assessments.submit(codeToSubmit).then(function () {
            $scope.success = Assessments.result.pass;
        }).catch(function (err) {
            console.log(err);
        }).finally(function () {
            $scope.finished = true;
        });

        $scope.close = function () {
            $mdDialog.hide();
        };
    });