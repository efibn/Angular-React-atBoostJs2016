/**
 * Created by sebastianp on 19/02/2016.
 */
'use strict';

const glob = require("glob");
const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');

let
    taskNames = [],
    tasks = getFolders();

tasks.forEach((task)=> {
    taskNames.push('js-' + task);

    js(task);
});

console.log(taskNames);

gulp.task('default', taskNames, () => {
    tasks.forEach((task)=> {
        gulp.watch([task + '/**/*.jsx', '!' + task + '/builds/**/*.js'], ['js-' + task]);
    });
});

//gulp.task('html', () => {
//    gulp.src('./**/*.html')
//        .pipe(connect.reload());
//
//    gutil.log('HTML');
//});

//gulp.task('server', () => {
//    connect.server({
//        root: '.',
//        livereload: true
//    });
//});

//gulp.task('default', ['watch', 'js-starter3', 'js-starter2', 'js-starter', 'js-solution', 'js-solution-es5', 'html', 'server'], () => {
//    gutil.log('React Workshop');
//});

function js(proj) {
    gulp.task('js-' + proj, () => {
        gutil.log('Js Transpilation');

        gulp.src(proj + '/**/*.jsx')
            //.pipe(concat('script.js'))
            .pipe(babel({presets: ['react', 'es2015']})).on('error', onError)
            .pipe(browserify({debug: true})).on('error', onError)
            //.pipe(uglify())
            .pipe(gulp.dest(proj + '/builds'))
            .pipe(connect.reload());
    });
}

function onError(err) {
    console.log(err);
    //this.emit('end');
}

function getFolders() {
    let
        folders = {},
        files = glob.sync("**/*.jsx", {});

    files.forEach((file)=> {
        let
            secondSlash = file.indexOf('/', file.indexOf('/') + 1),
            folder = file.substring(0, secondSlash);

        if (folder.indexOf('node_modules') === -1 && folder.indexOf('_samples') === -1) {
            folders[folder] = true;
        }
    });

    return Object.keys(folders);
}
