<template>
    <div class="column is-narrow"
         :class="{'has-text-centered is-marginless is-paddingless': isMobile}"
         :style="margins">
        <router-link to="/contacts"
                     :class="{'is-marginless is-paddingless': isMobile}"
                     :disabled="ajaxRequestPending">
            <b>REGISTER</b>
        </router-link> to receive our PDF catalog
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'registration-link',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ ajaxRequestPending: 'ajaxRequestPending' })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
