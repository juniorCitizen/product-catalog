<template>
    <div class="box">
        <label class="field is-grouped"
               @click="setRevokeState">
            <div class="button is-info"
                 :disabled="ajaxRequestPending">
                <span v-if="files">{{ config.loadedText }}</span>
                <span v-else>{{ config.emptyText }}</span>
            </div>
            <file-input v-if="!editingState||(editingState&&revokeState)"
                        v-model="files"
                        :multiple="config.multiple"
                        :disabled="ajaxRequestPending">
            </file-input>
        </label>
        <div v-if="files"
             class="box">
            <image-display :imageList="files"
                           :revokeState="revokeState"></image-display>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import FileInput from './FileInput.vue'
    import ImageDisplay from './ImageDisplay.vue'

    export default {
        name: 'photo-uploader',
        components: {
            FileInput,
            ImageDisplay
        },
        props: [
            'config',
            'masterValue'
        ],
        data: function () {
            return {
                files: null,
                revokeState: false
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                editingState: 'editingState',
                dataInEditMode: 'dataInEditMode'
            })
        },
        watch: {
            masterValue: function (masterValue) {
                if (masterValue === 'reset') {
                    this.files = null
                }
            },
            files: function (updatedFileList) {
                if (this.files === null) {
                    this.$emit('photoListUpdated', null)
                } else if (this.config.multiple && (this.files.length === 1)) {
                    alert('必須上傳至少兩張產品相片')
                    this.files = null
                    this.$emit('photoListUpdated', null)
                } else if (this.files.length === 0) {
                    this.files = null
                    this.$emit('photoListUpdated', null)
                } else {
                    this.$emit('photoListUpdated', updatedFileList)
                }
            },
            dataInEditMode: function (newProductData) {
                if (newProductData === null) {
                    this.revokeState = false
                    this.files = null
                } else {
                    this.files = newProductData.photos.filter((photo) => {
                        return photo.primaryImage !== this.config.multiple
                    })
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            setRevokeState: function () {
                if (this.dataInEditMode) {
                    this.files = null
                    this.revokeState = true
                }
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
