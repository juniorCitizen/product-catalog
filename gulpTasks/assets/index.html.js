require('dotenv').config()

const prodFilePath = './src/client/index.prod.html'
const devFilePath = './src/client/index.dev.html'
const destFilePath = './dist/client'

module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src(process.env.NODE_ENV === 'production' ? prodFilePath : devFilePath)
            .pipe(plugins.rename('index.html'))
            .pipe(gulp.dest(destFilePath))
    }
}
