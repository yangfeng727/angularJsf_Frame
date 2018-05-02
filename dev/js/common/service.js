;define(['app'],function (app) {
    // 使用严格模式
    'use strict';

    // 测试用service
    app.register.service('testService',function () {
      this.greeting='hello from service'
    });

    // IE9- By REM-Lib
    app.register.service('remService',function ($q) {
        /**
         * 兼容低版本REM
         * */
        this.loadREM=function () {
        var _defer=$q.defer(),
            ieVersion=(function () {
                var _ua = window.navigator.userAgent;
                if(/msie/i.test(_ua)){
                    return _ua.match(/msie (\d+\.\d+)/i)[1];
                }else if(~_ua.toLocaleLowerCase().indexOf('trident') && ~_ua.indexOf('rv')){
                    return _ua.match(/rv:(\d+\.\d+)/)[1];
                }else{
                    return false;
                }
            })();
        if(parseInt(ieVersion) < 9){
            // require(['libs/ie/rem.ie'],function () {
            //     _defer.resolve();
            //    // ie8-浏览器rem已经执行完毕，可以close loading
            //     window.Loading && window.Loading.delayClose && window.Loading.delayClose(500);
            // });
        }else{
            _defer.resolve();
        }
        return _defer.promise;
        }

    })

});