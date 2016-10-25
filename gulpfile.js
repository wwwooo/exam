'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    csscomb = require('gulp-csscomb'),
    browserSync = require("browser-sync").create();

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(csscomb('csscomb.json'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("dist/index.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
