<template>
    <div class="column is-narrow"
         :class="{'has-text-centered': isMobile}">
        © Copyright {{ new Date().getFullYear() }} Gentry Way Co., Ltd.
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'copy-right-notice',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    div {
        font-size: 8px;
        margin-bottom: 0px;
    }
</style>
