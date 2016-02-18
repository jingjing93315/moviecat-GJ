(function(angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module('moviecat.in_theaters', ['ngRoute']);
    //模块路由配置
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/in_theaters', {
            templateUrl: 'in_theaters/view.html',
            controller: 'InTheatersController'
        });
    }])

    module.controller('InTheatersController', [
        '$scope',
        //控制器执行函数
        function($scope) {

        }
    ]);

})(angular)
