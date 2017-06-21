<template>
    <div class="field">
        <p class="control">
            <span class="select">
                <select v-model="selectedSerie">
                    <option disabled
                            :value=0>
                        產品系列
                    </option>
                    <option v-for="prodSerie in prodSeries"
                            :value="prodSerie.id">
                        {{ prodSerie.reference }} 系列
                    </option>
                </select>
            </span>
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'prod-series-selector',
        components: {},
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
                ajaxProdSeries: 'ajaxProdSeries'
            })
        },
        created: function () {
            this.ajaxProdSeries()
        }
    }
</script>

<style scoped></style>
