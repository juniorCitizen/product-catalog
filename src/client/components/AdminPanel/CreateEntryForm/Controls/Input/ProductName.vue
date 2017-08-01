<template>
    <div class="field">
        <div class="control">
            <input class="input"
                   type="text"
                   v-model.trim="productName"
                   placeholder="輸入產品名稱 (必填)">
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-name',
        components: {},
        props: ['masterValue'],
        data: function () {
            return {
                productName: ''
            }
        },
        computed: {
            ...mapGetters({})
        },
        watch: {
            masterValue(masterValue) {
                if (masterValue === 'reset') {
                    this.productName = ''
                }
            },
            productName(updatedProductName) {
                this.$emit('productNameInput', updatedProductName)
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
