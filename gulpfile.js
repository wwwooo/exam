'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require("browser-sync").create();

gulp.task('js:build', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('style:build', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['style:build'], function() {
    browserSync.init({
        server: "./dist",
        ghostMode: false
    });

    gulp.watch("src/scss/**/*.scss", ['style:build']);
    gulp.watch("dist/index.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
