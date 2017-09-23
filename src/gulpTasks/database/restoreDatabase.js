import fs from 'fs-extra'
import Promise from 'bluebird'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    let workingDb = `${process.env.SYS_REF}.db`
    let workingDbDir = './dist/server'
    let workingDbPath = `${workingDbDir}/${workingDb}`

    let backupDb = `${process.env.SYS_REF}.backup.db`
    let backupDbDir = './backup'
    let backupDbPath = `${backupDbDir}/${backupDb}`

    return (done) => {
        return fs
            .pathExists(backupDbPath)
            .then((exists) => {
                if (exists) {
                    return fs.remove(workingDbPath)
                } else {
                    let error = new Error('backup database does not exist')
                    error.name = 'backupDatabaseNotExist'
                    return Promise.reject(error)
                }
            })
            .then(() => {
                return gulp
                    .src(backupDbPath)
                    .pipe(plugins.rename(workingDb))
                    .pipe(gulp.dest(workingDbDir))
            })
            .catch((error) => {
                return done(error)
            })
    }
}
