<template>
    <div id="student-list" class="mt-3 container">
        <div>

            <div v-for="object in list" :key="object.familyId">
                {{object.familyId}} - {{ object.parentFirstName }}- {{ object.parentLastName }} - {{object.parentId}}
            </div>
        </div>
    </div>

</template>

<script>

    import DataSource from "../data/datasource";

    export default {
        name: 'ParentList',
        data() {
            return {
                list: [],
            };
        },
        async mounted() {
            // get data from api
            let response = await DataSource.shared.getParentList();
// console.log(response)
            // assign data to "list"
            this.list = response.Table;
            console.log(response);
        },
    };
</script>

<style scoped>
</style>