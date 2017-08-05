<template>
    <p class="control">
        <button class="button is-danger"
                :disabled="ajaxRequestPending"
                @click="deleteRecord">
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
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                dataInEditMode: 'dataInEditMode'
            })
        },
        watch: {},
        methods: {
            ...mapMutations({
                setAjaxPendingState: 'setAjaxPendingState',
                toggleProductEditMode: 'toggleProductEditMode'
            }),
            ...mapActions({
                deleteProductData: 'deleteProductData',
                refreshAdminMenuContent: 'refreshAdminMenuContent'
            }),
            deleteRecord: function () {
                let workingItemCode = this.dataInEditMode.itemCode
                this.deleteProductData(this.dataInEditMode.id)
                    .then(() => {
                        this.refreshAdminMenuContent()
                        alert(`資料【${workingItemCode}】刪除成功`)
                        this.toggleProductEditMode()
                        this.setAjaxPendingState(false)
                    })
                    .catch((error) => {
                        alert(`資料【${workingItemCode}】刪除失敗`)
                        console.log(error)
                        this.toggleProductEditMode(this.dataInEditMode)
                        this.setAjaxPendingState(false)
                    })
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
