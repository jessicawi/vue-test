<template>
    <div id="app">
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
        components: {
            MainContent,
            Header,
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


</style>
