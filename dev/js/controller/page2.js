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

        var variable='';// 我是变量
        var idD='page2Echarts';
        $('#'+idD).html('');
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(idD));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {
                trigger:'axis',// 注意整个得设置为axis
                formatter:function (param) {
                    variable=param[0].name;
                }
            },
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
                data: [0, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option);
        $('#'+idD).off('click').on('click',function () {
            console.log(variable)
        });
        // myChart.on('click',function(param){
        //     console.log(param.name)
        // });

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