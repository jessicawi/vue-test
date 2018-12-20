<template>
    <div>
        <!--<Step/>-->
        <div>
            <b>session token:</b> {{token}}<br/><br/>{{userType}}<br/><br/>
            <div v-for="object in list" :key="object.UserIDSession">
                {{object.UserIDSession}}
            </div>
            <h4>USER MENU</h4>
            <div style="height: 100px;overflow-y: scroll;width:80%;margin: auto;border:1px solid;">{{usermenu}}</div>
        </div>
    </div>
</template>

<script>
    import Step from "../components/Step";
    import DataSource from "../data/datasource";

    export default {
        name: 'homePage',
        data() {
            return {
                token: null,
                userType: null,
                list: [],
                results: "",
                usermenu: "",
            }
        },
        components: {Step},
        async mounted() {
            this.showSession()
            // user menu
            const isParent = sessionStorage.getItem('userTypeSession');
            if (isParent !== "parent") {
                this.results = response;

                // window.location.replace("/");
            }
            let response =  await DataSource.shared.getUserMenu();
            this.list = response.Table;
            console.log(response);
            this.usermenu = response;
            //login text

            const isLogin = sessionStorage.getItem('authToken');
            if (isLogin && isLogin !== "null") {
                this.results = `You already logged in`;
                // window.location.replace("/");
            }
        },
        // mounted() {
        //     this.showSession()
        // },
        methods: {
            showSession: async function () {
                this.token = sessionStorage.getItem('authToken') || "no token";
                this.userType = sessionStorage.getItem('userTypeSession');
            }
        }
    };
</script>

<style scoped>

</style>
