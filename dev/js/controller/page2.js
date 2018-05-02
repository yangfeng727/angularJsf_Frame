;define([
    'app',
    'echarts',
    'service',
    'xhrConfig'
], function (app,echarts,service,xhrConfig) {
    // 使用严格模式
    'use strict';

    var page2Fn=function () {

        $('.page').css('background','blue');

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('page2Echarts'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };


        myChart.setOption(option);

        // echarts tooltip 轮播
        window.GLOBAL.toolTipLunBoAll(myChart);
    };

    return function(){
        app.register.controller('ctr_page2', function ($scope,$http,remService) {

            remService.loadREM().then(function () {
                page2Fn();

                // $http.post(xhrConfig.action.login.test1,{
                //     param:'SSSS'
                // })
                //     .then(function (resultSuccess) {  },function (resultError) {  },function () {
                //
                //     })
            });




        });
    }
});