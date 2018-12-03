<template>
    <div id="method">
        <TopUp/>
        <div v-for="method in methods" :key="method.name">
            {{ method.name }}
        </div>
    </div>
</template>

<script>
    import TopUp from "@/components/TopUp";
    import DataSource from "@/data/datasource";

    export default {
        name: 'Method',
        components: {TopUp},
        data() {
            return {
                methods: [],
            };
        },
        async mounted() {
            const res = await DataSource.shared.callAPI('departments', 'GET');
            this.methods = res.json;
        },
    };
</script>

<style scoped>
    #step {

    }
</style>
