<template>
    <div class="hero-body">
        <div class="container">
            <prod-series-selector @prodSerieChanged="recordProdSerieSelection($event)">
            </prod-series-selector>
            <div class="field">
                <p class="control">
                    <input class="input"
                           type="text"
                           name="prod-serie"
                           v-model="prodCode"
                           placeholder="編號">
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input"
                           type="text"
                           name="prod-name"
                           v-model="prodName"
                           placeholder="品名">
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <textarea class="textarea"
                              name="prod-desc"
                              v-model="prodDesc"
                              placeholder="敘述"></textarea>
                </p>
            </div>
            <image-uploader :prodCode="prodCode"
                            @imageUploaded="grabImageIdList($event)">
            </image-uploader>
            <image-display v-if="imageIdList.length>0"
                           :imageIdList="imageIdList"></image-display>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ImageDisplay from './ImageDisplay.vue'
    import ImageUploader from './ImageUploader.vue'
    import ProdSeriesSelector from './ProdSeriesSelector.vue'

    export default {
        name: 'adminPanel',
        components: {
            ImageDisplay,
            ImageUploader,
            ProdSeriesSelector
        },
        data: function () {
            return {
                selectedSerie: 0,
                prodCode: null,
                prodName: null,
                prodDesc: null,
                imageIdList: []
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            recordProdSerieSelection: function ($event) {
                this.selectedSerie = $event
            },
            grabImageIdList: function ($event) {
                this.imageIdList = $event
            }
        }
    }
</script>

<style scoped></style>
