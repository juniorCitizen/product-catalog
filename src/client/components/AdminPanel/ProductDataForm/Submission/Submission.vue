<template>
    <div class="field is-grouped">
        <insert-button></insert-button>
        <reset-button></reset-button>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import InsertButton from './InsertButton.vue'
    import ResetButton from './ResetButton.vue'

    export default {
        name: 'submission',
        components: {
            InsertButton,
            ResetButton
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
