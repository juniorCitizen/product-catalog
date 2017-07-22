<template>
    <div id="page-footer"
         class="hero-foot">
        <div class="columns">
            <div v-if="!alreadyRegistered"
                 class="is-pulled-left column">
                <router-link to="/contacts"
                             :disabled="ajaxRequestPending">Register</router-link> to receive our PDF catalog
            </div>
            <div class="copy-right-notice is-pulled-right has-text-right column">
                © Copyright {{ new Date().getFullYear() }} Gentry Way Co., Ltd.
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'page-footer',
        components: {},
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                alreadyRegistered: 'alreadyRegistered',
                ajaxRequestPending: 'ajaxRequestPending'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
        color: #e1e1e1;
    }

    #page-footer {
        padding: 5px;
    }

    div.copy-right-notice {
        font-size: 8px;
    }
</style>
