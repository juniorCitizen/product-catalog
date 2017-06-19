import del from 'del'
import fs from 'fs'

require('dotenv').config()

const dbFile = `./${process.env.SYS_REF}.db`
const exampleDbFile = './example.db'

module.exports = (gulp, plugins) => {
    return (done) => {
        // check if the database exists
        return fs.access(dbFile, fs.constants.F_OK, (error) => {
            if (!error) {
                // check if an example exists
                return fs.access(exampleDbFile, fs.constants.F_OK, (error) => {
                    if (error) { // example does not exist
                        copy(dbFile, exampleDbFile)
                    } else {
                        del.sync(exampleDbFile)
                        copy(dbFile, exampleDbFile)
                    }
                    return done()
                })
            } else {
                // required database file is not found
                return done(`${process.env.SYS_REF}.db not found but is required`)
            }
        })
    }

    function copy(origPath, destPath) {
        let readStream = fs.createReadStream(origPath)
        let writeStream = fs.createWriteStream(destPath)
        readStream.pipe(writeStream)
    }
}
