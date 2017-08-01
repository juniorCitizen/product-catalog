<template>
    <div class="hero-body">
        <div class="container">
            <div class="field is-grouped">
                <p v-if="readyToSubmit && !isExistingRecord"
                   class="control">
                    <button class="button is-primary"
                            @click="submitProdData">
                        建立 {{ prodCode }} 資料
                    </button>
                </p>
                <p v-if="readyToSubmit && isExistingRecord"
                   class="control">
                    <button class="button is-primary"
                            @click="submitProdData">
                        修改 {{ prodCode }} 資料
                    </button>
                </p>
                <p class="control">
                    <button class="button is-danger"
                            @click="clearForm(0)">
                        清除資料
                    </button>
                </p>
            </div>
            <div class="field is-grouped">
                <prod-series-selector :masterSelectedSerie="selectedSeries"
                                      @productSeriesSelectionChanged="recordProdSerieSelection($event)">
                </prod-series-selector>
                <p class="control">
                    <span class="select">
                        <select v-model="prodType">
                            <option value="unselected"
                                    disabled>
                                請選擇產品類別
                            </option>
                            <option value="product">產品</option>
                            <option value="accessory">配件</option>
                        </select>
                    </span>
                </p>
            </div>
            <prod-code-input :masterProdCode="prodCode"
                             :masterSelectedSerie="selectedSeries"
                             @itemCodeChanged="recordProdCodeInput($event)">
            </prod-code-input>
            <prod-name-input :masterProdName="prodName"
                             @prodNameChanged="prodName=$event">
            </prod-name-input>
            <prod-desc-text :masterProdDesc="prodDesc"
                            @prodDescChanged="prodDesc=$event">
            </prod-desc-text>
            <image-uploader :prodCode="prodCode"
                            :masterImageIdList="imageIdList"
                            @imageUploaded="grabImageIdList($event)">
            </image-uploader>
            <image-display v-if="imageIdList.length>0"
                           :imageIdList="imageIdList">
            </image-display>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import eVars from '../../../server/config/environment'

    import ImageDisplay from './ImageDisplay.vue'
    import ImageUploader from './ImageUploader.vue'
    import ProdCodeInput from './ProdCodeInput.vue'
    import ProdDescText from './ProdDescText.vue'
    import ProdNameInput from './ProdNameInput.vue'
    import ProdSeriesSelector from './ProdSeriesSelector.vue'

    export default {
        name: 'admin-panel',
        components: {
            ImageDisplay,
            ImageUploader,
            ProdCodeInput,
            ProdDescText,
            ProdNameInput,
            ProdSeriesSelector
        },
        data: function () {
            return {
                isExistingRecord: false,
                imageIdListUpdated: false,
                selectedSeries: 0,
                prodCode: null,
                prodType: 'unselected',
                prodName: null,
                prodDesc: null,
                fullProdData: [],
                imageIdList: []
            }
        },
        computed: {
            ...mapGetters({}),
            readyToSubmit: function () {
                if (
                    (this.selectedSeries === 0) ||
                    (this.prodCode === null) ||
                    (this.prodType === 'unselected') ||
                    (this.prodName === null) ||
                    (this.prodDesc === null) ||
                    (this.imageIdList.length === 0)
                ) {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({ fetchCompleteProductData: 'fetchCompleteProductData' }),
            recordProdSerieSelection: function ($event) {
                this.selectedSeries = $event
                this.clearForm($event)
                if (this.prodCode !== null) {
                    this.restoreExistingProductData()
                }
            },
            recordProdCodeInput: function ($event) {
                this.prodCode = $event
                if (this.selectedSeries !== 0) {
                    this.restoreExistingProductData()
                }
            },
            restoreExistingProductData: function () {
                let productsInSeries = this.fullProdData[this.selectedSeries - 1].products
                let existingRecord = productsInSeries.filter((product) => {
                    return product.itemCode === this.prodCode
                })
                if (existingRecord.length === 1) {
                    this.prodType = existingRecord[0].type
                    this.prodName = existingRecord[0].name
                    this.prodDesc = existingRecord[0].description.text
                    this.imageIdList = []
                    existingRecord[0].photos.forEach((photo) => {
                        this.imageIdList.push(photo.id)
                    })
                    this.isExistingRecord = true
                    this.imageIdListUpdated = false
                }
            },
            grabImageIdList: function ($event) {
                this.imageIdList = $event
                this.imageIdListUpdated = true
            },
            clearForm: function (series) {
                this.selectedSeries = series
                this.prodCode = null
                this.prodType = 'unselected'
                this.prodName = null
                this.prodDesc = null
                this.imageIdList = []
                this.isExistingRecord = false
                this.imageIdListUpdated = false
            },
            submitProdData: function () {
                let ajaxOptions = {
                    method: 'post',
                    url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`,
                    data: {
                        serieId: this.selectedSeries,
                        type: this.prodType,
                        itemCode: this.prodCode,
                        name: this.prodName,
                        text: this.prodDesc,
                        photoIds: this.imageIdList
                    }
                }
                axios(ajaxOptions)
                    .then((serverResponse) => {
                        alert('產品資料上傳成功')
                        this.clearForm(0)
                        this.isExistingRecord = false
                        this.imageIdListUpdated = false
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('系統錯誤，產品資料上傳失敗')
                        this.clearForm(0)
                        this.isExistingRecord = false
                        this.imageIdListUpdated = false
                    })
            }
        },
        created: function () {
            this.fetchCompleteProductData()
                .then((apiResponse) => {
                    this.fullProdData = apiResponse.data.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        mounted: function () {
            this.$emit('adminRouteActivated')
        }
    }
</script>

<style scoped></style>
