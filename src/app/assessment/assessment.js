angular.module('assessment', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider.state('asses',{
            url : '/exercise/:id',
            templateUrl : 'assessment/assessment.tpl.html',
            controller : 'AssessmentCtrl as app',
            resolve : {
                assessment : function($atExercise,$stateParams){
                    return $atExercise.init($stateParams.id);
                }
            }
        });
    })
    .controller('AssessmentCtrl',function($atExercise,$stateParams, $mdDialog){
        var self = this;
        console.log($atExercise.assessment);
        this.assessment = $atExercise.assessment;
        this.exercise = {
            id : $stateParams.id,
            code : angular.copy(this.assessment.startCode)
        };
        this.title = $stateParams.id;
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

        this.submitCode = function($event){
            $mdDialog.show({
                targetEvent: $event,
                controller: 'ResultDialogCtrl',
                templateUrl:'assessment/dialog-result.tpl.html',
                clickOutsideToClose : false,
                escapeToClose : false,
                locals : {
                    exercise : self.exercise
                }
            }).then(function(){
                console.log('success');
            }).catch(function(err){
                console.log('error');
            });
        };
    })
.controller('ResultDialogCtrl',function($atExercise, exercise, $mdDialog, $scope){
        $atExercise.submitCode(exercise).then(function(){
            $scope.success = $atExercise.result.pass;
        }).catch(function(err){
            console.log(err);
        }).finally(function(){
            $scope.finished = true;
        });

        $scope.close = function() {
            $mdDialog.hide();
        };
    });