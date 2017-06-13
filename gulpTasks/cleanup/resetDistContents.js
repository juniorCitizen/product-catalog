import del from 'del'
import fs from 'fs'

module.exports = (gulp, plugins) => {
    return (done) => {
        if (fs.existsSync('./dist')) {
            del.sync('./dist/**')
        }
        return done()
    }
}
