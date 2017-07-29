<template>
    <div class="hero-foot">
        <catalog-link v-if="isTouch && $route.name!=='products'"></catalog-link>
        <registration-link v-if="isTouch && $route.name!=='register'"></registration-link>
        <copy-right-notice></copy-right-notice>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import CatalogLink from './CatalogLink/CatalogLink.vue'
    import CopyRightNotice from './CopyRightNotice/CopyRightNotice.vue'
    import RegistrationLink from './RegistrationLink/RegistrationLink.vue'

    export default {
        name: 'page-footer',
        components: {
            CatalogLink,
            CopyRightNotice,
            RegistrationLink
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ alreadyRegistered: 'alreadyRegistered' })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
