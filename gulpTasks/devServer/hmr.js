import browserify from 'browserify'
import chalk from 'chalk'
import hmr from 'browserify-hmr'
import sourceStream from 'vinyl-source-stream'
import streamBuffer from 'vinyl-buffer'
import watchify from 'watchify'

module.exports = (gulp, plugins) => {
    return () => {
        let bundle = browserify('./src/frontend/app.js', {
            extensions: ['.js', '.vue'],
            plugin: [watchify, hmr],
            cache: {},
            packageCache: {},
            debug: true
        })
        bundle.on('update', rebundle)
        return rebundle()

        function rebundle() {
            return bundle
                .bundle()
                .on('error', (error) => {
                    console.log(chalk.bold.red(
                        `Browserify encountered error while bundling: ${error.message}`
                    ))
                })
                .pipe(sourceStream('app.js'))
                .pipe(streamBuffer())
                // TODO check if source map is actually working...
                .pipe(plugins.sourcemaps.init({ loadMaps: true }))
                .pipe(plugins.sourcemaps.write('./dist/sourcemaps'))
                .pipe(gulp.dest('./dist/client'))
        }
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
