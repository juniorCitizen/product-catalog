<template>
  <section v-editable="blok"
           id="contact-page"
           class="page-view">
    <div class="content">
      <contact-card v-for="company in companies"
                    :key="company._uid"
                    :company="company"/>
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
    this.deactivateInProgressOverlay()
    this.$storyblok.init()
    this.$storyblok.on('change', () => {
      location.reload(true)
    })
  },
  methods: {
    ...vuexMappers.mapMutations('inProgress', {
      deactivateInProgressOverlay: 'deactivateInProgressOverlay',
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
  height: 85vh;
  -ms-overflow-style: none;
  overflow-y: -moz-scrollbars-none;
  overflow-x: hidden;
}

.content::-webkit-scrollbar {
  width: 0 !important;
}
</style>
