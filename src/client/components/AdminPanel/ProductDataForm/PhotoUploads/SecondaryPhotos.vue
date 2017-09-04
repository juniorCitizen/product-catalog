<template>
    <div class="field">
        <div class="file has-name is-fullwidth">
            <label class="file-label">
                <input class="file-input"
                       type="file"
                       accept="image/*"
                       multiple="true"
                       id="secondary-photos"
                       @change="handleUpload($event)">
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fa fa-upload"></i>
                    </span>
                    <span class="file-label">
                        {{captions.fileLabel}}
                    </span>
                </span>
                <template v-if="secondaryPhotos===null">
                    <span class="file-name">
                        {{captions.fileName}}
                    </span>
                </template>
                <template v-else>
                    <span class="select is-multiple is-fullwidth">
                        <select multiple
                                size="(secondaryPhotos.length<=5)?secondaryPhotos.length:5">
                            <option v-for="index in secondaryPhotos.length"
                                    :key="secondaryPhotos[index-1].name"
                                    @click="secondaryPhotoSelection(index-1)">
                                <template v-if="ignoredPhotos[index-1]">
                                    ({{index}}) {{secondaryPhotos[index-1].name}} (取消)
                                </template>
                                <template v-else>
                                    ({{index}}) {{secondaryPhotos[index-1].name}}
                                </template>
                            </option>
                        </select>
                    </span>
                </template>
            </label>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'secondary-photos',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                secondaryPhotos: 'productData/form/secondaryPhotos',
                ignoredPhotos: 'productData/form/ignoredPhotos',
                includedCount: 'productData/form/includedCount'
            }),
            captions: function () {
                if (this.secondaryPhotos === null) {
                    return {
                        fileLabel: '選擇次要相片',
                        fileName: '尚未選定'
                    }
                } else {
                    return {
                        fileLabel: '重新選擇次要相片'
                    }
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({
                register: 'productData/form/register',
                ignorePhoto: 'productData/form/ignore',
                includePhoto: 'productData/form/include'
            }),
            ...mapActions({}),
            handleUpload: function (event) {
                if (event.target.files.length !== 0) {
                    if ((event.target.files.length < 2) || (event.target.files.length > 15)) {
                        alert('相片上傳張數必須控制在 2 ~ 15 之內')
                    } else {
                        this.register({
                            name: 'secondaryPhotos',
                            value: event.target.files
                        })
                        this.caption = '重新選擇產品次要相片'
                    }
                }
            },
            secondaryPhotoSelection: function (photoIndex) {
                if (this.ignoredPhotos[photoIndex]) {
                    this.includePhoto(photoIndex)
                } else {
                    this.ignorePhoto(photoIndex)
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
