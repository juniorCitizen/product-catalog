<template>
    <footer id="page-footer"
            class="footer is-paddingless">
        <div class="container is-fluid">
            <div class="columns">
                <div v-if="!isMobile"
                     class="column">
                </div>
                <copyright-notice></copyright-notice>
            </div>
        </div>
    </footer>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import copyrightNotice from './copyrightNotice.vue'

    export default {
        name: 'footer-toolbar',
        components: { copyrightNotice },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({
                registerPageFooterHeight: 'registerPageFooterHeight'
            }),
            ...mapActions({}),
            updatePageFooterHeight: function () {
                this.registerPageFooterHeight(document.getElementById('page-footer').clientHeight)
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.updatePageFooterHeight()
        },
        beforeUpdate: function () { },
        updated: function () {
            this.updatePageFooterHeight()
        },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped>
    footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>
