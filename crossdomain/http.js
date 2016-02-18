/*
自己手写一个跨域的组件
* @Author: sk
* @Date:   2016-02-18 23:14:42
* @Last Modified by:   sk
* @Last Modified time: 2016-02-18 23:49:43
*/

(function(window, document, undefined) {
    'use strict';
    var jsonp = function(url, data, callback) {

        //1.挂载回调函数
        var fnSuffix = Math.random().toString().replace('.', '');
        var cbFuncName = 'my_json_cb_' + fnSuffix;
        //不推荐
        window[cbFuncName] = callback; //变成window的东西，可以全局使用
        //2.将data转换成url字符串形式
        //{id:1,name:'zhangsan'}=>id=1&name=zhangsan
        var queryString = url.indexOf('? ') == -1 ? '?' : '&';
        for (var key in data) {
            queryString += key + '=' + data[key] + '&';
        }

        //url+=callback=随机函数名
        //3.处理url地址中的回调参数

        queryString += 'callback=' + cbFuncName;
        //4.创建一个script标签
        var scriptElement = document.createElement('script');
        scriptElement.src = url + queryString;
        //--注意此时还不能append到页面上

        //5.将script标签放到页面中
        document.body.appendChild(scriptElement);
        //append过后，页面会自动对这个地址发送一个请求,请求完成以后自动
        //执行

    };
    window.$jsonp = jsonp; //放到全局中
})(window, document);
