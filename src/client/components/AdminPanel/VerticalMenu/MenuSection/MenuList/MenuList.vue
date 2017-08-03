<template>
    <ul class="menu-list">
        <template v-for="(section,arrayIndex) in rootMenu">
            <template v-if="!childrenHasSubmenu">
                <menu-list-item :title="section.title"
                                :arrayIndex="arrayIndex"
                                :section="null"
                                @selectEvent="loadSubmenu($event)"
                                :key="arrayIndex">
                </menu-list-item>
                <menu-list v-if="(section.submenu.length>0)&&section.active"
                           :menu="section.submenu"
                           :key="arrayIndex">
                </menu-list>
            </template>
            <template v-else>
                <menu-list-item :title="section.title"
                                :arrayIndex="arrayIndex"
                                :section="section"
                                @selectEvent="loadSubmenu($event)"
                                :key="arrayIndex">
                </menu-list-item>
            </template>
        </template>
    </ul>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MenuListItem from './MenuListItem/MenuListItem.vue'
    import MenuList from './MenuList.vue'

    export default {
        name: 'menu-list',
        components: {
            MenuList,
            MenuListItem
        },
        props: ['menu'],
        data: function () {
            return {
                rootMenu: null
            }
        },
        computed: {
            ...mapGetters({}),
            childrenHasSubmenu: function () {
                let checkState = false
                if (this.menu.length > 0) {
                    this.menu.forEach((menuItem) => {
                        if (menuItem.submenu.length > 0) {
                            checkState = true
                        }
                    })
                }
                return checkState
            }
        },
        watch: {
            menu: function (updatedMenu) {
                this.rootMenu = updatedMenu.slice()
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            loadSubmenu: function (targetIndex) {
                this.rootMenu[targetIndex].active = !this.rootMenu[targetIndex].active
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () {
            this.rootMenu = this.menu.slice()
        },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
