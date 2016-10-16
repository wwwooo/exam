'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSynk({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass:watch', function() {
  gulp.watch('src/scss/*/*.scss', ['sass']);
  gulp.watch('app/*.html', reload);
});

//gulp.task('default', ['sass, sass:watch']);
