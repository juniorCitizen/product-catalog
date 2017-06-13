import envify from 'envify'
import browserify from 'browserify'
import sourceStream from 'vinyl-source-stream'

module.exports = (gulp, plugins) => {
    return () => {
        return browserify('./src/frontend/app.js', {
            extensions: ['.js', '.vue'],
            debug: false
        })
            .transform(envify)
            .plugin('vueify/plugins/extract-css', {
                out: './dist/client/app.css'
            })
            .bundle()
            .pipe(sourceStream('app.js'))
            .pipe(gulp.dest('./dist/client'))
    }
}
