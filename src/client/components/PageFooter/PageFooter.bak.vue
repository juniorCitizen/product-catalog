<template>
    <div class="hero-foot">
        <div class="columns">
            <template v-if="!alreadyRegistered">
                <div class="message-notice column is-narrow is-pulled-left">
                    <router-link to="/contacts"
                                 :disabled="ajaxRequestPending">
                        Register
                    </router-link> to receive our PDF catalog
                </div>
            </template>
            <template v-else>
                <div class="message-notice column is-narrow is-pulled-left">
                    {{ registeredUserInfo.name }}, welcome to our website!
                </div>
            </template>
            <interest-controls @submitInterestEventTriggered="activateInterestSubmitModal"></interest-controls>
            <div class="copyright-notice column is-narrow is-pulled-right has-text-right">
                © Copyright {{ new Date().getFullYear() }} Gentry Way Co., Ltd.
            </div>
        </div>
        <interest-submit-modal :isActive="interestSubmitModalActivated"
                               @closeModal="interestSubmitModalActivated=false"></interest-submit-modal>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import InterestControls from './InterestControls.vue'
    import InterestSubmitModal from './interestSubmitModal/InterestSubmitModal.vue'

    export default {
        name: 'page-footer',
        components: {
            InterestControls,
            InterestSubmitModal
        },
        data: function () {
            return {
                interestSubmitModalActivated: false
            }
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
            ...mapActions({}),
            activateInterestSubmitModal: function () {
                this.interestSubmitModalActivated = true
            }
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
</style>
