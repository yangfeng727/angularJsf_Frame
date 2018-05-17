// 主入口
(function () {
// AngularJS 目前的版本没有遵循 Javascript 约定的 AMD 模块化规范， 因此使用 RequireJS 加载 AngularJS 时需要一些额外的配置
    require.config({
        baseUrl:'js/',
        paths: {
            angular:'lib/angular/angular.min',
            angular_router:'lib/angular/angular-ui-router.min',
            echarts:'lib/echarts/echarts.min',
            jquery:'lib/jquery/jquery-1.8.3.min',
            app: 'views/app',
            service:'common/service',
            xhrConfig:'common/xhrUrlConfig'
        },
        shim: {
            // 需要导出一个名称为 angular 的全局变量， 否则无法使用
            'angular' : { exports: 'angular' },
            'angular_router':{
                deps:['angular']
            },
            'echarts':{ exports: 'echarts' },
            'jquery':{ exports: '$' }
        },
        urlArgs: "bust=" +  (new Date()).getTime()
    });
    require([
        'views/router',
        'common/global',
        'common/layout',
        'jquery'
    ],function (router,global,layout,$) {
        // 启动angulars
        angular.bootstrap(document.body, ['myApp']);

        // 页面echarts resize
        var timer;
        $(window).resize(function () {

            if(timer){
                clearTimeout(timer);
                timer=null;
            }
            timer=setTimeout(function () {
                layout.resizeCharts();
            },500)
        });

    });
})();
