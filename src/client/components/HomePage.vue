<template>
    <div class="hero-body"
         style="position: relative;">
        <div class="container has-text-centered">
            <h1 class="title is-1 is-spaced">
                <strong class="content">
                    <i>GENTRY WAY CO., LTD.</i>
                </strong>
            </h1>
            <h3 class="motto subtitle is-3">
                <i>Quality aluminium extrusion products</i>
                <br>
                <i>for medical, rehabilitation and recreation industries</i>
                <br>
                <i>at affordable pricing!!!</i>
                <br>
                <br>
                <h5 class="subtitle is-5">
                    <i>Manufactured in both Taiwan or China</i>
                </h5>
            </h3>
        </div>
        <router-link class="button is-primary is-primary is-outlined"
                     to="/products">
            <b>
                <i>CLICK TO SEE OUR PRODUCTS</i>
            </b>
        </router-link>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'home-page',
        components: {},
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        mounted: function () { }
    }
</script>

<style scoped>
    h1 {
        transform: rotate(-4deg) scale(1.2, 1.6) translate(0px, -20px);
        color: darkgreen;
    }

    .motto {
        transform: rotate(-4deg) translate(0px, 0px);
    }

    .button {
        position: absolute;
        bottom: 20px;
        width: 100%;
        border: 1px;
    }

    div.hero-body {
        animation: animate 1s both;
    }

    div.container {
        transform: translate(20px);
    }

    @keyframes animate {
        0% {
            transform: scale(0.6);
        }
        100% {
            transform: scale(0.8);
        }
    }
</style>
