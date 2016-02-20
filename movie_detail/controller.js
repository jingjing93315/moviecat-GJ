(function(angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module(
        'moviecat.movie_detail', ['ngRoute', 'moviecat.services.http']);
    //模块路由配置
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail/view.html',
            controller: 'MovieDetailController'
        });
    }])

    module.controller('MovieDetailController', [
        '$scope',
        '$routeParams',
        'HttpService',
        function($scope, $routeParams, HttpService) {
            $scope.movie = {};
            $scope.loading = true;
            var id = $routeParams.id;

            var apiAddress = 'http://api.douban.com/v2/movie/subject/' + id;
            //跨域方式
            HttpService.jsonp(apiAddress, {}, function(data) {
                $scope.movie = data;
                $scope.loading = false;
                $scope.$apply();


                //这里的小问题。。。detail  在movie_list模块中也能被匹配
            })
        }
    ]);

})(angular);
