<template>
    <div class="field">
        <label class="label">上傳產品相關相片</label>
        <input v-if="resetSwitch===null"
               type="file"
               name="prod-photo"
               :disabled="(prodCode === null) || (prodCode === '')"
               accept="image/*"
               @change="uploadImage($event)"
               multiple>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'image-uploader',
        components: {},
        props: [
            'prodCode',
            'masterImageIdList'
        ],
        watch: {
            masterImageIdList: function (updatedMasterImageIdList) {
                if (updatedMasterImageIdList.length === 0) {
                    this.resetSwitch = 'reset'
                    setTimeout(() => {
                        this.resetSwitch = null
                        this.imageIdList = []
                    }, 1)
                }
            }
        },
        data: function () {
            return {
                imageIdList: [],
                resetSwitch: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            uploadImage: function ($event) {
                this.imageIdList = []
                let files = $event.target.files
                let uploadedImgData = new FormData()
                for (let counter = 0; counter < files.length; counter++) {
                    uploadedImgData.append('prod-photo', files[counter])
                }
                let ajexOptions = {
                    method: 'post',
                    url: 'http://localhost/productCatalog/api/photos',
                    data: uploadedImgData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
                axios(ajexOptions)
                    .then((response) => {
                        response.data.data.map((record) => {
                            this.imageIdList.push(record.id)
                        })
                        this.$emit('imageUploaded', this.imageIdList)
                    }).catch((error) => {
                        this.imageIdList = []
                        alert(error) // catch your error
                    })
            }
        }
    }
</script>

<style scoped></style>
