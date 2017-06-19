<template>
    <div class="hero-body">
        <div class="container">
            <div class="field">
                <p class="control">
                    <span class="select">
                        <select>
                            <option disabled
                                    value="">
                                產品系列
                            </option>
                            <option>With options</option>
                            <option>With options</option>
                            <option>With options</option>
                            <option>With options</option>
                            <option>With options</option>
                            <option>With options</option>
                        </select>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input"
                           type="text"
                           placeholder="編號">
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <input class="input"
                           type="text"
                           placeholder="品名">
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <textarea class="textarea"
                              placeholder="敘述"></textarea>
                </p>
            </div>
            <div class="field">
                <input type="file">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'adminPanel',
        components: {},
        data: () => {
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
