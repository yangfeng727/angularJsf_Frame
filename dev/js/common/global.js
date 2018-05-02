;define(function (echarts) {
    // 使用严格模式
    'use strict';
   var global={
       'message':'hello',

       /**
        *  tooltip 自动轮播效果 暂不支持雷达图
        *  myChart 当前的echarts对象
        * */
       toolTipLunBoAll:function (myChart) {
           var action={
                   type:'showTip',
                   seriesIndex:0,
                   dataIndex:0
               },
               _dom=$(myChart._dom), // echarts渲染的dom对象
               SelfInterval='',   // 定时器
               tuIndex=0,tuSeriers=[],tuKaiGuan=0,// 指明哪几个图的seriers需要轮播显示tooltip
               index=-1,index_DataLength=''; //根据图的index进行轮播

           var TuSeriersAll=myChart.getOption().series, //echarts大的所有series对象
               intervalTime=3000; // 轮播图的时间

           // 赋初值
           for(var i=0;i<TuSeriersAll.length;i++){
               if(!TuSeriersAll[i]['silent']){
                   tuSeriers.push(i);
                   index_DataLength=TuSeriersAll[i].data.length-1;
               }
           }

           if(tuSeriers.length==1){
               tuIndex=tuSeriers[0];
           }

           //调用echarts的dispatchAction方法显示tooltip
           var setAction=function (arg) {
               var i=0;
               for(var x in action){
                   action[x]=arg[i++];
               }

               myChart.dispatchAction(action);
           };

           /**
            * 生成当前伦次需要的 seriesIndex
            * */
           var indexReturn=function () {
               if(tuSeriers.length!=1){
                   tuKaiGuan==(tuSeriers.length-1) && (tuKaiGuan=-1);
                   tuIndex=tuSeriers[++tuKaiGuan];
               }
           };

           /**
            * 定时器具体实施的方法
            * */
           var interMethod=function () {
               if(index==index_DataLength){
                   index=-1;
                   indexReturn();
               }
               // setAction(['hideTip',tuIndex,++index]);
               setAction(['showTip',tuIndex,++index]);
           };

           SelfInterval=setInterval(interMethod,intervalTime);

           // 鼠标移入关闭定时器
           _dom.unbind('mouseover').on("mouseover",function () {
               clearInterval(SelfInterval);
           });

           // 鼠标移出开启定时器
           _dom.unbind('mouseout').on("mouseout",function () {
               SelfInterval=setInterval(interMethod,intervalTime);
           });
       },

       /**
        *  echarts 内存释放
        * */
       GC:{
           // 使用 window.GLOBAL.GC.eChartObject.push({chartId:'xxid',echartObj:'xxChart'})
           eChartObject:[],

           /**
            *  @type number 0 清除所有，1清除指定id组件
            *  @id array 当type为1时需要传递此参数
            *  使用 window.GLOBAL.GC.eChartDispose(0)   window.GLOBAL.GC.eChartDispose(1,['xxid'])
            * */
           eChartDispose:function (type,id) {

               if(type==0){
                   for(var i=0,len = this.eChartObject.length;i<len;i++){
                       this.eChartObject[i].echartObj.dispose();
                   }
                   this.eChartObject=[];
               }else if(type == 1){
                   var len = id.length;
                   if(len == 0 || len == undefined){
                       return false;
                   }

                   for(var k=0;k<this.eChartObject.length;k++){
                       var eObj=this.eChartObject[i];

                       if(id[k] == eObj.chartId){

                           try{
                               eObj.echartObj.dispose();
                           }catch(e){}

                           this.eChartObject.splice(i,1);
                           i--;

                       }

                   }
               }

           }
       },


   };
    return window.GLOBAL=global;
});