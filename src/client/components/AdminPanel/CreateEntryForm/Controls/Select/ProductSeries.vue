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
                productSeriesData: 'productSeriesData'
            })
        },
        watch: {
            masterValue(masterValue) {
                if (masterValue === 'reset') {
                    this.selectedIndex = 0
                    this.productType = 'unselected'
                }
            },
            selectedIndex(updatedIndex) {
                this.$emit('productSeriesIdSelection', updatedIndex)
            },
            productType(updatedType) {
                this.$emit('productTypeSelection', updatedType)
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({ fetchProductSeriesData: 'fetchProductSeriesData' })
        },
        created: function () {
            this.fetchProductSeriesData()
        }
    }
</script>

<style scoped></style>
