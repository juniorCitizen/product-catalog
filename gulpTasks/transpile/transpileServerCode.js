import dotenv from 'dotenv'

dotenv.config()

module.exports = (gulp, plugins) => {
    return () => {
        let transpile = gulp.src('./src/backend/**/*.js')
        // TODO check if source map is actually working...
        if (process.env.NODE_ENV !== 'production') {
            transpile
                .pipe(plugins.sourcemaps.init({ loadMaps: true }))
                .pipe(plugins.sourcemaps.write('./dist/sourcemaps'))
        }
        transpile.pipe(plugins.babel({
            presets: ['es2015', 'stage-2']
        }))
        return transpile
            .pipe(gulp.dest('./dist/server'))
    }
}
