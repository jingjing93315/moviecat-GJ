(function(angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module('moviecat.top250', ['ngRoute']);
    //模块路由配置
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/top250', {
            templateUrl: 'top250/view.html',
            controller: 'Top250Controller'
        });
    }])

    module.controller('Top250Controller', [
        '$scope',
        //控制器执行函数
        function($scope) {

        }
    ]);

})(angular)
