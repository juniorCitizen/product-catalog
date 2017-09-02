import del from 'del'
import fileExists from 'file-exists-promise'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    let workingDb = `${process.env.SYS_REF}.db`
    let workingDbDir = './dist/server'
    let workingDbPath = `${workingDbDir}/${workingDb}`

    let backupDb = `${process.env.SYS_REF}.backup.db`
    let backupDbDir = './backup'
    let backupDbPath = `${backupDbDir}/${backupDb}`

    let blankDbPath = `./${process.env.SYS_REF}.blank.db`

    return (done) => {
        return fileExists(workingDbPath)
            .then((stat) => {
                // delete backup database
                return del(backupDbPath)
            })
            .then(() => {
                // back up the working database
                return gulp
                    .src(workingDbPath)
                    .pipe(plugins.rename(backupDb))
                    .pipe(gulp.dest(backupDbDir))
            })
            .catch(() => {
                // working db does not exist
                return fileExists(blankDbPath)
                    .then((stat) => {
                        // reinit database from blank db
                        return gulp
                            .src(blankDbPath)
                            .pipe(plugins.rename(workingDb))
                            .pipe(gulp.dest(workingDbDir))
                    })
                    .catch((error) => {
                        return done(error || 'none of the required db files exists')
                    })
            })
    }
}
