const teardown = require('./libs/teardown')
const components = require('./libs/components')
const setupContactPage = require('./libs/setupContactPage')
const setupCatalogPage = require('./libs/setupCatalogPage')
const setupHomePage = require('./libs/setupHomePage')

/**
 * initialize storyblok space
 */
teardown
  .removeExistingStories()
  .then(teardown.removeExistingComponents)
  .then(teardown.removeExistingAssets)
  /**
   * setup contact information
   */
  .then(components.createSalesContactComponent)
  .then(components.createHostingCompanyComponent)
  .then(components.createCertificationComponent)
  .then(components.createContactPageComponent)
  .then(setupContactPage)
  /**
   * setup information
   */
  .then(components.createSubcategoryComponent)
  .then(components.createCategoryPageComponent)
  .then(components.createSpecificationComponent)
  .then(components.createSpecificationDetailsComponent)
  .then(components.createPhotoComponent)
  .then(components.createProductPageComponent)
  .then(setupCatalogPage)
  /**
   * setup carousel information
   */
  .then(components.createCarouselSlideComponent)
  .then(components.createHomePageComponent)
  .then(setupHomePage)
  .then(() => {
    console.log('Storyblok environment setup completed')
    return Promise.resolve()
  })
  .catch(error => {
    console.log(error)
    return process.exit(1)
  })
