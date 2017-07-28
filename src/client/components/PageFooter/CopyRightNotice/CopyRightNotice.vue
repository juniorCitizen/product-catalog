<template>
    <div class="column is-narrow"
         :class="{'has-text-right': !isMobile, 'has-text-centered is-paddingless': isMobile}">
        <span class="">
            © Copyright {{ new Date().getFullYear() }} Gentry Way Co., Ltd.
        </span>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'copy-right-notice',
        components: {},
        props: [],
        watch: {},
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),

        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    div {
        border: none;
    }

    span {
        border: none;
        font-size: 75%;
    }
</style>
