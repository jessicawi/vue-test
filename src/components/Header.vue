<template>
    <div id="header">
        <router-link :to="{ name: 'Home'}">Home Page</router-link>
        <router-link :to="{ name: 'Login'}">Login Page</router-link>
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
</style>
