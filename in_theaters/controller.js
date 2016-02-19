(function(angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module('moviecat.in_theaters', ['ngRoute', 'moviecat.services.http']);
    //模块路由配置
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/in_theaters', {
            templateUrl: 'in_theaters/view.html',
            controller: 'InTheatersController'
        });
    }])

    module.controller('InTheatersController', [
        '$scope',
        'HttpService',
        //控制器执行函数
        //控制器分为两步
        //1.设计暴露的数据
        //2.设计暴露的行为
        function($scope, HttpService) {
            //绑定假数据
            $scope.loading = true;
            //需要提前声明一下，否则请求还没有完成时，数据绑定已经完成，此时subjects是undefined
            $scope.subjects = [];
            $scope.message = '';
            $scope.totalCount = 0;

            HttpService.jsonp('http://api.douban.com/v2/movie/in_theaters', {}, function(data) {
                $scope.subjects = data.subjects;
                $scope.totalCount = data.total;
                $scope.loading = false;
                $scope.$apply();

                //$apply的作用是让指定的表达式重新同步
                //apply之后，数据模型上的东西都可以更新一遍


            })



        }
    ]);

})(angular)





// var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
// $http.jsonp(doubanApiAddress + '?callback='
//         JSON_CALLBACK ').then(function(res) {
//         //此处代码是在异步请求完成之后才执行（需要一段时间）
//         if (res.status == 200) {
//             $scope.subjects = res.data.subjects;
//         } else {
//             $scope.message = "获取数据错误，错误信息" + res.statusText;
//         }
//     },
//     function(err) {
//         $scope.message = "获取数据错误，错误信息" + res.statusText;

//     })
