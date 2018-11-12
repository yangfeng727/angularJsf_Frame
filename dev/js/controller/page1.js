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

        /** promise使用
         * */
        var promiseLearn=function ($q) {
            var deferred = $q.defer();
            setTimeout(function () {
                alert(11)
                deferred.resolve('hello');
            },4000)
            return deferred.promise;
        }

      return function(){
          app.register.controller('ctr_page1', function ($scope,$q,$http,testService) {
            $scope.message=window.GLOBAL.message;

            $scope.service=testService.greeting;

            crossDomainFn($scope,$http);

            // promise 调用
            promiseLearn($q).then(function (value) {
                console.log('promise',value)
            })

          });
      }
    });