import dotenv from 'dotenv'
import eventStream from 'event-stream'
import sourceStream from 'vinyl-source-stream'

dotenv.config()

module.exports = (gulp, plugins) => {
    return () => {
        let databaseFile = gulp
            .src(`./${process.env.SYS_REF}.db`)
            .pipe(sourceStream('example.db'))
            .pipe(gulp.dest('.'))
        let environmentConfigFile = gulp
            .src('./.env')
            .pipe(sourceStream('example.env'))
            .pipe(gulp.dest('.'))
        return eventStream.merge.apply(null, [databaseFile, environmentConfigFile])
    }
}
