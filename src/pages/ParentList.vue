<template>
    <div id="student-list" class="mt-3 container">
        <div>

            <div v-if="list.length>0">
                <data-tables :data="list" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>

                    <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
            <div v-else>
                Loading...
            </div>
            <!--<div>-->
            <!--<form class="needs-validation" novalidate @submit.prevent="onSubmit">-->
            <!--<button class="btn btn-primary btn-lg btn-block login-btn"-->
            <!--type="submit"-->
            <!--:disabled="isLoading===true">-->
            <!--click me-->
            <!--</button>-->
            <!--</form>-->
            <!--</div>-->
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
                titles: [{
                    prop: "Parent_MName",
                    label: "Father."
                }, {
                    prop: "Parent_FName",
                    label: "Mother"
                }, {
                    prop: "PAR_Family_Number",
                    label: "Family Number"
                }],
                selectedRow: null,
            };
        },
        async mounted() {
            try {
                const response = await DataSource.shared.getParentList();
                if (response) {
                    this.list = response.Table;
                }
            } catch (e) {
                console.log(e);
            }
        },
        methods: {
            handleSelectionChange(val) {
                console.log(val)
                this.selectedRow = val;
            },
            async onSubmit() {
                try {
                    const response = await DataSource.shared.getParentList();
                    console.log(response);
                    if (response) {
                        this.list = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    };


</script>

<style scoped>
</style>