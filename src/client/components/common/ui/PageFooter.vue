<template>
    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
        <div class="columns">
            <div class="is-pulled-left column">
                Please
                <a href="http://localhost/contacts">register</a> for our full PDF catalog
            </div>
            <div class="is-pulled-right has-text-right column">
                © {{ new Date().getFullYear() }}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'pageFooter',
        components: {},
        data: () => {
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
    #page-footer-bar {
        border: 1px black solid;
        position: fixed;
        bottom: 0;
    }
</style>
