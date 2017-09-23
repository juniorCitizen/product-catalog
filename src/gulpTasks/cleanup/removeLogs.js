// import del from 'del'
import fs from 'fs-extra'

module.exports = (gulp, plugins) => {
    return () => {
        // remove all log files from the base directory
        return fs.remove('./*.log')
        // return del('./*.log')
    }
}
