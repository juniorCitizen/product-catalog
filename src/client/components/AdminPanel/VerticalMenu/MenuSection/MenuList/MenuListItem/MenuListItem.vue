<template>
    <li>
        <a @click="issueClickEvent">
            {{ title }}
        </a>
        <ul v-if="displaySubmenu">
            <li v-for="menuEntry in fullMenuObject.submenu"
                :key="menuEntry.title">
                <a>{{menuEntry.title}}</a>
            </li>
        </ul>
    </li>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'menu-list-item',
        components: {},
        props: [
            'title',
            'arrayIndex',
            'section'
        ],
        data: function () {
            return {
                fullMenuObject: null
            }
        },
        computed: {
            ...mapGetters({}),
            displaySubmenu: function () {
                return (
                    (this.fullMenuObject !== null) &&
                    (this.fullMenuObject.active) &&
                    (this.fullMenuObject.submenu.length > 0)
                )
            }
        },
        watch: {
            section: function (updatedSection) {
                this.fullMenuObject = updatedSection
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            issueClickEvent: function () {
                this.$emit('selectEvent', this.arrayIndex)
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () {
            if (this.section !== null) {
                this.fullMenuObject = this.section
            }
        },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
