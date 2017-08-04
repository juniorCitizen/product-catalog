<template>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-info"
                    :disabled="!readyToSubmit||ajaxRequestPending"
                    @click="submitProductData(masterDataSet)">
                <template v-if="ajaxRequestPending">
                    <span class="icon">
                        <i class="fa fa-spinner fa-pulse"></i>
                    </span>
                    <span>資料傳輸中</span>
                </template>
                <template v-else>
                    <span>建立資料</span>
                </template>
            </button>
        </p>
        <p class="control">
            <button class="button is-info"
                    :disabled="ajaxRequestPending"
                    @click="$emit('clearForm')">
                清除表單
            </button>
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'submission',
        components: {},
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
            ...mapMutations({ setAjaxPendingState: 'setAjaxPendingState' }),
            ...mapActions({
                refreshAdminMenuContent: 'refreshAdminMenuContent',
                submitProductDataAction: 'submitProductData'
            }),
            submitProductData: function (masterDataSet) {
                this.submitProductDataAction(masterDataSet)
                    .then((apiResponse) => {
                        this.refreshAdminMenuContent()
                        alert(`產品【${masterDataSet.productCode}】建立完成`)
                        this.$emit('clearForm')
                        this.setAjaxPendingState(false)
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('產品資料建立失敗!!!')
                        this.$emit('clearForm')
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
