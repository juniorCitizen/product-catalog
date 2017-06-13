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
                .pipe(plugins.sourcemaps.init({ loadMaps: true }))
                .pipe(plugins.sourcemaps.write('./sourcemaps'))
                .pipe(gulp.dest('./dist/client'))
        }
    }
}
