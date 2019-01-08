<template>
    <div v-if="isLoading===false" id="app">
        <Header/>
        <MainContent>
            <router-view/>
        </MainContent>
        <b-modal id="modaltimeout" hide-footer title="SESSION EXPIRED" v-model="isSessionModalOpen">
            Session expired, press ok to continue login, press cancel to logout
            <br/>
            <div class="row d-flex submit-wrap">
                <div class="col-md-6">
                    <b-btn class="float-left" @click="cancelClick">Cancel</b-btn>
                </div>
                <div class="col-md-6">
                    <b-btn class="float-right" @click="okClick">OK</b-btn>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import MainContent from "./components/MainContent";
    import DataSource from "./data/datasource";

    export default {
        name: 'app',
        data() {
            return {
                isLoading: true,
                token: null,
                isLoggedIn: null,
                isSessionModalOpen: false,
            };
        },
        components: {
            MainContent,
            Header,
        },
        mounted() {
            const isLogin = sessionStorage.getItem('authToken');
            if (this.$route.path !== "/login" && this.$route.path !== "/register/parent" && this.$route.path !== "/reset-password" && this.$route.path !== "/reset-email"  && (!isLogin || isLogin === "null")) {
                this.$router.push('/login')
            }else if (isLogin) {
                this.isLoggedIn = true;
                setTimeout(this.warningLogout, 10800000); // 3 hours
            }
            this.isLoading = false;
        },
        methods: {
            warningLogout() {
                this.isSessionModalOpen = true;
                // const result = "Session expired, press ok to continue login, press cancel to logout";
                setTimeout(this.cancelClick, 10800);

            },
            okClick() {
                // continue login
                // repeating after some time warning session expired
                setTimeout(this.warningLogout, 10800000); // 3 hours
                this.isSessionModalOpen = false;

            },
            cancelClick() {
                DataSource.shared.logout();
            }
        }
    };


</script>

<style>
    body {
    }

    .el-table th > .cell {
        white-space: nowrap;
    }

    #app {
        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background: #f1f1f1;
        font-size: 0.8rem;
    }

    .white-box {
        background: #fff;
        padding: 15px;
        border-radius: 2px;
        box-shadow: 1px 1px 4px #e0e0e0;
        margin: 5px 0;
    }

    a {
        text-decoration: none !important;
    }

</style>

<style lang="scss">
    $theme-colors: (
            primary: #f44252
    )
</style>