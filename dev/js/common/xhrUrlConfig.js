;define(function () {
   var _domain = location.protocol + '//' +location.host;

   return {
       action:{
           test:{
               test1:_domain+'/s8460049/article/GetRelatedArticles?pageindex=2&articleId=51995857' // 跨域测试的接口
           }
       }
   }
});