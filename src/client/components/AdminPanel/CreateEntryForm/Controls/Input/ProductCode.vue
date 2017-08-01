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
            ...mapGetters({})
        },
        watch: {
            masterValue(masterValue) {
                if (masterValue === 'reset') {
                    this.productCode = ''
                }
            },
            productCode(updatedProductCode) {
                this.$emit('productCodeInput', updatedProductCode)
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
