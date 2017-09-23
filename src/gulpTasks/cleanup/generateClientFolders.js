// import del from 'del'
// import fs from 'fs'
import fs from 'fs-extra'
import Promise from 'bluebird'

// const mkdir = Promise.promisify(require('fs').mkdir)

// remove the 'dist' directory if exists
module.exports = (gulp, plugins) => {
    return (done) => {
        fs.pathExists('./dist')
            .then((exist) => {
                if (exist) {
                    return fs.remove('./dist')
                } else {
                    return Promise.resolve()
                }
            })
            .then(() => {
                return Promise
                    .all([
                        fs.ensureDir('./dist/server/client/assets'),
                        fs.ensureDir('./dist/server/client/lib'),
                        fs.ensureDir('./dist/server/client/style')
                    ])
                    .then(() => {
                        return done()
                    })
            })
            .catch((error) => {
                return done(error)
            })
        // if (fs.existsSync('./dist')) {
        //     return del('./dist/**')
        //         .then(() => {
        //             return mkdir('./dist')
        //         }).then(() => {
        //             return mkdir('./dist/server')
        //         }).then(() => {
        //             return mkdir('./dist/server/client')
        //         }).then(() => {
        //             return mkdir('./dist/server/client/assets')
        //         }).then(() => {
        //             return mkdir('./dist/server/client/lib')
        //         }).then(() => {
        //             return mkdir('./dist/server/client/style')
        //         })
        // } else {
        //     return mkdir('./dist')
        //         .then(() => {
        //             return mkdir('./dist/server')
        //         }).then(() => {
        //             return mkdir('./dist/server/client')
        //         }).then(() => {
        //             return mkdir('./dist/server/client/assets')
        //         }).then(() => {
        //             return mkdir('./dist/server/client/lib')
        //         }).then(() => {
        //             return mkdir('./dist/server/client/style')
        //         })
        // }
    }
}
