<template>
    <div id="page-footer"
         class="hero-foot">
        <div class="columns">
            <div class="is-pulled-left column">
                <router-link to="/contacts">Register</router-link> to receive our PDF catalog
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
        name: 'page-footer',
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
    #page-footer {
        padding: 5px;
    }
</style>
