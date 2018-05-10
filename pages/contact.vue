<template>
  <section v-editable="blok"
           id="contact-page"
           class="page-view">
    <div class="content">
      <contact-card v-for="(company,index) in companies"
                    :key="company._uid"
                    :company="company"
                    :certifications="certificationList[index]"/>
    </div>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import ContactCard from '~/components/ContactCard'

export default {
  name: 'ContactPage',
  components: {
    ContactCard,
  },
  data() {
    return {
      certificationList: [
        [
          {
            type: 'ISO 9001 Compliance',
            logoUrl: require('~/assets/iso9001.jpg'),
          },
        ],
        [
          {
            type: 'ISO 9001 Compliance',
            logoUrl: require('~/assets/iso9001.jpg'),
          },
          {
            type: 'ISO 13485 Compliance',
            logoUrl: require('~/assets/iso13485.jpg'),
          },
          {
            type: 'European Conformity',
            logoUrl: require('~/assets/ce.png'),
          },
        ],
      ],
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/contact-page', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      })
      .then(res => {
        return {
          blok: res.data.story.content,
          companies: res.data.story.content.contactList,
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted() {
    this.endInProgressAnimation()
    this.$storyblok.init()
    this.$storyblok.on('change', () => {
      location.reload(true)
    })
  },
  methods: {
    ...vuexMappers.mapMutations('inProgress', {
      endInProgressAnimation: 'endInProgressAnimation',
    }),
  },
}
</script>

<style scoped>
#contact-page {
  align-self: stretch;
  flex-grow: 1;
}

.content {
  -ms-overflow-style: none;
  overflow-y: -moz-scrollbars-none;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.content::-webkit-scrollbar {
  width: 0 !important;
}

@media screen and (min-height: 800px) {
  .content {
    height: 90vh;
  }
}

@media screen and (min-height: 768px) and (max-height: 800px) {
  .content {
    height: 88vh;
  }
}

@media screen and (max-height: 768px) {
  .content {
    height: 85vh;
  }
}
</style>
