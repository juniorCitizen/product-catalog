import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

module.exports = (gulp, plugins) => {
    return () => {
        return gulp.src([
            'src/frontend/**/*.js',
            'src/frontend/**/*.vue'
        ])
            // .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.print()))
            .pipe(plugins.eslint('./.eslintrc'))
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.format('stylish', fs.createWriteStream('./eslint.log')))
            .pipe(plugins.eslint.failOnError())
    }
}
