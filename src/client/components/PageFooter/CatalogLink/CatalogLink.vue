<template>
    <div class="column has-text-centered is-paddingless">
        <router-link class="button is-fullwidth is-success"
                     :class="{'is-outlined': !isMobile}"
                     :style="fontStyle"
                     to="/products">
            CLICK TO SEE OUR PRODUCTS
        </router-link>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'catalog-link',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            fontStyle: function () {
                return this.isMobile ? { 'font-size': '80%' } : { 'font-size': '140%' }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    div.column {
        border: none;
    }

    .button {
        border: none;
        font-weight: bolder;
        font-style: italic;
        white-space: nowrap;
    }

    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
    }
</style>
