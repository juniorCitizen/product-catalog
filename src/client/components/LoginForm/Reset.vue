<template>
    <div class="control">
        <button class="button is-danger"
                @click="$emit('clearLoginFormEvent')"
                :disabled="dataSubmissionInProgress">
            <span>清除表單</span>
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'reset',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                dataSubmissionInProgress: 'dataSubmissionInProgress'
            })
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
