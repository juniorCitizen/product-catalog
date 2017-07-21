<template>
    <div class="tile is-child is-parent is-vertical is-5">
        <div class="tile is-child">
            <h6 class="subtitle is-6 box notification is-success">
                <b>OUR CONTACT INFORMATION</b>
            </h6>
        </div>
        <div class="tile">
            <div class="tabs is-boxed">
                <ul>
                    <li v-for="(office, index) in offices"
                        :key="index"
                        :class="{'is-active': office.country===selectedCountry}">
                        <a @click="selectedCountry=office.country">
                            <b>{{ office.country }}</b>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tile is-parent is-vertical box">
            <div class="tile">
                <h6 class="title is-6 box notification is-success">
                    <b>{{ officeInView.companyName }}</b>
                </h6>
            </div>
            <br>
            <div class="row tile">
                <span class="heading-text tile is-3">Address</span>
                <span class="information-text tile">
                    {{ addressString }}
                </span>
            </div>
            <div class="row tile">
                <span class="heading-text tile is-3">Telephone</span>
                <span class="information-text tile">
                    {{ officeInView.telephone }}
                </span>
            </div>
            <div class="row tile">
                <span class="heading-text tile is-3">Fax</span>
                <span class="information-text tile">
                    {{ officeInView.fax }}
                </span>
            </div>
            <div class="row tile">
                <span class="heading-text tile is-3">Email</span>
                <span class="information-text tile">
                    <ul>
                        <li class="email"
                            v-for="(staffMember, index) in staff"
                            :key="index"
                            v-if="staffMember.country===officeInView.country">
                            <a :href="mailToLink(staffMember.email)">
                                <span class="name-text">{{ staffMember.name }}</span>
                                <b>
                                    <span>( {{ staffMember.email }} )</span>
                                </b>
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'office-info',
        components: {},
        props: ['offices', 'staff'],
        data: function () {
            return {
                selectedCountry: this.offices[0].country
            }
        },
        computed: {
            ...mapGetters({}),
            officeInView: function () {
                return this.offices.filter((office) => {
                    return office.country === this.selectedCountry
                })[0]
            },
            addressString: function () {
                if (this.officeInView.state === null) {
                    return `${this.officeInView.address}, ${this.officeInView.town}, ${this.officeInView.city}, ${this.officeInView.country}`
                } else {
                    return `${this.officeInView.address}, ${this.officeInView.town}, ${this.officeInView.city}, ${this.officeInView.state}, ${this.officeInView.country}`
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            mailToLink: function (email) {
                return `mailto:${email}`
            }
        }
    }
</script>

<style scoped>
    .title {
        text-transform: uppercase;
    }

    .tile {
        border: none;
    }

    .name-text {
        color: black;
    }

    li.email {
        margin-top: 0px;
        margin-bottom: 5px;
    }

    div.row {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .heading-text {
        margin-top: 0px;
    }

    .information-text {
        margin-top: 0px;
    }
</style>
