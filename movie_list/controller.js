(function(angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http']);
    //模块路由配置
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:category/:page', {
            templateUrl: 'movie_list/view.html',
            controller: 'MovieListController'
        });
    }])

    module.controller('MovieListController', [
        '$scope',
        '$route',
        '$routeParams',
        'HttpService',
        //控制器执行函数
        //控制器分为两步
        //1.设计暴露的数据
        //2.设计暴露的行为
        function($scope, $route, $routeParams, HttpService) {
            //绑定假数据
            var count = 10; //每一页的条数
            var page = parseInt($routeParams.page); //当前第几页
            var start = (page - 1) * count; //当前页从哪开始
            $scope.loading = true;
            //需要提前声明一下，否则请求还没有完成时，数据绑定已经完成，此时subjects是undefined
            $scope.subjects = [];
            $scope.message = '';
            $scope.title = 'Loading...';
            $scope.totalCount = 0;
            $scope.totalPages = 0;
            $scope.currentPage = page;

            HttpService.jsonp('http://api.douban.com/v2/movie/' + $routeParams.category, {
                //$routeParams的数据来源: 1.路由匹配出来的
                //2.  ? 参数
                start: start,
                count: count,
                q: $routeParams.q //没有必要处理什么时候加这个参数和不加这个参数
            }, function(data) {
                $scope.title = data.title;
                $scope.subjects = data.subjects;
                $scope.totalCount = data.total;
                $scope.loading = false;
                $scope.totalPages = Math.ceil($scope.totalCount / count);
                $scope.$apply();

                //$apply的作用是让指定的表达式重新同步
                //apply之后，数据模型上的东西都可以更新一遍
            });
            //暴露一个行为--更改上下分页按钮
            $scope.go = function(page) {
                //传过来的是第几页，我就跳到第几页
                //更新当期路由url地址中的参数
                //一定做一个合法范围校验
                if (page >= 1 && page <= $scope.totalPages)
                    $route.updateParams({ page: page });
            }



        }
    ]);

})(angular)


//thinking：每页显示多少条   start=(page(页码)-1)*count
//1.在路由的配置中加上分页参数
//2.在控制器中提取page参数

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
