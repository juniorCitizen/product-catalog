<template>
    <p class="control">
        <button class="button is-success"
                :disabled="!readyToSubmit||dataIsPrestine.state||ajaxRequestPending"
                @click="$emit('updateRecordEvent')">
            更新記錄
        </button>
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'update-button',
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
                dataInEditMode: 'dataInEditMode'
            }),
            dataIsPrestine: function () {
                let productSeriesId = this.masterDataSet.productSeriesId === this.dataInEditMode.seriesId
                let productType = this.masterDataSet.productType === this.dataInEditMode.type
                let productCode = this.masterDataSet.productCode === this.dataInEditMode.itemCode
                let productName = this.masterDataSet.productName === this.dataInEditMode.name
                let productDescription = this.masterDataSet.productDescription === this.dataInEditMode.description.text
                let primaryPhoto = ((this.masterDataSet.primaryPhoto !== null) && (this.masterDataSet.primaryPhoto[0].id !== undefined))
                return {
                    state: productSeriesId && productType && productCode && productName && productDescription && primaryPhoto,
                    differences: {
                        productSeriesId: productSeriesId,
                        productType: productType,
                        productCode: productCode,
                        productName: productName,
                        productDescription: productDescription,
                        primaryPhoto: primaryPhoto
                    }
                }
            }
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
