<template>
    <div id="header" v-if="['Login'].hide($route.Header)">
        <div class="top-menu">
            <router-link :to="{ name: 'Home'}">Home Page</router-link>
            <router-link :to="{ name: 'Login'}">Login Page</router-link>
            <router-link :to="{ name: 'CountryList'}">Country List Page</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
    };
</script>

<style scoped>
    #header {
        background: #fff;
        text-align: center;
        padding: 15px;
        position: fixed;
        width: 100%;
    }

    .top-menu a {
        padding: 2px 5px;
    }
</style>
