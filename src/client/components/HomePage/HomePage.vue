<template>
    <div class="hero-body">
        <div class="container is-fluid has-text-centered">
            <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical">
                    <div class="tile is-child">
                        test
                        <!-- <head-lines></head-lines> -->
                    </div>
                    <div class="tile is-child">
                        test
                        <!-- <subheadings></subheadings> -->
                    </div>
                    <div class="tile is-child">
                        test
                        <!-- <caption-text></caption-text> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'home-page',
        components: {},
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
