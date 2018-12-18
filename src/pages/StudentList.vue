<template>
    <div id="student-list" class="mt-3 container">
        <div>

            <div v-for="object in list" :key="object.Student_ID">
                {{object.ID_Number}} - {{ object.Full_Name }}- {{ object.DOB }}- {{ object.Index_No }}- {{ object.ID_Type }}
            </div>
            <!--<vs-table-->
                    <!--multiple-->
                    <!--v-model="selected"-->
                    <!--pagination-->
                    <!--max-items="3"-->
                    <!--search-->
                    <!--:data="users">-->
                <!--<template slot="header">-->
                    <!--<h3>-->
                        <!--Users-->
                    <!--</h3>-->
                <!--</template>-->
                <!--<template slot="thead">-->
                    <!--<vs-th sort-key="email">-->
                        <!--Email-->
                    <!--</vs-th>-->
                    <!--<vs-th sort-key="username">-->
                        <!--Name-->
                    <!--</vs-th>-->
                    <!--<vs-th sort-key="website">-->
                        <!--Website-->
                    <!--</vs-th>-->
                    <!--<vs-th sort-key="id">-->
                        <!--Nro-->
                    <!--</vs-th>-->
                <!--</template>-->

                <!--<template slot-scope="{data}">-->
                    <!--<vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">-->
                        <!--<vs-td :data="data[indextr].email">-->
                            <!--{{data[indextr].email}}-->
                        <!--</vs-td>-->

                        <!--<vs-td :data="data[indextr].username">-->
                            <!--{{data[indextr].username}}-->
                        <!--</vs-td>-->

                        <!--<vs-td :data="data[indextr].id">-->
                            <!--{{data[indextr].website}}-->
                        <!--</vs-td>-->

                        <!--<vs-td :data="data[indextr].id">-->
                            <!--{{data[indextr].id}}-->
                        <!--</vs-td>-->
                    <!--</vs-tr>-->
                <!--</template>-->
            <!--</vs-table>-->

            <!--<pre>{{ selected }}</pre>-->
        </div>
    </div>

</template>

<script>

    import DataSource from "../data/datasource";

    export default {
        name: 'StudentList',
        // computed: {
        //     request() {
        //         return JSON.stringify(this.usernameInput, null, "  ");
        //     },
        // },
        // data:()=>({
        //     selected:[],
        //     list: [],
        // }),
        data() {
            return {
                list: [],
            };
        },
        async mounted() {
            // get data from api
            let response = await DataSource.shared.getStudent();
// console.log(response)
            // assign data to "list"
            this.list = response.Table;
            console.log(response);
        },
    };
</script>

<style scoped>
</style>