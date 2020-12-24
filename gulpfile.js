const gulp = require('gulp');
// I had to use a fork of gulp-sass that doesn't depend on 
// node-sass which is deprecated
const sass = require('@selfisekai/gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

// explicitly tell gulp-sass to use dart-sass
sass.compiler = require('sass');

// compile scss into css
function style() {
    // locate SCSS file
    return gulp.src('./source/scss/**/*.scss')
    // pass file through sass compiler and log errs with sass
        .pipe(sass().on('error', sass.logError))
    // save compiled CSS
        .pipe(gulp.dest('./css'))
    // stream changes to all browsers (this allows updates 
    // to styles without having to refresh webpage)
        .pipe(browserSync.stream());
}

// compile es6 javascript with babel
function script() {
    return gulp.src('./source/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('./js'));
}

function watch() {
    browserSync.init({
        // setup the server
        server: {
            baseDir: './'
        }
    });
    // watch for changes on these files and run style 
    // function or reload browser
    gulp.watch('./source/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./source/js/**/*.js', script).on('change', browserSync.reload);
}

exports.style = style;
exports.script = script;
exports.watch = watch;