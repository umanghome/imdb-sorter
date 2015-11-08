var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

gulp.task('browserify', function() {
	gulp.src('./src/js/main.js')
		.pipe(browserify({ transform: 'reactify' }))
		.pipe(gulp.dest('./src/dist/js'));
});

// launch browser in a port
gulp.task('open', function() {
	var options = {
		url: 'http://localhost:8080'
	};
	gulp.src('./app/index.html')
		.pipe(open('', options));
});

// live reload server
gulp.task('connect', function() {
	connect.server({
		livereload: true
	});
});

// live reload js
gulp.task('js', function() {
	gulp.src('./src/dist/**/*.js')
		.pipe(connect.reload());
});

// live reload html
gulp.task('html', function() {
	gulp.src('./*.html')
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src('./src/dist/**/*.css')
		.pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
	gulp.watch('src/dist/js/*.js', ['js']);
	gulp.watch('*.html', ['html']);
	gulp.watch('src/dist/css/*.css', ['css']);
	gulp.watch('src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);