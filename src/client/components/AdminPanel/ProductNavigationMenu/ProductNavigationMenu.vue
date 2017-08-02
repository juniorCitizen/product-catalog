<template>
    <aside class="menu box">
        <template v-for="section in adminMenuRoot">
            <menu-section-label :key="section.title"
                                :title="section.title"
                                @mouseoverEvent="processMouseoverEvent"
                                @mouseoutEvent="processMouseoutEvent">
            </menu-section-label>
            <menu-list v-if="section.submenu&&(section.active||(!section.active&&section.hoveing))"
                       :key="section.title"
                       :submenu="section.submenu">
            </menu-list>
        </template>
    </aside>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MenuSectionLabel from './MenuSection/MenuSectionLabel.vue'
    import MenuList from './MenuSection/MenuList/MenuList.vue'

    export default {
        name: 'product-navigation-menu',
        components: {
            MenuSectionLabel,
            MenuList
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                adminMenuRoot: 'adminMenuRoot',
                productCatalogData: 'productCatalogData'
            })
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({ fetchProductCatalogData: 'fetchProductCatalogData' }),
            processMouseoverEvent: function () {
                return 1
            },
            processMouseoutEvent: function () {
                return 1
            }
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

<style scoped></style>
