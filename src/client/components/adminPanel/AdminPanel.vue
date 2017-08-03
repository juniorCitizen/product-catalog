<template>
    <div class="hero-body">
        <div class="container columns">
            <span class="column is-narrow">
                <vertical-menu></vertical-menu>
            </span>
            <span class="column">
                <create-entry-form></create-entry-form>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import VerticalMenu from './VerticalMenu/VerticalMenu.vue'
    import CreateEntryForm from './CreateEntryForm/CreateEntryForm.vue'

    export default {
        name: 'admin-panel',
        components: {
            CreateEntryForm,
            VerticalMenu
        },
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

<style scoped></style>
