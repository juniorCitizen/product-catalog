import Promise from 'bluebird'
import path from 'path'

import emailTransporter from '../../../config/email'
import eVars from '../../../config/environment'

function sendThankYou(name, email, comments) {
    let today = new Date()
    let messageBodyPartA = `<div>Dear ${name},</div><br><div>This email is from <a href="${eVars.HOST}:${eVars.PORT}">Gentry Way Co., Ltd.</a><br><br>Thank you very much for registering on our website.<br>Attached is a copy of our PDF catalog.<br><br>Please have a look and let us know if you see any items of interest.<br></div>`
    let prepedComments = `<br><br><div>The following question/comments from you had been received:<br><br><div style="white-space:pre-wrap;">${comments}</div><br></div>`
    let messageBodyPartB = `<div>Our sales staff will be in touch with you soon.<br><br>Sincerely,<br>Gentry Way Sales Team<br>Gentry Way Co., Ltd.<br>Gentry Hardware Product Co., Ltd.<br><img alt="logo" src="${eVars.HOST}:${eVars.PORT}/assets/images/gentryLogo.png"><br>${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}</div>`
    let confidentiality = `<br><br><div style="font-size:60%;">EMAIL CONFIDENTIALITY NOTICE: This email transmission and any attachments contained within may contain information that is confidential or otherwise exempt from disclosure under applicable law and is intended solely for the use of the individual(s) to whom it was intended to be addressed. If you have received this email by mistake, or you are not the intended recipient, any disclosure, dissemination, distribution, copying or other use or retention of this communication or its substance is prohibited. If you have received this communication in error, please immediately report to the author via email that you received this message by mistake and also permanently destroy printed copies and delete the original and all copies of this email and any attachments from your computer.</div>`
    let emailOptions = {
        from: `"${eVars.ADMIN}" <${eVars.ADMIN_EMAIL}>`,
        replyTo: eVars.ADMIN_EMAIL,
        to: email,
        subject: 'Thank you message from Gentry Way',
        html: `${messageBodyPartA}${comments === null ? '' : prepedComments}${messageBodyPartB}${confidentiality}`,
        attachments: [{
            path: path.resolve('./dist/client/assets/images/gentryLogo.png')
        }, {
            path: path.resolve('./dist/client/assets/catalog/gentry_way_full_catalog.pdf')
        }]
    }
    return new Promise((resolve, reject) => {
        emailTransporter.sendMail(emailOptions, (mailError, mailResponse) => {
            if (mailError) {
                return reject(mailError)
            } else {
                return resolve(mailResponse.accepted)
            }
        })
    })
}

module.exports = sendThankYou
