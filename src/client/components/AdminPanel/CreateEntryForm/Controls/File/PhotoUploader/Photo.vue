<template>
    <img :src="src">
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'photo',
        components: {},
        props: ['photoFile'],
        data: function () {
            return {
                src: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        watch: {
            photoFile(updatedPhotoFile) {
                let fileReader = new FileReader()
                fileReader.onload = (event) => {
                    this.src = event.target.result
                }
                fileReader.readAsDataURL(updatedPhotoFile)
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
            let fileReader = new FileReader()
            fileReader.onload = (event) => {
                this.src = event.target.result
            }
            fileReader.readAsDataURL(this.photoFile)
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
