;define(['app','service','xhrConfig'],
    function (app,service,xhrConfig) {
        // 使用严格模式
        'use strict';

        /** 跨域问题处理
         * */
        var crossDomainFn=function ($scope,$http) {
            $http.get(xhrConfig.action.test.test1)
                    .then(function (resultSuccess) {
                      console.log(resultSuccess,11)
                    },function (resultError) { },function () { })
        }

      return function(){
          app.register.controller('ctr_page1', function ($scope,$http,testService) {
            $scope.message=window.GLOBAL.message;

            $scope.service=testService.greeting;

            crossDomainFn($scope,$http)
          });
      }
    });