import del from 'del'
import fileExists from 'file-exists-promise'
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
        return fileExists(backupDbPath)
            .then((stat) => {
                // delete working database
                return del(workingDbPath)
            })
            .then(() => {
                // restore from the backup database
                return gulp
                    .src(backupDbPath)
                    .pipe(plugins.rename(workingDb))
                    .pipe(gulp.dest(workingDbDir))
            })
            .catch(() => {
                // backup db does not exist
                let error = new Error('backup database does not exist')
                error.name = 'backupDatabaseNotExist'
                return Promise.reject(error)
            })
    }
}
