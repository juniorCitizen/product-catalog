<template>
    <p class="subtitle"
       :class="dynamicClass"
       @click="$router.push('/productCatalog/products')">
        {{ captionText }}
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'caption-text',
        components: {},
        props: [],
        data: function () {
            return {
                captionText: 'Products available from Taiwan or China'
            }
        },
        computed: {
            ...mapGetters({}),
            dynamicClass: function () {
                return {
                    'is-5': !this.isOnMobileDevice,
                    'is-6': this.isOnMobileDevice
                }
            }
        },
        watch: {},
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

<style scoped>
    p {
        margin-top: 100px;
        cursor: pointer;
    }

    p:hover {
        text-decoration: underline;
        color: green;
        font-weight: bold;
    }
</style>
