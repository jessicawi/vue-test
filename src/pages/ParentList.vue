<template>
    <div id="parent-list" class="mt-3 container">
        <div>
            <div class="row">
                <div class="form-group col-lg-6">
                    <label>Family No</label>
                    <input class="form-control" ref="inputFamilyNo">
                </div>

                <div class="form-group col-lg-6">
                    <label>Parent First Name</label>
                    <input class="form-control" ref="inputParentFirstName">
                </div>

                <div class="form-group col-lg-6">
                    <label>Parent Last Name</label>
                    <input class="form-control" ref="inputParentLastName">
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-success searchbtn" v-on:click="Search" @click="openLoading">Search</button>
            </div>

            <div v-if="list.length>0">
                <data-tables :data="list" :action-col="actionCol" @selection-change="handleSelectionChange">
                    <!--<el-table-column type="selection" width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column v-for="parentListInfo in parentList" :prop="parentListInfo.prop" :label="parentListInfo.label" :key="parentListInfo.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
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
                parentList: [{
                    prop: "PAR_Family_Number",
                    label: "Family No"
                }, {
                    prop: "Parent_FName",
                    label: "Father's Name"
                }, {
                    prop: "Parent_MName",
                    label: "Mother's Name"
                }, {
                    prop: "Parent_GName",
                    label: "Guardian's Name"
                }, {
                    prop: "PAR_Status",
                    label: "Parent Status"
                }],
                actionCol: {
                    label: 'Edit',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.$router.push('parent?id=' + row.PAR_ID);
                        },
                        label: 'Edit'
                    }]
                },
                selectedRow: null,
            };
        },
        async mounted() {
        },
        methods: {
            handleSelectionChange(val) {
                this.selectedRow = val;
            },
            async Search() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getParentList(this.$refs.inputFamilyNo.value, this.$refs.inputParentFirstName.value, this.$refs.inputParentLastName.value);
                    if (response) {
                        this.list = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close()
            },
        },
    };
</script>

<style scoped>
</style>