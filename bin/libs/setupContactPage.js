const Promise = require('bluebird')

const certificationLogoDirPath = require('./config').certificationLogoDirPath
const api = require('./storyblokApi')
const seedData = require('./seedData')
const hostingCompanies = seedData.getHostingCompanies()
const certifications = seedData.getCertifications()
const salesContacts = seedData.getSalesContacts()

module.exports = () => {
  // upload logo as storyblok assets and save urls
  return Promise.each(certifications, (certification, index) => {
    return api
      .uploadAsset(`${certificationLogoDirPath}/${certification.logoFileName}`)
      .then(url => {
        certifications[index].logo = url
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  })
    .then(() => {
      let contactPageInfo = {
        story: {
          name: 'Contact Page',
          slug: 'contact-page', // ignored by storyblok
          content: {
            component: 'Contact Page',
            contactList: [],
          },
          path: '/',
          is_startpage: true,
          parent_id: '',
        },
      }
      let contactFolderInfo = {
        story: {
          name: 'Contact Folder',
          slug: contactPageInfo.story.slug, // used as start page slug (storyblok behavior)
          is_folder: true,
          default_root: 'Contact Page',
          parent_id: 0,
        },
      }
      let contactList = contactPageInfo.story.content.contactList
      return Promise.each(hostingCompanies, (company, index) => {
        contactList.push({
          component: 'Hosting Company',
          name: company.name,
          address: company.address,
          telephone: company.telephone,
          fax: company.fax,
          country: company.country,
          certifications: [],
          staffs: [],
        })
        let certificationList = certifications.filter(certification => {
          return certification.companyName === company.name
        })
        let staffList = salesContacts.filter(contact => {
          return contact.companyName === company.name
        })
        certificationList.forEach(certification => {
          contactList[index].certifications.push({
            component: 'Certification',
            type: certification.type,
            logo: certification.logo,
          })
        })
        staffList.forEach(staff => {
          contactList[index].staffs.push({
            component: 'Sales Contact',
            name: staff.name || '',
            email: staff.email || '',
            mobile: staff.mobile || '',
          })
        })
      })
        .then(() => {
          return api.createStory(contactFolderInfo)
        })
        .then(contactFolder => {
          contactPageInfo.story.parent_id = contactFolder.id
          return api.createStory(contactPageInfo)
        })
        .then(contactPage => {
          console.log('contact folder setup completed')
          return Promise.resolve(contactPage)
        })
        .catch(error => Promise.reject(error))
    })
    .catch(error => Promise.reject(error))
}
