<template>
    <a class="navbar-item"
       :href="clientAccessUrl">
        <img :src="logoUrl"
             alt="Gentry Way Co., Ltd.">
    </a>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'logo',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                clientAccessUrl: 'clientAccessUrl'
            }),
            logoUrl: function () {
                return `${this.clientAccessUrl}/assets/gentryLogoSmall.png`
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
    a {
        cursor: default;
    }

    a:hover {
        transform: scale(1.1);
    }

    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
    }
</style>
