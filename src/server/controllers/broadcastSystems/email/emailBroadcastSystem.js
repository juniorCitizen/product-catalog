import cron from 'node-cron'
import Promise from 'bluebird'

import db from '../../database'
import registrationAlerts from './registrationAlerts'
import thankYouNotices from './thankYouNotices'

// constants for cron scheduling
// const PER_MINUTE = '0 * * * * *'
// const THIRTY_SECONDS = '*/30 * * * * *'
// const FIFTEEN_SECONDS = '*/15 * * * * *'
// const TEN_SECONDS = '*/10 * * * * *'
const FIVE_SECONDS = '*/5 * * * * *'
// const PER_SECOND = '* * * * * *'

// how often to broadcast messages
const BROADCAST_FREQUENCY = FIVE_SECONDS
class EmailBroadcastSystem {
    constructor(broadcastFrequency) {
        this.job = cron.schedule(broadcastFrequency, scheduledJob, false)
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.job.start()
            resolve('Email broadcast system initialized...')
        })
    }
}

const emailBroadcastSystem = new EmailBroadcastSystem(BROADCAST_FREQUENCY)

module.exports = emailBroadcastSystem

function scheduledJob() {
    console.log('Email broadcast system job triggered...')
    let jobList = [{
        searchCriteria: { where: { noticeIssued: false } },
        processor: registrationAlerts,
        updateAction: { noticeIssued: true }
    }, {
        searchCriteria: { where: { thankYouSent: false } },
        processor: thankYouNotices,
        updateAction: { thankYouSent: true }
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

function processEmailsOnQueue(emailQueue, updateAction, sourceRecords) {
    if (emailQueue.length > 0) {
        return Promise
            .each(emailQueue, (emailInfo, noticeIndex) => {
                // console.log(emailInfo)
                db.Registrations
                    .update(updateAction, {
                        where: {
                            id: sourceRecords[noticeIndex].id
                        }
                    })
            })
            .then(() => {
                return Promise.resolve(`${emailQueue.length} email(s) sent...`)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    } else {
        return Promise.resolve('no emails on queue...')
    }
}
