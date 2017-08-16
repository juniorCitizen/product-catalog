<template>
    <img :src="src"
         :class="{'marked-for-removal':markedForRemoval}"
         @click="photoClickEvent">
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'photo',
        components: {},
        props: [
            'photoFile',
            'revokeState'
        ],
        data: function () {
            return {
                markedForRemoval: false,
                src: null,
                // apiUrlPrefix: `${this.$eVars.HOST}:${this.$eVars.PORT}/${this.$eVars.SYS_REF}/api/photos/streaming?photoId=`
                apiUrlPrefix: `${this.$eVars.HOST}/${this.$eVars.SYS_REF}/api/photos/streaming?photoId=`
            }
        },
        computed: {
            ...mapGetters({ editingState: 'editingState' })
        },
        watch: {
            photoFile: function (updatedPhotoFile) {
                // if (!this.editingState || (this.editingState && this.revokeState)) {
                if (updatedPhotoFile.id === undefined) { // 'id' property undefined means it's an uploaded item
                    let fileReader = new FileReader()
                    fileReader.onload = (event) => {
                        this.src = event.target.result
                    }
                    fileReader.readAsDataURL(updatedPhotoFile)
                } else { // 'id' property exists meaning it's an existing database stored photo
                    this.src = `${this.apiUrlPrefix}${updatedPhotoFile.id}`
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            photoClickEvent: function () {
                if (this.markedForRemoval) {
                    this.$emit('restorePhoto')
                    this.markedForRemoval = false
                } else {
                    this.$emit('removePhoto')
                    this.markedForRemoval = true
                }
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            if (!this.editingState || (this.editingState && this.revokeState)) {
                let fileReader = new FileReader()
                fileReader.onload = (event) => {
                    this.src = event.target.result
                }
                fileReader.readAsDataURL(this.photoFile)
            } else {
                this.src = `${this.apiUrlPrefix}${this.photoFile.id}`
            }
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped>
    img.marked-for-removal {
        opacity: 0.2;
        border: 1px solid red;
    }

    img:hover {
        transform: scale(1.1);
    }
</style>
