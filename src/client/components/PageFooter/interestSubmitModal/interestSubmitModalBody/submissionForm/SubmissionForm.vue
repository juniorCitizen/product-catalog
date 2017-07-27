<template>
    <div class="column"
         style="padding-top: 0px;">
        <div class="field">
            <div class="control has-icons-left">
                <input class="input"
                       :class="{'is-danger':(!company)&&(attemptToSend)}"
                       type="text"
                       v-model="company"
                       :disabled="ajaxRequestPending"
                       placeholder="Company">
                <span class="icon is-left">
                    <i class="fa fa-building"></i>
                </span>
            </div>
            <p v-if="(!company)&&(attemptToSend)"
               class="help is-danger">Company name is required</p>
        </div>
        <div class="field">
            <div class="control has-icons-left">
                <input class="input"
                       :class="{'is-danger':(!name)&&(attemptToSend)}"
                       type="text"
                       v-model="name"
                       :disabled="ajaxRequestPending"
                       placeholder="Name">
                <span class="icon is-left">
                    <i class="fa fa-user"></i>
                </span>
            </div>
            <p v-if="(!name)&&(attemptToSend)"
               class="help is-danger">Your name is required</p>
        </div>
        <div class="field">
            <div class="control has-icons-left">
                <input class="input"
                       :class="{'is-danger':((!emailIsValid)||(!email))&&(attemptToSend)}"
                       type="email"
                       v-model="email"
                       :disabled="ajaxRequestPending"
                       placeholder="Email">
                <span class="icon is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <p v-if="(!emailIsValid)&&(attemptToSend)"
               class="help is-danger">This email address is invalid</p>
            <p v-if="(!email)&&(attemptToSend)"
               class="help is-danger">Your email is required</p>
        </div>
        <div class="field">
            <div class="control has-icons-left">
                <div class="select">
                    <select :disabled="ajaxRequestPending"
                            v-model="regionFilter"
                            @change="country='Country'">
                        <option v-for="region in regions"
                                :key="region"
                                v-bind:value="region">
                            {{ region }}
                        </option>
                    </select>
                </div>
                <span class="icon is-left">
                    <i class="fa fa-globe"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <div class="control has-icons-left">
                <div class="select"
                     :class="{'is-danger':(!country||(country==='Country'))&&(attemptToSend)}">
                    <select class="countries"
                            v-model="country"
                            :disabled="ajaxRequestPending">
                        <option selected
                                disabled>
                            Country
                        </option>
                        <option v-for="country in filteredCountryList"
                                :key="country.alpha3Code"
                                v-bind:value="country.name">
                            {{ country.name }} ({{ country.alpha3Code }}) - {{ country.region }}
                        </option>
                    </select>
                </div>
                <span class="icon is-left">
                    <img v-if="country!=='Country'"
                         class="flag-icon"
                         :src="flagUrl">
                </span>
                <p v-if="(!country||(country==='Country'))&&(attemptToSend)"
                   class="help is-danger">Please let us know where you are from</p>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <textarea class="textarea"
                          v-model="comments"
                          :disabled="ajaxRequestPending"
                          placeholder="Questions or additional comments">
                </textarea>
            </div>
        </div>
        <div class="field">
            <div class="control is-hidden">
                <input class="input"
                       type="text"
                       v-model="botPrevention"
                       placeholder="MUST BE FILLED"
                       required>
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-info"
                        :class="{'is-loading':attemptToSend && ajaxRequestPending}"
                        :disabled="ajaxRequestPending"
                        @click="userRegistration">Have Someone Contact Me</button>
            </div>
            <div class="control">
                <button class="button is-success"
                        :disabled="ajaxRequestPending"
                        @click="resetForm">Reset Form</button>
            </div>
            <p v-if="statusMessage!==null"
               class="help is-danger"
               :class="{'is-info':statusMessage==='Registration in progress...','is-danger':statusMessage==='Registration failure...'}">
                <b>{{ statusMessage }}</b>
            </p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'submission-form',
        components: {},
        props: [],
        data: function () {
            return {
                company: '',
                name: '',
                email: '',
                country: 'Country',
                comments: '',
                botPrevention: null,
                attemptToSend: false,
                regionFilter: 'All Regions',
                statusMessage: null
            }
        },
        watch: {
            country: function (newCountrySelection) {
                if (newCountrySelection === 'Country') {
                    return 'All Regions'
                } else {
                    this.regionFilter = this.filteredCountryList.filter((country) => {
                        return country.name === newCountrySelection
                    })[0].region
                }
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                alreadyRegistered: 'alreadyRegistered',
                registeredUserInfo: 'registeredUserInfo',
                countries: 'countries',
                regions: 'regions'
            }),
            filteredCountryList: function () {
                if (this.regionFilter === 'All Regions') {
                    return this.countries
                } else {
                    return this.countries.filter((country) => {
                        return country.region === this.regionFilter
                    })
                }
            },
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
                    ((this.country.length > 0) || (this.country !== 'Country'))
                )
            },
            flagUrl: function () {
                if (this.country === 'Country') {
                    return false
                } else {
                    return this.countries.filter((country) => {
                        return country.name === this.country
                    })[0].flag
                }
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
                this.country = 'Country'
                this.comments = ''
                this.botPrevention = null
            }
        },
        mounted: function () {
            if (this.alreadyRegistered) {
                this.company = this.registeredUserInfo.company
                this.name = this.registeredUserInfo.name
                this.email = this.registeredUserInfo.email
                this.country = this.registeredUserInfo.country
                this.comments = this.registeredUserInfo.comments
            }
        }
    }
</script>

<style scoped>
    img.flag-icon {
        width: 60%;
    }

    select.countries {
        height: 100%;
        animation: moveSelectText 0.01ms both;
    }

    @keyframes moveSelectText {
        0% {
            font-size: 100%;
        }
        100% {
            font-size: 60%;
        }
    }

    .button {
        font-weight: bold;
    }
</style>
