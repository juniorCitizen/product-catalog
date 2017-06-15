import del from 'del'
import fs from 'fs'

// remove the 'dist' directory if exists
module.exports = (gulp, plugins) => {
    return (done) => {
        if (fs.existsSync('./dist')) {
            return del('./dist/**')
        } else {
            return done()
        }
    }
}
