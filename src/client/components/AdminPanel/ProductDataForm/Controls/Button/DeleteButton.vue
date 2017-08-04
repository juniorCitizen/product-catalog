<template>
    <p class="control">
        <button class="button is-danger"
                :disabled="ajaxRequestPending"
                @click="$emit('deleteRecordEvent')">
            刪除記錄
        </button>
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'delete-button',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ ajaxRequestPending: 'ajaxRequestPending' })
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
