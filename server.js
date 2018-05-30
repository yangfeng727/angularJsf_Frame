module.exports={

    /**
     * 跨域方式1
     * */
    start:function (port) {
        const express = require('express');
        const path = require('path');
        const request = require('request');
        // 配置静态文件服务中间件
        // server地址
        const app = express();
        var xhrMap={
            baiduTranslate:'https://blog.csdn.net'
        };
        var serverUrl=xhrMap.baiduTranslate;
        app.use(express.static(path.join(__dirname, 'dev')));

        app.use('/', function(req, res) {
            var url = serverUrl + req.url;
            req.pipe(request(url)).pipe(res);
        });
        app.listen(port, function () {
            console.log('server is running at http://localhost:'+port+'/default.html');
        });

    },

    /**
     * 跨域方式2
     * */
    start2:function (port) {
        var express = require('express');
        var proxy = require('http-proxy-middleware');
        var app = express();
        var path = require('path');
        var xhrMap={
            baiduTranslate:'https://blog.csdn.net'
        };
        var serverUrl=xhrMap.baiduTranslate;
        app.use(express.static(path.join(__dirname, 'dev')));
        app.use('/', proxy({ target: serverUrl, changeOrigin: true }));
        app.listen(port, function () {
            console.log('server is running at http://localhost:'+port+'/default.html');
        });

    }

};