module.exports = (gulp, plugins) => {
    return () => {
        return plugins.watch('./src/server/views/**/*.hbs', () => {
            gulp.src('./src/server/views/**/*.hbs')
                .pipe(gulp.dest('./dist/server/views'))
        })
    }
}
