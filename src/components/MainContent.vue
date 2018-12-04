<template>
    <div id="main-content">
        <slot/>
        <h2>API content below:</h2>
        <!-- render item in list one by one -->
        <div v-for="item in list" :key="item._id">
            {{ item.text }}
        </div>

        <h2>End APi content</h2>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'MainContent',
        data() {
            return {
                list: [],
            };
        },
        async mounted() {
            // get data from api
            const response = await DataSource.shared.customCatAPI();
            const etonTest = await DataSource.shared.soapTest()

            // console.log(response, ' api response');


            // assign data to "list"
            this.list = response.all;
            this.etonTest = etonTest
        },
    };
</script>

<style scoped>
    #main-content {
        padding: 74px 10px 10px 10px;
        min-height: 100vh;
    }
</style>
