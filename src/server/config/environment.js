require('dotenv').config()

module.exports = (() => {
    return {
        SYS_REF: process.env.SYS_REF,
        NODE_ENV: process.env.NODE_ENV,
        HOST: process.env.NODE_ENV === 'production' ? process.env.PROD_HOST : process.env.DEV_HOST,
        PORT: process.env.PORT,
        PASS_PHRASE: process.env.PASS_PHRASE,
        VALIDATE: process.env.VALIDATE,
        TIMEZONE: process.env.TIMEZONE,
        ADMIN: process.env.ADMIN,
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD
    }
})()
