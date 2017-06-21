<template>
    <div class="hero-body">
        <div class="container">
            <prod-series-selector></prod-series-selector>
            <div class="field">
                <p class="control">
                    <input class="input"
                           type="text"
                           placeholder="編號">
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input"
                           type="text"
                           placeholder="品名">
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <textarea class="textarea"
                              placeholder="敘述"></textarea>
                </p>
            </div>
            <div class="field">
                <input type="file">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProdSeriesSelector from './ProdSeriesSelector.vue'

    export default {
        name: 'adminPanel',
        components: {
            ProdSeriesSelector
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
