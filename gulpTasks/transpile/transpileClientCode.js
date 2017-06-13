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
