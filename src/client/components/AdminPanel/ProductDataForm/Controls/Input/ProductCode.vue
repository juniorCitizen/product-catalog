<template>
    <div class="field">
        <div class="control">
            <input class="input"
                   type="text"
                   v-model.trim="productCode"
                   placeholder="輸入產品編號 (必填)">
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-code',
        components: {},
        props: ['masterValue'],
        data: function () {
            return {
                productCode: ''
            }
        },
        computed: {
            ...mapGetters({
                editingState: 'editingState',
                dataInEditMode: 'dataInEditMode'
            })
        },
        watch: {
            masterValue: function (newMasterValue) {
                if (newMasterValue === 'reset') {
                    this.productCode = ''
                }
            },
            productCode: function (updatedProductCode) {
                this.$emit('productCodeInput', updatedProductCode)
            },
            dataInEditMode: function (newProductData) {
                if (newProductData === null) {
                    this.productCode = ''
                } else {
                    this.productCode = newProductData.itemCode
                }
            }
        },
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
