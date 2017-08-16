require('dotenv').config()

const sourceFilePath = './src/server/views/**/*.hbs'
const destFilePath = './dist/server/views'

module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src(sourceFilePath)
            .pipe(gulp.dest(destFilePath))
    }
}
