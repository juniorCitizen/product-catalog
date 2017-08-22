require('dotenv').config()

const babelOptions = {
    babelrc: true,
    comments: process.env.NODE_ENV !== 'production',
    sourceMaps: true // set to 'false' to map to post-transpiled code
}

module.exports = (gulp, plugins) => {
    return () => {
        let transpile = gulp.src('./src/server/**/*.js')
        // TODO check if source map is actually working...
        if (process.env.NODE_ENV !== 'production') {
            return transpile
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.babel(babelOptions))
                .pipe(plugins.sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/server'))
        } else {
            return transpile
                .pipe(plugins.babel(babelOptions))
                .pipe(gulp.dest('./dist/server'))
        }
        // return transpile.pipe(gulp.dest('./dist/server'))
    }
}
