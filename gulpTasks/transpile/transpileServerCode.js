import dotenv from 'dotenv'

dotenv.config()

module.exports = (gulp, plugins) => {
    return () => {
        let transpile = gulp.src('./src/backend/**/*.js')
        if (process.env.NODE_ENV !== 'production') {
            transpile.pipe(plugins.sourcemaps.init())
        }
        transpile.pipe(plugins.babel({
            presets: ['es2015', 'stage-2']
        }))
        if (process.env.NODE_ENV !== 'production') {
            transpile.pipe(plugins.sourcemaps.write('./sourcemaps'))
        }
        return transpile
            .pipe(gulp.dest('./dist/server'))
    }
}
