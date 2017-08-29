import path from 'path'

module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src([
                // custom bulma stylesheet
                path.join(__dirname, '../../../node_modules/bulma/css/*')
            ])
            .pipe(gulp.dest('./dist/server/client/style'))
    }
}
