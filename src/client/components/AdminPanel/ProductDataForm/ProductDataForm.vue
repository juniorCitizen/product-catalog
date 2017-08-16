<template>
    <div class="box">
        <div class="box notification is-info has-text-centered">
            <span v-if="!editingState"
                  class="title is-4">新建產品資料</span>
            <span v-else
                  class="title is-4">修改【{{ dataInEditMode.itemCode }}】產品資料</span>
        </div>
        <submission :readyToSubmit="readyToSubmit"
                    :masterDataSet="masterDataSet"
                    @resetFormEvent="resetData">
        </submission>
        <product-series :masterValue="productSeriesId"
                        @productSeriesIdSelection="productSeriesId=$event"
                        @productTypeSelection="productType=$event">
        </product-series>
        <product-code :masterValue="productCode"
                      @productCodeInput="productCode=$event">
        </product-code>
        <product-name :masterValue="productName"
                      @productNameInput="productName=$event">
        </product-name>
        <product-description :masterValue="productDescription"
                             @productDescriptionInput="productDescription=$event">
        </product-description>
        <photo-uploader :config="primaryImageUploaderConfig"
                        :masterValue="primaryPhoto"
                        @photoListUpdated="primaryPhoto=$event"
                        @restorePhoto="restorePrimaryPhoto($event)"
                        @removePhoto="removePrimaryPhoto($event)">
        </photo-uploader>
        <photo-uploader :config="secondaryImagesUploaderConfig"
                        :masterValue="secondaryPhotos"
                        @photoListUpdated="secondaryPhotos=$event"
                        @restorePhoto="restoreSecondaryPhoto($event)"
                        @removePhoto="removeSecondaryPhoto($event)">
        </photo-uploader>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSeries from './Controls/Select/ProductSeries.vue'
    import ProductCode from './Controls/Input/ProductCode.vue'
    import ProductName from './Controls/Input/ProductName.vue'
    import ProductDescription from './Controls/Textarea/ProductDescription.vue'
    import Submission from './Controls/Button/Submission.vue'
    import PhotoUploader from './Controls/File/PhotoUploader/PhotoUploader.vue'

    export default {
        name: 'product-data-form',
        components: {
            ProductSeries,
            ProductCode,
            ProductName,
            ProductDescription,
            Submission,
            PhotoUploader
        },
        props: [],
        data: function () {
            return {
                primaryImageUploaderConfig: {
                    emptyText: '選擇主要產品圖片 (必選)',
                    loadedText: '重新選擇主要產品圖片',
                    multiple: false
                },
                secondaryImagesUploaderConfig: {
                    emptyText: '選擇次要產品圖片 (必選、兩張以上)',
                    loadedText: '重新選擇次要產品圖片',
                    multiple: true
                },
                productSeriesId: 0,
                productType: 'unselected',
                productCode: '',
                productName: '',
                productDescription: '',
                primaryPhoto: null,
                secondaryPhotos: null
            }
        },
        computed: {
            ...mapGetters({
                editingState: 'editingState',
                dataInEditMode: 'dataInEditMode'
            }),
            readyToSubmit: function () {
                return (
                    !(this.productSeriesId === 0) &&
                    !(this.productType === 'unselected') &&
                    !(this.productCode === '') &&
                    !(this.productName === '') &&
                    !((this.primaryPhoto === null) || (this.primaryPhoto === undefined) || (this.primaryPhoto[0].removed)) &&
                    !((this.secondaryPhotos === null) || (this.secondaryPhotos === undefined))
                )
            },
            masterDataSet: function () {
                return {
                    productSeriesId: this.productSeriesId,
                    productType: this.productType,
                    productCode: this.productCode,
                    productName: this.productName,
                    productDescription: this.productDescription,
                    primaryPhoto: this.primaryPhoto,
                    secondaryPhotos: this.secondaryPhotos
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            resetData: function () {
                this.productSeriesId = 'reset'
                this.productType = 'reset'
                this.productCode = 'reset'
                this.productName = 'reset'
                this.productDescription = 'reset'
                this.primaryPhoto = 'reset'
                this.secondaryPhotos = 'reset'
                setTimeout(() => {
                    this.productSeriesId = 0
                    this.productType = 'unselected'
                    this.productCode = ''
                    this.productName = ''
                    this.productDescription = ''
                    this.primaryPhoto = null
                    this.secondaryPhotos = null
                }, 5)
            },
            restorePrimaryPhoto: function (photoIndex) {
                this.primaryPhoto[photoIndex].removed = true
            },
            removePrimaryPhoto: function (photoIndex) {
                delete this.primaryPhoto[photoIndex].removed
            },
            restoreSecondaryPhoto: function (photoIndex) {
                this.secondaryPhoto[photoIndex].removed = true
            },
            removeSecondaryPhoto: function (photoIndex) {
                delete this.secondaryPhoto[photoIndex].removed
            }
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
