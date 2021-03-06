'use strict';

const gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minify = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  maps = require('gulp-sourcemaps'),
  util = require('gulp-util'),
  babel = require('gulp-babel'),
  del = require('del');

gulp.task("compileScripts", function () {
  return gulp
    .src([
      './external/share2social.js',
      './src/js/index.js',
    ])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task("concatScripts", ["compileScripts"], function () {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.js',
      './external/jquery-ui-1.12.1.custom/jquery-ui.js',
      './node_modules/tether/dist/js/tether.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/izimodal/js/iziModal.js',
      './external/Blob.js',
      './external/canvas-toBlob.js',
      './node_modules/file-saver/FileSaver.js',
      './node_modules/fabric/dist/fabric.js',
      './dist/js/index.js',
    ])
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
  return gulp.src("./dist/js/index.js")
    .pipe(uglify())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('concatCss', function () {
  gulp.src([
    './external/jquery-ui-1.12.1.custom/jquery-ui.css',
    './external/jquery-ui-1.12.1.custom/jquery-ui.theme.css',
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/izimodal/css/iziModal.css",
    "./node_modules/font-awesome/css/font-awesome.css",
    './src/css/styles.css'])
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minifyCss', ['concatCss'], function () {
  gulp.src('./dist/css/index.css')
    .pipe(minify())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ["minifyScripts", "minifyCss"], function () {
  console.log("Done...");
});