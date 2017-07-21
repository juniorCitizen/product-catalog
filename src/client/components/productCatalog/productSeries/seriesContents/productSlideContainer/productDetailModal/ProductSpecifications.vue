<template>
    <article class="columns">
        <div class="column has-text-left">
            <b>ITEM CODE:&nbsp;&nbsp;</b>
            <b>{{ product.itemCode }}</b>
            <br>
            <b>NAME:&nbsp;&nbsp;</b>
            <b>{{ product.name }}</b>
            <br>
            <b>DESCRIPTIONS:</b>
            <p style="margin-left:30px;word-break:break-all;"
               v-html="product.description.text.replace(/\n/g,'<br>')">
            </p>
        </div>
    </article>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-specifications',
        components: {},
        props: ['product'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
