<template>
    <p class="control">
        <span class="select">
            <select v-model="selectedSerie"
                    @change="prodSerieSelected()">
                <option disabled
                        :value="0">
                    請選擇產品系列
                </option>
                <option v-for="prodSerie in prodSeries"
                        :value="prodSerie.id"
                        :key="prodSerie.id">
                    {{ prodSerie.reference }} 系列
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
                    this.selectedSerie = 0
                }
            }
        },
        data: function () {
            return {
                selectedSerie: 0
            }
        },
        computed: {
            ...mapGetters({
                prodSeries: 'prodSeries'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({
                getProdSeriesList: 'getProdSeriesList'
            }),
            prodSerieSelected: function () {
                this.$emit('prodSerieChanged', this.selectedSerie)
            }
        },
        created: function () {
            this.getProdSeriesList()
        }
    }
</script>

<style scoped></style>
