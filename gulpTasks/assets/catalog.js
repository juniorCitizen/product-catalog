module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/client/assets/misc/gentry_way_full_catalog.pdf')
            .pipe(gulp.dest('./dist/client/assets/catalog'))
    }
}
