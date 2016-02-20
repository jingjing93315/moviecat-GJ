'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
    'ngRoute',
    'moviecat.directive.auto-focus',
    'moviecat.movie_detail',
    'moviecat.movie_list'
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
    }])
    .controller('SearchController', [
        '$scope',
        '$route',
        function($scope, $route) {
            $scope.input = ''; //取文本框的输入
            $scope.search = function() {
                $route.updateParams({ category: 'search', q: $scope.input });
            };
        }
    ]);
// .controller('NavController', [
//     '$scope',
//     '$location',
//     function($scope, $location) {
//         //变量本地化
//         $scope.$location = $location;
//         $scope.$watch('$location.path()', function(now) {
//             if (now.startsWith('/in_theaters')) {
//                 $scope.type = 'in_theaters';
//             } else if (now.startsWith('/coming_soon')) {
//                 $scope.type = 'coming_soon';
//             } else if (now.startsWith('/top250')) {
//                 $scope.type = 'top250';
//             }
//         })

//     }
// ]);
