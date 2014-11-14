angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'assessment',
    'backend',
    'submission',
    'at.assessment'
])

    .config(function ($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });