<template>
    <p class="subtitle is-5">
        {{ captionText }}
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'caption-text',
        components: {},
        props: [],
        data: function () {
            return {
                captionText: 'Products available from Taiwan or China'
            }
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
    p {
        margin-top: 100px;
    }
</style>
