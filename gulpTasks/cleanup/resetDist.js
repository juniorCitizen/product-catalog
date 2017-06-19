import Promise from 'bluebird'
import del from 'del'
import fs from 'fs'

const mkdir = Promise.promisify(require('fs').mkdir)

// remove the 'dist' directory if exists
module.exports = (gulp, plugins) => {
    return () => {
        if (fs.existsSync('./dist')) {
            return del('./dist/**')
                .then(() => {
                    return mkdir('./dist')
                }).then(() => {
                    return mkdir('./dist/client')
                }).then(() => {
                    return mkdir('./dist/client/style')
                }).then(() => {
                    return mkdir('./dist/client/lib')
                })
        } else {
            return mkdir('./dist')
                .then(() => {
                    return mkdir('./dist/client')
                }).then(() => {
                    return mkdir('./dist/client/style')
                }).then(() => {
                    return mkdir('./dist/client/lib')
                })
        }
    }
}
