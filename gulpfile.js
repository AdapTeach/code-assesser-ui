var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    del = require('del'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    copy = require('gulp-copy'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    annotate = require('gulp-ng-annotate'),
    path = require('path'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');

var livereloadport = 35729,
    serverport = 5000;


// DEV SERVER
var devServer = express();
devServer.use(livereload({port: livereloadport}));
devServer.use(express.static('./dev'));
devServer.all('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dev' });
});

// PATHS
var pathToIndexFile = 'src/index.html';
var pathToJsSource = 'src/app/**/*.js';
var pathToCssSource = 'src/app/**/*.scss';
var pathToTemplates = 'src/app/**/*.html';
var pathToLibs = ['src/vendor/**/*.js', 'src/vendor/**/*.css'];

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', function () {
        runSequence(
            'cleanDevFolder',
            [
                'buildDev',
                'startDevServer',
                'watchSource'
            ]);
    }
);

gulp.task('buildDev', [
    'copyLibs',
    'buildJs',
    'buildStyle',
    'copyIndex',
    'cacheTemplates'
], function () {
});

gulp.task('cleanDevFolder', function (cb) {
    del('dev', cb);
});

gulp.task('copyLibs', function () {
    gulp.src(pathToLibs)
        .pipe(copy('dev', {prefix: 1}));
});

gulp.task('buildJs', function () {
    gulp.src(pathToJsSource)
        .pipe(sourcemaps.init())
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});



gulp.task('buildStyle', function () {
    gulp.src(pathToCssSource)
        .pipe(sass())
        .pipe(gulp.dest('dev'));
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});

gulp.task('copyIndex', function () {
    gulp.src(pathToIndexFile)
        .pipe(copy('dev', {prefix: 1}))
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});

gulp.task('cacheTemplates', function () {
    gulp.src(pathToTemplates)
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});

gulp.task('startDevServer', function () {
    devServer.listen(serverport);
    lrserver.listen(livereloadport);
});

gulp.task('watchSource', function () {
    gulp.watch(pathToJsSource, ['buildJs', 'lint']);
    gulp.watch(pathToCssSource, ['buildStyle']);
    gulp.watch(pathToIndexFile, ['copyIndex']);
    gulp.watch(pathToTemplates, ['cacheTemplates']);
});

gulp.task('lint', function () {
    gulp.src(pathToJsSource)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////


gulp.task('build', function () {
        runSequence(
            'cleanProdFolder',
            'buildDev',
            'buildProd',
            'startProdServer'
        );
    }
);

gulp.task('cleanProdFolder', function (cb) {
    del('dist', cb);
});

gulp.task('buildProd', function () {
    gulp.src('dev/index.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [annotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('startProdServer', function () {
    var server = express();
    server.use(express.static('./dist'));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', { root: 'dist' });
    });
    server.listen(serverport);
});

gulp.task('deploy',function(){
    var conf = JSON.parse(require('fs').readFileSync('./s3.json'));
    console.log(conf)
    gulp.src('./dist/**')
        .pipe(gulpS3(conf));

});