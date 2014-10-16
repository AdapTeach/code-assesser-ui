angular.module('assessment', [])

    .directive('assessment', function () {
        return {
            restrict: 'E',
            templateUrl: 'assessment/assessment.html',
            controller: function($scope) {
                $scope.aceConfig = {
                    mode: 'java',
                    theme: 'eclipse'
                };
            }
        };
    });