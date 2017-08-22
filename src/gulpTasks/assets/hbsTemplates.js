require('dotenv').config()

module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/server/views/**/*.hbs')
            .pipe(gulp.dest('./dist/server/views'))
    }
}
