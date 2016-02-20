/*
 * @Author: sk
 * @Date:   2016-02-18 23:00:22
 * @Last Modified by:   sk
 * @Last Modified time: 2016-02-20 23:48:56
 */

(function(angular) {
    'use strict';
    //由于默认angular提供的异步请求对象不支持自定义回调函数名称，
    //angular随机分配的回调名称不被豆瓣支持，所以需要自己去写一个
    var http = angular.module('moviecat.services.http', []);
    http.service('HttpService', ['$window', '$document', function($window, $document) {
        this.jsonp = function(url, data, callback) {

            var queryString = url.indexOf('? ') == -1 ? '?' : '&';
            for (var key in data) {
                queryString += key + '=' + data[key] + '&';
            }
            //挂靠全局函数名操作
            var fnSuffix = Math.random().toString().replace('.', '');
            var cbFuncName = 'my_json_cb_' + fnSuffix;
            $window[cbFuncName] = function(data) {
                callback(data);
                $document[0].body.removeChild(scriptElement);
            }
            queryString += 'callback=' + cbFuncName;
            var scriptElement = $document[0].createElement('script');
            scriptElement.src = url + queryString;
            $document[0].body.appendChild(scriptElement);

            //01.根据异步请求的地址拼接一个callback参数
            //02.将这个地址当做一个script文件请求
            //callback(data);
            //调用完之后把自己干掉
        };

    }]);
})(angular);
