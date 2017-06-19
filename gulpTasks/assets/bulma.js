module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./node_modules/bulma/css/bulma.css')
            .pipe(gulp.dest('./dist/client/style'))
    }
}
