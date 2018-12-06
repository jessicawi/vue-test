<template>
    <div>
        <h1>Home Page</h1>
        <p>Hello!</p>

        <h2>Step Change Sample</h2>
        <Step/>
        <button v-on:click="showSession" v-if="token===null">show session token</button>
        <div>
            <b>session token:</b> {{token}}<br/><br/>
            <b>sessionId:</b> {{sessionId}}
        </div>
    </div>
</template>

<script>
    import Step from "../components/Step";

    export default {
        name: 'homePage',
        data() {
            return {
                token: null,
                sessionId: null
            }
        },
        components: {Step},
        mounted() {
            this.showSession()
        },
        methods: {
            showSession: async function () {
                this.token = this.$session.has('authToken') ? this.$session.get('authToken') : 'no session token';
                this.sessionId = this.$session.get('session-id')
            }
        }
    };
</script>

<style scoped>

</style>
