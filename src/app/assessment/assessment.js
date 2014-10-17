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
    .controller('AssessmentCtrl',function($atExercise,$stateParams){
        this.assessment = $atExercise.assessment;
        this.exercise = {
            code : angular.copy(this.assessment.startCode)
        };
        console.log(this.exercise)
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
    });