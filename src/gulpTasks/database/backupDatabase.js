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

    let blankDbPath = `./src/gulpTasks/database/${process.env.SYS_REF}.blank.db`

    return (done) => {
        return fs
            .pathExists(workingDbPath)
            .then((workingDbPathExists) => {
                if (workingDbPathExists) {
                    return fs.remove(backupDbPath)
                } else {
                    return fs
                        .pathExists(blankDbPath)
                        .then((blankDbPathExists) => {
                            if (blankDbPathExists) {
                                return gulp
                                    .src(blankDbPath)
                                    .pipe(plugins.rename(workingDb))
                                    .pipe(gulp.dest(workingDbDir))
                            } else {
                                let error = new Error('none of the required db files exists')
                                error.name = 'requiredDatabaseFilesMissing'
                                return Promise.reject(error)
                            }
                        })
                }
            })
            .then(() => {
                return gulp
                    .src(workingDbPath)
                    .pipe(plugins.rename(backupDb))
                    .pipe(gulp.dest(backupDbDir))
            })
            .catch((error) => {
                return done(error)
            })
    }
}
