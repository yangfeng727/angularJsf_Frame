;define(function () {
   var _domain = location.protocol + '//' +location.host;
   var appName = 'sa-web';
   var commonUrl=_domain + '/' + appName + '/action/';

   return {
       action:{
           login:{
               test1:commonUrl+'XXXX'
           }
       }
   }
});