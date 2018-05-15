const api = require('./storyblokApi')

module.exports = {
  createSalesContactComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Sales Contact',
          schema: {
            name: {type: 'text'},
            email: {type: 'text'},
            mobile: {type: 'text'},
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createCertificationComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Certification',
          schema: {
            type: {type: 'text'},
            logo: {type: 'image'},
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createHostingCompanyComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Hosting Company',
          schema: {
            country: {type: 'text'},
            name: {type: 'text'},
            address: {type: 'text'},
            telephone: {type: 'text'},
            fax: {type: 'text'},
            certifications: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Certification'],
            },
            staffs: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Sales Contact'],
            },
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createContactPageComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Contact Page',
          schema: {
            contactList: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Hosting Company'],
            },
          },
          is_root: true,
          is_nestable: false,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createSubcategoryComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Subcategory',
          schema: {
            name: {type: 'text'},
            slug: {type: 'text'},
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createCategoryPageComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Category Page',
          schema: {
            name: {type: 'text'},
            description: {type: 'text'},
            photo: {type: 'image'},
            subcategories: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Subcategory Folder'],
            },
          },
          is_root: true,
          is_nestable: false,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createSpecificationDetailsComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Specification Details',
          schema: {
            weightCap: {type: 'text'},
            minHeight: {type: 'text'},
            maxHeight: {type: 'text'},
            weight: {type: 'text'},
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createSpecificationComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Specification',
          schema: {
            text: {type: 'textarea'},
            details: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Specification Details'],
            },
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createPhotoComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Photo',
          schema: {url: {type: 'image'}},
          is_root: false,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createProductPageComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Product Page',
          schema: {
            name: {type: 'text'},
            code: {type: 'text'},
            description: {type: 'textarea'},
            specification: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Specification'],
            },
            primaryPhoto: {type: 'image'},
            secondaryPhotos: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Photo'],
            },
          },
          is_root: true,
          is_nestable: false,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createCarouselSlideComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Carousel Slide',
          schema: {
            titleText: {type: 'textarea'},
            mobileTitleText: {type: 'textarea'},
            mottoText: {type: 'textarea'},
            imageUrl: {type: 'image'},
          },
          is_root: true,
          is_nestable: true,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  createHomePageComponent: () => {
    return api
      .createComponent({
        component: {
          name: 'Home Page',
          schema: {
            carouselSlides: {
              type: 'bloks',
              restrict_components: true,
              component_whitelist: ['Carousel Slide'],
            },
          },
          is_root: true,
          is_nestable: false,
        },
      })
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
}
