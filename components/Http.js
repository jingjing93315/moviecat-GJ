/*
 * @Author: sk
 * @Date:   2016-02-18 23:00:22
 * @Last Modified by:   sk
 * @Last Modified time: 2016-02-18 23:55:07
 */

(function(angular) {
    'use strict';
    //由于默认angular提供的异步请求对象不支持自定义回调函数名称，
    //angular随机分配的回调名称不被豆瓣支持，所以需要自己去写一个
    var http = angular.module('moviecat.services.http', []);
    http.service('HttpService', ['$window', '$document', function($window, $document) {
        this.jsonp = function(url, data, callback) {
            var fnSuffix = Math.random().toString().replace('.', '');
            var cbFuncName = 'my_json_cb_' + fnSuffix;
            $window[cbFuncName] = callback;
            var queryString = url.indexOf('? ') == -1 ? '?' : '&';
            for (var key in data) {
                queryString += key + '=' + data[key] + '&';
            }
            queryString += 'callback=' + cbFuncName;
            var scriptElement = $document[0].createElement('script');
            scriptElement.src = url + queryString;
            $document[0].body.appendChild(scriptElement);
        };

    }]);
})(angular);
