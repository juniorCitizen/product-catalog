<template>
    <div class="hero-foot">
        <div class="columns">
            <template v-if="!alreadyRegistered">
                <div class="message-notice column is-pulled-left">
                    <router-link to="/contacts"
                                 :disabled="ajaxRequestPending">Register</router-link> to receive our PDF catalog
                </div>
            </template>
            <template v-else>
                <div class="message-notice column is-pulled-left">
                    {{ registeredUserInfo.name }}, welcome to our website!
                </div>
            </template>
            <interest-controls></interest-controls>
            <div class="copyright-notice column is-pulled-right has-text-right">
                © Copyright {{ new Date().getFullYear() }} Gentry Way Co., Ltd.
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import InterestControls from './InterestControls.vue'

    export default {
        name: 'page-footer',
        components: { InterestControls },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                alreadyRegistered: 'alreadyRegistered',
                ajaxRequestPending: 'ajaxRequestPending',
                registeredUserInfo: 'registeredUserInfo'
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

    div.message-notice {
        margin-top: auto;
        margin-bottom: auto;
    }

    div.copyright-notice {
        margin-top: auto;
        font-size: 8px;
        margin-bottom: auto;
    }
</style>
