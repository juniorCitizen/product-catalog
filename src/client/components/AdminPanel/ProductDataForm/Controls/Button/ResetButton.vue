<template>
    <p class="control">
        <button class="button is-danger"
                :disabled="ajaxRequestPending"
                @click="resetButtonPressed">
            <span v-if="!editingState">表單重設</span>
            <span v-else>取消修改</span>
        </button>
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'reset-button',
        components: {},
        props: [],
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
            ...mapMutations({ toggleProductEditMode: 'toggleProductEditMode' }),
            ...mapActions({}),
            resetButtonPressed: function () {
                if (this.editingState) {
                    this.toggleProductEditMode()
                } else {
                    this.$emit('resetFormEvent')
                }
            }
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
