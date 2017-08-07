<template>
    <li>
        <a :class="{'is-active':isBeingEdited,'is-disabled':ajaxRequestPending}"
           @click="handleClickEvent">
            {{ productData.title }}
        </a>
    </li>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-menu-entry',
        components: {},
        props: ['productData'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                dataInEditMode: 'dataInEditMode',
                editingState: 'editingState'
            }),
            isBeingEdited: function () {
                if (this.dataInEditMode) {
                    return this.dataInEditMode.id === this.productData.data.id
                } else {
                    return false
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({ toggleProductEditMode: 'toggleProductEditMode' }),
            ...mapActions({}),
            handleClickEvent: function () {
                if (!this.isBeingEdited) {
                    this.toggleProductEditMode(this.productData.data)
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

<style scoped>
    a.is-disabled {
        pointer-events: none;
    }
</style>
