<template>
    <div id="main-content">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'MainContent',
    };
</script>

<style scoped>
    #main-content {
        padding: 74px 10px 10px 10px;
        min-height: 100vh;
        max-width: 1200px;
        margin: auto;
    }
    @media (max-width: 740px){
        #main-content {
            padding-top: 20px !important;
        }
    }
</style>
