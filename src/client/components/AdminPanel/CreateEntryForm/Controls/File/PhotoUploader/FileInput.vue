<template>
    <input type="file"
           accept="image/*"
           :multiple="multiple"
           @change="fileSelectionHandler" />
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'file-input',
        components: {},
        props: {
            value: FileList,
            multiple: Boolean
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            fileSelectionHandler(event) {
                this.$emit('input', event.target.files)
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

<style scoped>
     input[type="file"] { display: none; }
</style>
