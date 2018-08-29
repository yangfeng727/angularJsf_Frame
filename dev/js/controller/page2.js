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
                data:['销量','zhengliang']
            },
            xAxis: {
                triggerEvent:true,
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [{
                    value:10,
                    name:'我是数据ddd',
                    id:'aaaaa'
                }, 20, 36, 10, 10, 20]
            },{
                name: 'zhengliang',
                type: 'bar',
                data: [{
                    value:20,
                    name:'我是数据bbb',
                    id:'bbb'
                }, 10, 36, 10, 10, 5]
            }]
        };
        myChart.setOption(option);


        // 柱状图和x轴的点击
        myChart.on('click',function(params){
            if(params.componentType == "xAxis"){
                console.log("单击了"+params.value+"x轴标签");
            }else{
                console.log("单击了"+params.name+"柱状图");
            }
        });

        //图例的点击
        myChart.on('legendselectchanged',function(param){
            console.log(param,222)
        });

        // $('#'+idD).off('click').on('click',function () {
        //     console.log(variable)
        // });

        // myChart.dispatchAction({
        //     type: 'legendselected',
        //     // // 选中的图例名称
        //     // name: string
        //     // // 所有图例的选中状态表
        //     selected: function (param) {
        //         console.log(param)
        //     }
        // })
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