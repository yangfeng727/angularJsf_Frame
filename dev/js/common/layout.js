;define(['echarts','jquery'],function (echarts,$) {
    // 使用严格模式
    'use strict';

    return {

        /**
         * 页面echarts resie
         * */
        resizeCharts:function () {
            var $echartsDoms=$('.v-box [_echarts_instance_]'),
                einstance=null;

            for(var i=0,len=$echartsDoms.length;i<len;i++){
                einstance=echarts.getInstanceByDom($echartsDoms[i]);
                if(einstance && einstance.resize){
                    einstance.resize();
                }
            }
        }


    };
});