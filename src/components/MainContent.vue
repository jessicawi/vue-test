<template>
    <div id="main-content">
        <navBar/>
        <slot/>
    </div>

</template>

<script>
    import navBar from "../components/Nav";
    import Header from "../components/Header";

    export default {
        name: 'MainContent',
        components: {
            navBar,
            Header,
        }
    };
</script>

<style scoped>
    #main-content {
        padding: 0px 0px 10px;
        min-height: 100vh;
        max-width: 100%;
        margin: auto;
        margin-left: 260px;
        position: relative;
        z-index: 99;
        background: white;
    }
    @media (max-width: 740px){
        #main-content {
            padding-top: 20px !important;
        }
    }
</style>
