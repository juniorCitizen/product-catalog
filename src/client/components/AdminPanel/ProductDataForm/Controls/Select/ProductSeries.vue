<template>
    <div class="field is-grouped">
        <div class="control">
            <span class="select">
                <select v-model="selectedIndex">
                    <option value="0"
                            disabled>
                        產品系列 (必選)
                    </option>
                    <option v-for="series in productSeriesData"
                            :value="series.id"
                            :key="series.id">
                        {{ series.reference }} 系列
                    </option>
                </select>
            </span>
        </div>
        <div class="control">
            <div class="select">
                <select v-model="productType">
                    <option value="unselected"
                            disabled>
                        產品類別 (必選)
                    </option>
                    <option value="product">產品</option>
                    <option value="accessory">配件</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-series',
        components: {},
        props: ['masterValue'],
        data: function () {
            return {
                selectedIndex: 0,
                productType: 'unselected'
            }
        },
        computed: {
            ...mapGetters({
                productSeriesData: 'productSeriesData',
                editingState: 'editingState',
                dataInEditMode: 'dataInEditMode'
            })
        },
        watch: {
            masterValue: function (masterValue) {
                if (masterValue === 'reset') {
                    this.selectedIndex = 0
                    this.productType = 'unselected'
                }
            },
            selectedIndex: function (updatedIndex) {
                this.$emit('productSeriesIdSelection', updatedIndex)
            },
            productType: function (updatedType) {
                this.$emit('productTypeSelection', updatedType)
            },
            dataInEditMode: function (newProductData) {
                if (newProductData === null) {
                    this.selectedIndex = 0
                    this.productType = 'unselected'
                } else {
                    this.selectedIndex = newProductData.seriesId
                    this.productType = newProductData.type
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
