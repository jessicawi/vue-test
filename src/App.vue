<template>
    <div v-if="isLoading===false" id="app">
        <Header/>
        <MainContent>
            <router-view/>
        </MainContent>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import MainContent from "./components/MainContent";

    export default {
        name: 'app',
        data() {
            return {
                isLoading: true,
                token: null,
            }
        },
        components: {
            MainContent,
            Header,
        },
        mounted() {
            const isLogin = sessionStorage.getItem('authToken');
            if (this.$route.path !== "/login" && (!isLogin || isLogin === "null")) {
                this.$router.push('/login')
            }
            this.isLoading = false;
        }
    };


</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
            primary: #006400
    )
</style>