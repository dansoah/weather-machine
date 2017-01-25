const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const less = require('gulp-less');

const pathTo = {
    lessFolder: './app/less/',
    lessEntryPoint: './app/less/main.less',
    cssBundle: './app-dist/css/',
    imagesFolder: './app/images',
    imagesDest: './app-dist/images',
    jsFolder: './app/js/',
}

gulp.task('build:js', function (next) {
    webpack(webpackConfig, (err, stats) => {
        if (err)
            throw new gutil.PluginError('build:js', err);

        gutil.log('[build:js] Completed\n' + stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: false,
            version: false
        }));
        next();
    })
})

gulp.task('build:images', function () {
    let str = path.join(pathTo.imagesFolder,'/**/*.{png,jpg,jpeg}');
    return gulp.src(str).pipe(gulp.dest(pathTo.imagesDest));
})

gulp.task('build:less', function () {
    return gulp.src(pathTo.lessEntryPoint)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(pathTo.cssBundle));
});

gulp.task('watch', function(){
    let jsWatcher = path.join(pathTo.jsFolder,"/**/*.js");
    let lessWatcher = path.join(pathTo.lessFolder,"/**/*.less");
    let imageWatcher = path.join(pathTo.imagesFolder,"/**/*.*");

    gulp.watch([jsWatcher], ['build:js'])
    gulp.watch([lessWatcher], ['build:less'])
    gulp.watch([imageWatcher], ['build:images'])

})

gulp.task('default', ['build:js','build:images','build:less'], function () {
    
});