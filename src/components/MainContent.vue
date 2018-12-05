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
</style>
