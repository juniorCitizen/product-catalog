<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title is-1 is-spaced">
                <strong class="content">
                    <i>Gentry Way Co. Ltd.</i>
                </strong>
            </h1>
            <h4 class="subtitle is-4">
                <i>A manufacturer of practical</i>
                <br>
                <i>rehabilitation & recreational</i>
                <br>
                <i>aluminium extrusion products</i>
                <br>
                <i>at afforadable pricing</i>
            </h4>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'homePage',
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

<style scoped></style>
