<template>
    <div class="tile is-child is-7 is-parent is-vertical">
        <h6 class="subtitle box notification is-success">
            <b v-if="!alreadyRegistered">REGISTER TO RECEIVE A PDF CATALOG BY EMAIL</b>
            <b v-else>
                <div>REGISTRATION COMPLETED. THANK YOU!</div>
                <br>
                <br>
                <div>YOUR PDF CATALOG WILL BE DELIVERED TO YOU SHORTLY</div>
                <br>
                <br>
                <router-link to="/products">
                    CONTINUE BROWSING OUR PRODUCT CATALOG
                </router-link>
            </b>
        </h6>
        <template v-if="!alreadyRegistered">
            <div class="field">
                <div class="control is-expanded">
                    <input class="input"
                           :class="{'is-danger':(!company)&&(attemptToSend)}"
                           type="text"
                           v-model="company"
                           :disabled="ajaxRequestPending"
                           placeholder="Company">
                </div>
                <p v-if="(!company)&&(attemptToSend)"
                   class="help is-danger">Company name is required</p>
            </div>
            <div class="field">
                <div class="control is-expanded">
                    <input class="input"
                           :class="{'is-danger':(!name)&&(attemptToSend)}"
                           type="text"
                           v-model="name"
                           :disabled="ajaxRequestPending"
                           placeholder="Name">
                </div>
                <p v-if="(!name)&&(attemptToSend)"
                   class="help is-danger">Your name is required</p>
            </div>
            <div class="field">
                <div class="control is-expanded">
                    <input class="input"
                           :class="{'is-danger':((!emailIsValid)||(!email))&&(attemptToSend)}"
                           type="email"
                           v-model="email"
                           :disabled="ajaxRequestPending"
                           placeholder="Email">
                </div>
                <p v-if="(!emailIsValid)&&(attemptToSend)"
                   class="help is-danger">This email address is invalid</p>
                <p v-if="(!email)&&(attemptToSend)"
                   class="help is-danger">Your email is required</p>
            </div>
            <div class="field">
                <div class="control is-expanded">
                    <input class="input"
                           :class="{'is-danger':(!country)&&(attemptToSend)}"
                           type="text"
                           v-model="country"
                           :disabled="ajaxRequestPending"
                           placeholder="Country">
                </div>
                <p v-if="(!country)&&(attemptToSend)"
                   class="help is-danger">Please let us know where you are from</p>
            </div>
            <div class="field">
                <div class="control is-expanded">
                    <textarea class="textarea"
                              v-model="comments"
                              :disabled="ajaxRequestPending"
                              placeholder="Questions or comments">
                    </textarea>
                </div>
            </div>
            <div class="field">
                <div class="control is-expanded is-hidden">
                    <input class="input"
                           type="text"
                           v-model="botPrevention"
                           :disabled="ajaxRequestPending"
                           placeholder="DO NOT ENTER ANYTHING HERE">
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-success"
                            :class="{'is-loading':attemptToSend && ajaxRequestPending}"
                            :disabled="ajaxRequestPending"
                            @click="userRegistration">Register</button>
                </div>
                <div class="control">
                    <button class="button is-success is-outlined"
                            :disabled="ajaxRequestPending"
                            @click="resetForm">Cancel</button>
                </div>
                <p v-if="ajaxRequestPending"
                   class="help is-danger">
                    <b>Registration in progress...</b>
                </p>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'registration-form',
        components: {},
        props: [],
        data: function () {
            return {
                apiUrl: `${this.$eVars.HOST}:${this.$eVars.PORT}/${this.$eVars.SYS_REF}/api/users`,
                company: 'Gentry Way Co., Ltd.',
                name: 'David Tsai',
                email: 'david.tsai@gentry-way.com.tw',
                country: 'Taiwan',
                comments: 'I have some questions',
                botPrevention: null,
                attemptToSend: false
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                alreadyRegistered: 'alreadyRegistered'
            }),
            emailIsValid: function () {
                if ((this.email === '') || (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
                    return true
                }
                return false
            },
            readyToSubmit: function () {
                return (
                    (this.company.length > 0) &&
                    (this.name.length > 0) &&
                    (this.email.length > 0) &&
                    (this.emailIsValid) &&
                    (this.country.length > 0)
                )
            }
        },
        methods: {
            ...mapMutations({
                markRegisteredSession: 'markRegisteredSession',
                setAjaxPendingState: 'setAjaxPendingState'
            }),
            ...mapActions({}),
            resetForm: function () {
                this.attemptToSend = false
                this.company = ''
                this.name = ''
                this.email = ''
                this.country = ''
                this.comments = ''
                this.botPrevention = null
            },
            userRegistration: function () {
                this.attemptToSend = true
                if ((this.readyToSubmit) && (this.botPrevention === null)) {
                    let submitOptions = {
                        method: 'post',
                        url: this.apiUrl,
                        data: {
                            company: this.company,
                            name: this.name,
                            email: this.email,
                            country: this.country,
                            comments: this.comments.length === 0 ? null : this.comments,
                            botPrevention: this.botPrevention
                        }
                    }
                    this.setAjaxPendingState(true)
                    this.$axios(submitOptions)
                        .then((apiResponse) => {
                            this.markRegisteredSession()
                            this.attemptToSend = false
                            this.resetForm()
                            this.setAjaxPendingState(false)
                        })
                        .catch((error) => {
                            this.attemptToSend = false
                            console.log(error)
                            this.setAjaxPendingState(false)
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .tile {
        border: none;
    }

    .button {
        font-weight: bold;
    }
</style>
