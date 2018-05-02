;define(['angular', 'angular_router'], function (angular) {
        // 使用严格模式
        'use strict';
        var app = angular.module("myApp", ["ui.router"]);
        app.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
        });
        //   app.config(function ($locationProvider) {
        //     $locationProvider.html5Mode({
        //         enabled: true,4444444444444
        //         rewriteLinks: false
        //     }).hashPrefix('!');
        // });

        // app.controller('myCtrl', function ($scope) {
        //     $scope.greeting = "Hello World!";
        // });

        // angular 在刚开始的$digest时，$rootScope会触发$locationChangeSuccess事件（angular在每次浏览器hash change的时候也会触发$locationChangeSuccess事件）
        return app;

    }
);
