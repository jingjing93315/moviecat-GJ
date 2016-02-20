/*
 * @Author: sk
 * @Date:   2016-02-20 21:51:04
 * @Last Modified by:   sk
 * @Last Modified time: 2016-02-20 22:26:06
 */

(function(angular) {
    angular.module('moviecat.directive.auto-focus', [])
        .directive('autoFocus', ['$location', function($location) {
            //Runs during compile
            var path = $location.path();
            return {
                restrict: 'A', //A=Attribute
                link: function($scope, iElm, iAttrs, controller) {
                    //iElm表示指令要用在哪个元素身上,iAttrs是作用元素身上的所有
                    //属性
                    //link时，就是和dom元素建立关系的时候
                    var aLink = iElm.children().attr('href');
                    var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
                    if (path.startsWith(type)) {
                        //访问的是当前链接
                        iElm.addClass('active');
                    }
                    iElm.on('click', function() {
                        iElm.parent().children().removeClass('active');
                        iElm.addClass('active');
                        //开发小技巧--看一下某个对象上有哪些成员
                        //window.iele = iElm;

                    })
                }
            }


        }])
})(angular);
