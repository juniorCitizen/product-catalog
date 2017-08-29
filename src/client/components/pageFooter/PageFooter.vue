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

    import CopyrightNotice from './CopyrightNotice.vue'

    export default {
        name: 'page-footer',
        components: { CopyrightNotice },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
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
        z-index: 10;
    }
</style>
