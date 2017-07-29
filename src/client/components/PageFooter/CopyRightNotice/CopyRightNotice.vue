<template>
    <div class="columns">
        <div class="column"
             :class="{'has-text-right': !isTouch, 'has-text-centered is-paddingless': isTouch}">
            <span>
                © Copyright {{ new Date().getFullYear() }} Gentry Way Co., Ltd.
            </span>
        </div>
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
        border: none;
    }

    span {
        border: none;
        font-size: 75%;
    }
</style>
