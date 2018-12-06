<template>
    <div>
        <h1>Home Page</h1>
        <p>Hello!</p>

        <h2>Step Change Sample</h2>
        <Step/>
        <div>
            <b>session token:</b> {{token}}<br/><br/>
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
            }
        },
        components: {Step},
        mounted() {
            this.showSession()
        },
        methods: {
            showSession: async function () {
                this.token = sessionStorage.getItem('authToken') || "no token";
            }
        }
    };
</script>

<style scoped>

</style>
