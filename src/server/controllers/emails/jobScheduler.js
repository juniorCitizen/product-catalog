import db from '../../controllers/database'

import contactByEmail from './contactByEmail'
import processEmailsOnQueue from './processEmailsOnQueue'
import registrationAlerts from './registrationAlerts'

module.exports = () => {
    console.log('Email broadcast system job triggered...')
    let jobList = [{
        searchCriteria: { where: { notified: false } },
        processor: registrationAlerts,
        updateAction: { notified: true }
    }, {
        searchCriteria: { where: { contacted: false } },
        processor: contactByEmail,
        updateAction: { contacted: true }
    }]
    jobList.forEach((job) => {
        db.Registrations
            .findAll(job.searchCriteria)
            .then((pendingRecords) => {
                let pendingEmails = []
                pendingRecords.forEach((pendingRecord) => {
                    console.log(pendingRecord.dataValues)
                    pendingEmails.push(
                        job.processor(pendingRecord)
                    )
                })
                return processEmailsOnQueue(pendingEmails, job.updateAction, pendingRecords)
            })
            .then((message) => {
                console.log(message)
            })
            .catch((error) => {
                console.log(error)
            })
    })
}
