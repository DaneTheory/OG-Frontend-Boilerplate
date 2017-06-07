'use strict';

import gulp from 'gulp';
import sass from  'gulp-sass';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
// import * as jshint from 'gulp-jshint';
import rename from 'gulp-rename';
import cssnano from 'gulp-cssnano';


const dirs = {
  src: 'src',
  dest: 'app',
};

const sassPaths = {
  src: `${dirs.src}/scss/style.scss`,
  dest: `${dirs.dest}/assets/css`,
  paths: `${dirs.src}/scss/*/*.scss`,
};

const jsPaths = {
  src: `${dirs.src}/js/scripts.js`,
  dest: `${dirs.dest}/assets/js`,
  paths: `${dirs.src}/js/*.js`,
};

const htmlPaths = {
  dest: `${dirs.dest}/*.html`,
};


gulp.task('css', () => {
    return gulp.src(sassPaths.src)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('js', () => {
  return gulp.src(jsPaths.src)
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(jsPaths.dest))
    // .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(jsPaths.dest))
    .pipe(browserSync.reload({stream:true, once: true}));
});


gulp.task('browser-sync', () => {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});


gulp.task('bs-reload', () => {
    browserSync.reload();
});


gulp.task('default', ['css', 'js', 'browser-sync'], () => {
    gulp.watch(sassPaths.paths, ['css']);
    gulp.watch(jsPaths.paths, ['js']);
    gulp.watch(htmlPaths.dest, ['bs-reload']);
});
