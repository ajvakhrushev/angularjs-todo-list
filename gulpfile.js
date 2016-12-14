'use strict';

(function () {  
  //if node version is lower than v.0.1.2
  require('es6-promise').polyfill();

  var path = require('path');
  var fs = require('fs');
  var gulp = require('gulp');
  var plumber = require('gulp-plumber');
  var rename = require('gulp-rename');
  var clean = require('gulp-clean');
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var autoPrefixer = require('gulp-autoprefixer');
  var cleanCss = require('gulp-clean-css');
  var jshint = require('gulp-jshint');
  var browserify = require('gulp-browserify');
  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');
  var livereload = require('gulp-livereload');
  var bower = require('gulp-bower');
  var ngConstant = require('gulp-ng-constant');
  var replace = require('gulp-replace');
  var utils = require('./gulputils');
  var svgSprite = require('gulp-svg-sprite');
  var svgmin = require('gulp-svgmin');
  var cheerio = require('gulp-cheerio');


  var PATH = (function() {
    var root = __dirname,
        base = root + '/..',
        src = root + '/src';

    return {
      base: base,
      root: root,
      config: src + '/config',
      src: src,
      app: src + '/app',
      assets: src + '/assets',
      dist: root + '/dist'
    };
  }());

  var MODULE_NAME = 'Books';
  var ENV = ['dev', 'qa', 'prod'];

  gulp.task('bower-clean', function () {
    return gulp.src(PATH.root + '/bower_components', {read: false})
            .pipe(clean());
  });

  gulp.task('bower-install', ['bower-clean'], function() {
    return bower();
  });

  gulp.task('ng-constant', function () {
    var tmp = ENV.indexOf(process.env),
        env = tmp !== -1 ? ENV[tmp] : 'dev';

    return ngConstant({
        name: MODULE_NAME,
        constants: { ENV: require(`${PATH.config}/${env}.json`) },
        deps: false,
        stream: true
      })
      .pipe(rename('env.js'))
      .pipe(gulp.dest(PATH.src + '/app/'));
  });

  gulp.task('js-dev', function() {  
    gulp
      .src([
        `${PATH.src}/**/*.js`,
        `!${PATH.app}/env.js`,
        `!${PATH.app}/common/main/services/polyfills.js`,
        `!${PATH.src}/server/**/*.js`
      ])
      .pipe(plumber(utils.plumperHandler))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(livereload());
  });

  gulp.task('scss-compile', function() {  
    var dest = `${PATH.src}/assets/styles/css`;

    gulp.src([`${PATH.src}/assets/styles/scss/**/*.scss`])
      .pipe(plumber(utils.plumperHandler))
      // .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoPrefixer())
      .pipe(concat('main.css'))
      .pipe(gulp.dest(dest))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(cleanCss())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe(livereload());
  });

  gulp.task('install', [
    'bower-install',
    'ng-constant'
  ]);

  gulp.task('build', function() {

  });

  gulp.task('test', function() {  

  });

  gulp.task('package', function() {  

  });

  gulp.task('serve', [
    'js-dev',
    'scss-compile'
  ], function() {
    gulp.watch(`${PATH.src}/**/*.js`, ['js-dev']);
    gulp.watch(`${PATH.src}/assets/styles/scss/**/*.scss`, ['scss-compile']);
  });

}());
