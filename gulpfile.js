const gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	babel = require('gulp-babel'),
	plumber = require('gulp-plumber'),
  concat = require('gulp-concat');

const store = 'r7-com-';

// sass config
const pathBuildSass = './public/stylesheets';
const listFilesScss = [
	'./public/sass/**/*.scss',
];

// js config 
const pathBuildFiles = './public/javascripts';
const listFilesJs = [
  './public/m-javascript/**/*.js',
];

// sass task
gulp.task('css:sass', function () {
	gulp.src(listFilesScss)
		.pipe(sass().on('error', console.log))
		.pipe(gulp.dest(pathBuildSass))
});

// js task
gulp.task('js:files', function () {
	gulp.src(listFilesJs)
		.pipe(plumber())
		.pipe(concat(store + 'app.min.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(pathBuildFiles))
});

// faltou apenas um gulp para otimizar as imagens, importante para a performance

// declarada como default - ok
gulp.task('default', ['css:sass', 'js:files']);

// declarada como watch - ok
gulp.task('watch', function () {
	gulp.watch('./public/sass/**/*.scss', ['css:sass']);
	gulp.watch('./public/m-javascript/**/*.js', ['js:files']);
});