import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

module.exports = (gulp, plugins) => {
    return (done) => {
        if (fs.existsSync('./example.db')) {
            fs.unlink('./example.db', (error) => {
                if (error) {
                    return done(error)
                }
                copy(`./${process.env.SYS_REF}.db`, './example.db')
                return done()
            })
        } else {
            copy(`./${process.env.SYS_REF}.db`, './example.db')
            return done()
        }
    }

    function copy(origPath, destPath) {
        fs.createReadStream(origPath)
            .pipe(fs.createWriteStream(destPath))
    }
}
