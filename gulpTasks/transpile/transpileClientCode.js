import chalk from 'chalk'
import dotenv from 'dotenv'
import envify from 'envify'
import browserify from 'browserify'
import sourceStream from 'vinyl-source-stream'
import streamBuffer from 'vinyl-buffer'

dotenv.config()

module.exports = (gulp, plugins) => {
    return () => {
        let transpile = browserify('./src/frontend/app.js', {
                extensions: ['.js', '.vue'],
                debug: process.env.NODE_ENV === 'production' ? false : true
            })
            .transform(envify)
            .plugin('vueify/plugins/extract-css', {
                out: './dist/client/app.css'
            })
            .bundle()
            .on('error', (error) => {
                console.log(chalk.bold.red(
                    `Browserify encountered error while bundling: ${error.message}`
                ))
            })
            .pipe(sourceStream('app.js'))
            .pipe(streamBuffer())
        // TODO check if source map is actually working...
        if (process.env.NODE_ENV !== 'production') {
            transpile
                .pipe(plugins.sourcemaps.init({ loadMaps: true }))
                .pipe(plugins.sourcemaps.write('./dist/sourcemaps'))
        }
        return transpile.pipe(gulp.dest('./dist/client'))
    }
}

// sample code on using browserify to create multiple bundles
// 'use strict';

// var gulp       = require('gulp'),
//     source     = require('vinyl-source-stream'),
//     rename     = require('gulp-rename'),
//     browserify = require('browserify'),
//     es         = require('event-stream');

// gulp.task('default', function() {
//     // we define our input files, which we want to have
//     // bundled:
//     var files = [
//         './app/main-a.js',
//         './app/main-b.js'
//     ];
//     // map them to our stream function
//     var tasks = files.map(function(entry) {
//         return browserify({ entries: [entry] })
//             .bundle()
//             .pipe(source(entry))
//             // rename them to have "bundle as postfix"
//             .pipe(rename({
//                 extname: '.bundle.js'
//             }))
//             .pipe(gulp.dest('./dist'));
//         });
//     // create a merged stream
//     return es.merge.apply(null, tasks);
// });
