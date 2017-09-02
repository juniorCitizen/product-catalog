import fs from 'fs'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    return (done) => {
        let dotenvProperties = []
        for (let property in process.env) {
            dotenvProperties.push({
                propertyName: property,
                ignored: (
                    (property.indexOf('PASSWORD') !== -1) ||
                    (property.indexOf('PASS_PHRASE') !== -1)
                )
            })
        }
        fs.writeFile('./backup/backup.env', convertToText(dotenvProperties), (error) => {
            if (error) {
                return done(error)
            } else {
                fs.writeFile('./blank.env', convertToEmptyFile(dotenvProperties), (error) => {
                    if (error) {
                        return done(error)
                    } else {
                        return done()
                    }
                })
            }
        })
    }
}

function convertToText(objectArray) {
    let text = ''
    objectArray.forEach((object, index, array) => {
        text = `${text}${object.propertyName}=`
        text = `${text}${object.ignored ? '' : process.env[object.propertyName]}`
        text = `${text}${(index === (process.env.length - 1)) ? '' : '\n'}`
    })
    return text
}

function convertToEmptyFile(objectArray) {
    let text = ''
    objectArray.forEach((object, index) => {
        text = `${text}${object.propertyName}=`
        text = `${text}${(index === (process.env.length - 1)) ? '' : '\n'}`
    })
    return text
}
