<template>
    <a class="navbar-item">
        <span v-show="!isMobile"
              class="title is-4">
            <b>Gentry Way Co., Ltd.</b>
        </span>
    </a>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'company-title',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
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
        font-style: italic;
        margin-top: auto;
        margin-bottom: auto;
        cursor: default;
    }

    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
    }
</style>
