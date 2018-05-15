const Promise = require('bluebird')

const api = require('./storyblokApi')
const seedData = require('./seedData').getCarouselSlides()

module.exports = () => {
  let homeFolderInfo = {
    story: {
      name: 'Home Folder',
      slug: 'home-page', // used as start page slug (storyblok behavior)
      is_folder: true,
      default_root: 'Home Page',
      parent_id: 0,
    },
  }
  let homePageInfo = {
    story: {
      name: 'Home Page',
      slug: homeFolderInfo.story.slug, // ignored by storyblok
      content: {
        component: 'Home Page',
        carouselSlides: [],
      },
      path: '/',
      is_startpage: true,
      parent_id: '',
    },
  }
  let carouselSlides = homePageInfo.story.content.carouselSlides
  return Promise.each(seedData, slide => {
    return api
      .uploadAsset(slide.imagePath)
      .then(url => {
        carouselSlides.push({
          component: 'Carousel Slide',
          imageUrl: url,
          mottoText: slide.mottoText,
          titleText: slide.titleText,
          mobileTitleText: slide.mobileTitleText,
        })
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  })
    .then(() => {
      return api.createStory(homeFolderInfo)
    })
    .then(homeFolder => {
      homePageInfo.story.parent_id = homeFolder.id
      return api.createStory(homePageInfo)
    })
    .then(homePage => {
      console.log('home folder setup completed')
      return Promise.resolve(homePage)
    })
    .catch(error => Promise.reject(error))
}
