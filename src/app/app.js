angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'assessment',
    'backend',
    'codeEditor',
    'submission'
])

    .config(function ($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });