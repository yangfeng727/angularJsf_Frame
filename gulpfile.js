//定义依赖和插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),// 按顺序逐个同步地运行 Gulp
    uglify = require('gulp-uglify'),//压缩js插件
    minifyCss= require('gulp-minify-css'),//压缩css插件
    htmlmin = require('gulp-htmlmin'),//压缩html插件
    less = require("gulp-less"),//less
    plumber = require("gulp-plumber"),//less报错继续处理不中断
    webserver = require('gulp-webserver'),//livereload
    notify=require('gulp-notify'),   //提示
    del=require('del');// 删除

var jsSrc = './dev/js/**/*.js';
var cssSrc = './dev/**/*.css';
var htmlSrc = './dev/**/*.html';
var resDist = './dist';
var jsDist= resDist+'/js';
var lessSrc='./dev/css/less/*.less';

var jsLib='./dev/js/lib/**/*.js';
var jsLibDist=resDist+'/js/lib';

// 清空文件夹
gulp.task('clean:dist', function (cb) {
   return del([
        'dist/**/*'
    ], cb);
});

//定义名为css的任务
gulp.task('css', function () {
    return gulp.src(cssSrc)
        .pipe(minifyCss())
        .pipe(gulp.dest(resDist))
        // .pipe(notify({message:'css task ok'}));
    // .pipe(connect.reload())

});

//定义名为js的任务
gulp.task('js', function () {
    return gulp.src(jsSrc)
        .pipe(uglify({
            ie8:true,// 默认不支持
            mangle:false
        }))
        .pipe(gulp.dest(jsDist))
});

// //copy js中的依赖包lib/** 的文件
// gulp.task('jsCopy', function () {
//     return  gulp.src(jsLib)
//         .pipe(gulp.dest(jsLibDist))
// });

//定义html任务
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
   var stream = gulp.src(htmlSrc)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(resDist));

    return stream;
});


//定义打包任务
gulp.task('build', function (callback) {

    runSequence('clean:dist',
        ['css', 'js', 'html'],
        callback);

  // gulp.pipe(notify({message:'build task ok'}));
});

// 定义livereload任务
gulp.task('webServer', function() {
    gulp.src('dev')
        .pipe(webserver({
            port:8091,
            // enable:true,
            livereload: true,
            directoryListing: false,// 显示目录
            open: true,// 默认打开网页
            fallback: 'default.html'
        }));
});

// 定义开发时的less任务
gulp.task('less', function() {
    gulp.src(lessSrc)
        .pipe( plumber() )
        .pipe(less())
        .pipe(gulp.dest('./dev/css/'));
});

//定义开发看守任务
gulp.task('watchLess', function () {

    gulp.watch(lessSrc, ['less']);

});

//定义默认任务
gulp.task('default', [ 'clean:dist']);