const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

function styles() {
    return gulp.src('src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('custom.css'))
        .pipe(cleanCSS())
        .pipe(rename({ dirname: 'dist/styles' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
}

exports.default = styles;