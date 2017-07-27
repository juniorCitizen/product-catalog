<template>
    <div class="hero-foot columns">
        <registration-link v-if="!isMobile && !alreadyRegistered"></registration-link>
        <div is="BlankSpacer"></div>
        <registration-link v-if="isMobile && !alreadyRegistered"></registration-link>
        <copy-right-notice></copy-right-notice>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import CopyRightNotice from './CopyRightNotice/CopyRightNotice.vue'
    import RegistrationLink from './RegistrationLink/RegistrationLink.vue'

    const BlankSpacer = {
        name: 'blank-spacer',
        template: `<div class="column"></div>`
    }

    const ImportantPlaceholder = {
        name: 'important-placeholder',
        template: `<div class="column">Important Placeholder</div>`
    }

    export default {
        name: 'page-footer',
        components: {
            BlankSpacer,
            CopyRightNotice,
            ImportantPlaceholder,
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

<style scoped>
    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
        color: #e1e1e1;
    }

    div.copyright-notice {
        margin-top: auto;
        font-size: 8px;
        margin-bottom: auto;
    }
</style>
