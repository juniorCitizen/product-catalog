<template>
    <div class="field">
        <div class="control">
            <textarea class="textarea"
                      v-model.trim="productDescription"
                      placeholder="輸入產品敘述">
            </textarea>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-description',
        components: {},
        props: ['masterValue'],
        data: function () {
            return {
                productDescription: ''
            }
        },
        computed: {
            ...mapGetters({
                editingState: 'editingState',
                dataInEditMode: 'dataInEditMode'
            })
        },
        watch: {
            masterValue: function (masterValue) {
                if (masterValue === 'reset') {
                    this.productDescription = ''
                }
            },
            productDescription: function (updatedProductDescription) {
                this.$emit('productDescriptionInput', updatedProductDescription)
            },
            dataInEditMode: function (newProductData) {
                if (newProductData === null) {
                    this.productDescription = ''
                } else {
                    this.productDescription = newProductData.description.text
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
