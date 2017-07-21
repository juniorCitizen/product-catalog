<template>
    <div class="tile is-child is-parent is-vertical">
        <h6 class="subtitle is-6 box notification is-success">
            <b>REGISTER TO RECEIVE A PDF CATALOG BY EMAIL</b>
        </h6>
        <div class="field">
            <div class="control is-expanded">
                <input class="input"
                       :class="{'is-danger':(!company)&&(attemptToSend)}"
                       type="text"
                       v-model="company"
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
                       placeholder="Country">
            </div>
            <p v-if="(!country)&&(attemptToSend)"
               class="help is-danger">Please let us know where you are from</p>
        </div>
        <div class="field">
            <div class="control is-expanded">
                <textarea class="textarea"
                          v-model="comments"
                          placeholder="Questions or comments">
                </textarea>
            </div>
        </div>
        <div class="field">
            <div class="control is-expanded is-hidden">
                <input class="input"
                       type="text"
                       v-model="botPrevention"
                       placeholder="DO NOT ENTER ANYTHING HERE">
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-success"
                        @click="userRegistration">Register</button>
            </div>
            <div class="control">
                <button class="button is-success is-outlined"
                        @click="resetForm">Cancel</button>
            </div>
        </div>
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
                company: '',
                name: '',
                email: '',
                country: '',
                comments: '',
                botPrevention: '',
                attemptToSend: false
            }
        },
        computed: {
            ...mapGetters({}),
            emailIsValid: function () {
                if ((this.email === '') || (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
                    return true
                }
                return false
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            userRegistration: function () {
                this.attemptToSend = true
            },
            resetForm: function () {
                this.company = ''
                this.name = ''
                this.email = ''
                this.country = ''
                this.comments = ''
                this.botPrevention = ''
                this.attemptToSend = false
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
