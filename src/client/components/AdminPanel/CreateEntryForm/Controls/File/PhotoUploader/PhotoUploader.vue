<template>
    <div class="box">
        <label class="field is-grouped">
            <div class="button is-info">
                <span v-if="files">{{ config.loadedText }}</span>
                <span v-else>{{ config.emptyText }}</span>
            </div>
            <file-input v-model="files"
                        :multiple="config.multiple">
            </file-input>
        </label>
        <div v-if="files"
             class="box">
            <image-display :imageList="files"></image-display>
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
                files: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        watch: {
            masterValue(masterValue) {
                if (masterValue === 'reset') {
                    this.files = null
                }
            },
            files: function (updatedFileList) {
                if (this.files === null) {
                    this.$emit('photoListUpdated', null)
                } else if (this.files.length === 0) {
                    this.files = null
                    this.$emit('photoListUpdated', null)
                } else {
                    this.$emit('photoListUpdated', updatedFileList)
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
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
