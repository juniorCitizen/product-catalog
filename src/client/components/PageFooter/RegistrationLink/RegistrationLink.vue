<template>
    <div class="column is-narrow is-paddingless"
         :class="{'has-text-left': !isMobile, 'has-text-centered': isMobile}">
        <router-link class="button is-fullwidth is-info"
                     :class="{'is-outlined': !isMobile}"
                     :style="fontStyle"
                     :disabled="ajaxRequestPending"
                     to="/contacts">
            Register for our product catalog
        </router-link>
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
            ...mapGetters({ ajaxRequestPending: 'ajaxRequestPending' }),
            fontStyle: function () {
                return this.isMobile
                    ? {
                        'font-size': '80%',
                        'text-transform': 'uppercase'
                    } : {
                        'font-size': '120%'
                    }
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
