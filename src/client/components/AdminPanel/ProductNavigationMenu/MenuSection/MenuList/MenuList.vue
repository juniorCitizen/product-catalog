<template>
    <ul class="menu-list">
        <template v-for="menu in submenu">
            <menu-list-item :key="menu.title"
                            :title="menu.title">
            </menu-list-item>
            <menu-list v-if="menu.submenu"
                       :key="menu.title"
                       :submenu="menu.submenu">
            </menu-list>
        </template>
    </ul>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MenuListItem from './MenuListItem/MenuListItem.vue'
    import MenuList from './MenuList.vue'

    export default {
        name: 'menu-list',
        components: { MenuList, MenuListItem },
        props: ['submenu'],
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

<style scoped></style>
