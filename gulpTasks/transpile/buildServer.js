import dotenv from 'dotenv'

dotenv.config()

const babelOptions = {
    babelrc: true,
    comments: process.env.NODE_ENV !== 'production',
    sourceMaps: true // set to 'false' to map to post-transpiled code
}

module.exports = (gulp, plugins) => {
    return () => {
        let transpile = gulp.src('./src/backend/**/*.js')
        // TODO check if source map is actually working...
        if (process.env.NODE_ENV !== 'production') {
            transpile
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.babel(babelOptions))
                .pipe(plugins.sourcemaps.write('./'))
        } else {
            transpile.pipe(plugins.babel(babelOptions))
        }
        return transpile.pipe(gulp.dest('./dist/server'))
    }
}
