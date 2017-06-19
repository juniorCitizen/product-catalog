import chalk from 'chalk'
import dotenv from 'dotenv'
import envify from 'envify'
import browserify from 'browserify'
import sourceStream from 'vinyl-source-stream'
import streamBuffer from 'vinyl-buffer'

dotenv.config()

module.exports = (gulp, plugins) => {
    return () => {
        let transpile = browserify({
            entries: [
                './src/frontend/app.js',
                // Libraries required by Foundation
                // './bower_components/jquery/dist/jquery.js',
                './bower_components/what-input/dist/what-input.js',
                // Core Foundation files
                './bower_components/foundation-sites/js/foundation.core.js',
                './bower_components/foundation-sites/js/foundation.util.box.js',
                './bower_components/foundation-sites/js/foundation.util.keyboard.js',
                './bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
                './bower_components/foundation-sites/js/foundation.util.motion.js',
                './bower_components/foundation-sites/js/foundation.util.nest.js',
                './bower_components/foundation-sites/js/foundation.util.timerAndImageLoader.js',
                './bower_components/foundation-sites/js/foundation.util.touch.js',
                './bower_components/foundation-sites/js/foundation.util.triggers.js',
                // Individual Foundation components
                // If you aren't using a component, just remove it from the list,
                './bower_components/foundation-sites/js/foundation.abide.js',
                './bower_components/foundation-sites/js/foundation.accordion.js',
                './bower_components/foundation-sites/js/foundation.accordionMenu.js',
                './bower_components/foundation-sites/js/foundation.drilldown.js',
                './bower_components/foundation-sites/js/foundation.dropdown.js',
                './bower_components/foundation-sites/js/foundation.dropdownMenu.js',
                './bower_components/foundation-sites/js/foundation.equalizer.js',
                './bower_components/foundation-sites/js/foundation.interchange.js',
                './bower_components/foundation-sites/js/foundation.magellan.js',
                './bower_components/foundation-sites/js/foundation.offcanvas.js',
                './bower_components/foundation-sites/js/foundation.orbit.js',
                './bower_components/foundation-sites/js/foundation.responsiveMenu.js',
                './bower_components/foundation-sites/js/foundation.responsiveToggle.js',
                './bower_components/foundation-sites/js/foundation.reveal.js',
                './bower_components/foundation-sites/js/foundation.slider.js',
                './bower_components/foundation-sites/js/foundation.sticky.js',
                './bower_components/foundation-sites/js/foundation.tabs.js',
                './bower_components/foundation-sites/js/foundation.toggler.js',
                './bower_components/foundation-sites/js/foundation.tooltip.js',
                './bower_components/foundation-sites/js/foundation.zf.responsiveAccordionTabs.js'
            ],
            extensions: ['.js', '.vue'],
            debug: process.env.NODE_ENV !== 'production'
        })
            .transform(envify)
            // extract css from .vue components
            // .plugin('vueify/plugins/extract-css', {
            //     out: './dist/client/app.css'
            // })
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
            transpile.pipe(plugins.sourcemaps.init())
            transpile.pipe(plugins.sourcemaps.write('./'))
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
