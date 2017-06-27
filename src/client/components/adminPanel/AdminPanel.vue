<template>
    <div class="hero-body">
        <div class="container">
            <div class="field is-grouped">
                <p v-if="readyToSubmit"
                   class="control">
                    <button class="button is-primary"
                            @click="submitProdData">
                        建立 {{ prodCode }} 資料
                    </button>
                </p>
                <p class="control">
                    <button class="button is-danger"
                            @click="clearForm">
                        清除資料
                    </button>
                </p>
            </div>
            <div class="field is-grouped">
                <prod-series-selector :masterSelectedSerie="selectedSerie"
                                      @prodSerieChanged="recordProdSerieSelection($event)">
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
                             @prodCodeChanged="prodCode=$event"></prod-code-input>
            <prod-name-input :masterProdName="prodName"
                             @prodNameChanged="prodName=$event"></prod-name-input>
            <prod-desc-text :masterProdDesc="prodDesc"
                            @prodDescChanged="prodDesc=$event"></prod-desc-text>
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
        name: 'adminPanel',
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
                selectedSerie: 0,
                prodCode: null,
                prodType: 'unselected',
                prodName: null,
                prodDesc: null,
                imageIdList: []
            }
        },
        computed: {
            ...mapGetters({}),
            readyToSubmit: function () {
                if (
                    (this.selectedSerie === 0) ||
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
            ...mapActions({}),
            recordProdSerieSelection: function ($event) {
                this.selectedSerie = $event
            },
            grabImageIdList: function ($event) {
                this.imageIdList = $event
            },
            clearForm: function () {
                this.selectedSerie = 0
                this.prodCode = null
                this.prodType = 'unselected'
                this.prodName = null
                this.prodDesc = null
                this.imageIdList = []
            },
            submitProdData: function () {
                let ajaxOptions = {
                    method: 'post',
                    url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`,
                    data: {
                        serieId: this.selectedSerie,
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
                        this.clearForm()
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('系統錯誤，產品資料上傳失敗')
                        this.clearForm()
                    })
            }
        }
    }
</script>

<style scoped></style>
