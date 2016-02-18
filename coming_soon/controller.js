(function(angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module('moviecat.coming_soon', ['ngRoute']);
    //模块路由配置
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/coming_soon', {
            templateUrl: 'coming_soon/view.html',
            controller: 'ComingSoonController'
        });
    }])

    module.controller('ComingSoonController', [
        '$scope',
        //控制器执行函数
        function($scope) {

        }
    ]);

})(angular)
