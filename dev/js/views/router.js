;define(['app'], function (app) {
        // 使用严格模式
        'use strict';

        app.config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/Page1");
            $stateProvider
                .state("main", {
                    abstract: true,
                    views: {
                        // 头部
                        'header': {
                            templateUrl: "modules/header.html"
                        },
                        // 菜单
                        'menu': {
                            templateUrl: "modules/menu.html"
                        },
                        //主体
                        'content': {
                            // template: "<div class='v-box' ui-view='master'></div>",
                            templateUrl: "modules/content.html",
                            controller: 'ctr_content',
                            // 使用预载入功能，开发者可以预先载入一系列依赖或者数据，然后注入到控制器中
                            resolve: {
                                loadCtr: ['$q', function ($q) {
                                    var deferred = $q.defer();
                                    require(['./views/content'], function (page) {
                                        page();
                                        deferred.resolve();
                                    });
                                    return deferred.promise;
                                }]
                            }
                        }
                    }
                })
                .state("main.Page1", {
                    url: "/Page1",
                    views: {
                        // ’master@main’表示名为master的view属于main模板
                        'master@main': {
                            templateUrl: "modules/Page1.html",
                            controller: 'ctr_page1',
                            // 使用预载入功能，开发者可以预先载入一系列依赖或者数据，然后注入到控制器中
                            resolve: {
                                loadCtr: ['$q', function ($q) {
                                    var deferred = $q.defer();
                                    require(['./controller/page1'], function (page) {
                                        page();
                                        deferred.resolve();
                                    });
                                    return deferred.promise;
                                }]
                            }
                        }
                    }
                })
                .state("main.Page2", {
                    url: "/Page2",
                    views: {
                        'master@main': {
                            templateUrl: "modules/Page2.html",
                            controller: 'ctr_page2',
                            // 使用预载入功能，开发者可以预先载入一系列依赖或者数据，然后注入到控制器中
                            resolve: {
                                loadCtr: ['$q', function ($q) {
                                    var deferred = $q.defer();
                                    require(['./controller/page2'], function (page) {
                                        page();
                                        deferred.resolve();
                                    });
                                    return deferred.promise;
                                }]
                            }
                        }
                    }
                })
                .state("main.Page3", {
                    url: "/Page3",
                    views: {
                        'master@main': {
                            templateUrl: "modules/Page3.html"
                        }
                    }
                })
            // .state("main.Page2", {
            //     url:"/Page2",
            //     templateUrl: "modules/Page2.html"
            // })
        });

    }
);