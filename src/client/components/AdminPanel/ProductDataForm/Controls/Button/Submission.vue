<template>
    <div class="field is-grouped">
        <template v-if="!editingState">
            <insert-button :masterDataSet="masterDataSet"
                           :readyToSubmit="readyToSubmit"
                           @resetFormEvent="$emit('resetFormEvent')">
            </insert-button>
        </template>
        <template v-else>
            <update-button :masterDataSet="masterDataSet"
                           :readyToSubmit="readyToSubmit">
            </update-button>
            <delete-button></delete-button>
        </template>
        <reset-button @resetFormEvent="$emit('resetFormEvent')"></reset-button>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import InsertButton from './InsertButton.vue'
    import DeleteButton from './DeleteButton.vue'
    import UpdateButton from './UpdateButton.vue'
    import ResetButton from './ResetButton.vue'

    export default {
        name: 'submission',
        components: {
            InsertButton,
            UpdateButton,
            DeleteButton,
            ResetButton
        },
        props: [
            'masterDataSet',
            'readyToSubmit'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                editingState: 'editingState'
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
