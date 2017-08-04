<template>
    <img :src="src">
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
                src: null,
                apiUrlPrefix: `${this.$eVars.HOST}:${this.$eVars.PORT}/${this.$eVars.SYS_REF}/api/photos/streaming?photoId=`
            }
        },
        computed: {
            ...mapGetters({ editingState: 'editingState' })
        },
        watch: {
            photoFile: function (updatedPhotoFile) {
                if (!this.editingState || (this.editingState && this.revokeState)) {
                    let fileReader = new FileReader()
                    fileReader.onload = (event) => {
                        this.src = event.target.result
                    }
                    fileReader.readAsDataURL(updatedPhotoFile)
                } else {
                    this.src = `${this.apiUrlPrefix}${updatedPhotoFile.id}`
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

<style scoped></style>
