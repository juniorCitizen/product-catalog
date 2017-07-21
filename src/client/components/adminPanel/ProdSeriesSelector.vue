<template>
    <p class="control">
        <span class="select">
            <select v-model="selectedProductSeriesIndex"
                    @change="productSeriesChanged()">
                <option disabled
                        :value="0">
                    請選擇產品系列
                </option>
                <option v-for="seriesItem in productSeries"
                        :value="seriesItem.id"
                        :key="seriesItem.id">
                    {{ seriesItem.reference }} 系列
                </option>
            </select>
        </span>
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'prod-series-selector',
        components: {},
        props: ['masterSelectedSerie'],
        watch: {
            masterSelectedSerie: function (updatedMasterSelectedSerie) {
                if (updatedMasterSelectedSerie === 0) {
                    this.selectedProductSeriesIndex = 0
                }
            }
        },
        data: function () {
            return {
                selectedProductSeriesIndex: 0
            }
        },
        computed: {
            ...mapGetters({
                productSeries: 'productSeries'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({
                fetchProductSeriesData: 'fetchProductSeriesData'
            }),
            productSeriesChanged: function () {
                this.$emit('productSeriesSelectionChanged', this.selectedProductSeriesIndex)
            }
        },
        created: function () {
            this.fetchProductSeriesData()
        }
    }
</script>

<style scoped></style>
