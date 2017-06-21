<template>
    <div>
        <div class="field">
            <input type="file"
                   name="prod-photo"
                   :disabled="(prodCode === null) || (prodCode === '')"
                   accept="image/*"
                   @change="uploadImage($event)"
                   multiple>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'image-uploader',
        components: {},
        props: ['prodCode'],
        data: function () {
            return {
                imageIdList: []
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
                    url: 'http://localhost/productCatalog/api/photoUpload',
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
