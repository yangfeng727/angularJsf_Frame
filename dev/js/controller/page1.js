;define(['app','service'], function (app,service) {
        // 使用严格模式
        'use strict';

      return function(){
          app.register.controller('ctr_page1', function ($scope,testService) {
            $scope.message=window.GLOBAL.message;

            $scope.service=testService.greeting;

          });
      }
    });