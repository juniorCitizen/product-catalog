module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/backend/views/**/*.hbs')
            .pipe(gulp.dest('./dist/server/views'))
    }
}
