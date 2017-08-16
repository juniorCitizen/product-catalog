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
                    return mkdir('./dist/server')
                }).then(() => {
                    return mkdir('./dist/server/client')
                }).then(() => {
                    return mkdir('./dist/server/client/assets')
                }).then(() => {
                    return mkdir('./dist/server/client/lib')
                }).then(() => {
                    return mkdir('./dist/server/client/style')
                })
        } else {
            return mkdir('./dist')
                .then(() => {
                    return mkdir('./dist/server')
                }).then(() => {
                    return mkdir('./dist/server/client')
                }).then(() => {
                    return mkdir('./dist/server/client/assets')
                }).then(() => {
                    return mkdir('./dist/server/client/lib')
                }).then(() => {
                    return mkdir('./dist/server/client/style')
                })
        }
    }
}
