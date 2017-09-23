// import del from 'del'
import fs from 'fs-extra'

module.exports = (gulp, plugins) => {
    return () => {
        return fs.remove('./dist')
        // return del('./dist/**/*.*')
    }
}
