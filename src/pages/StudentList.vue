<template>
    <div id="student-list">
        <div class="datatable-form__header">
            <div class="datatable-form__input form-group">
                <label>Student No</label>
                <input class="form-control" ref="stud_id">
            </div>

            <div class="datatable-form__input form-group">
                <label>Student First Name</label>
                <input class="form-control" ref="stud_fname">
            </div>

            <div class="datatable-form__input form-group">
                <label>Student Last Name</label>
                <input class="form-control" ref="stud_lname">
            </div>

            <div class="datatable-form__input form-group">
                <label>Parent Name</label>
                <input class="form-control" ref="stud_parname">
            </div>

            <div class="datatable-form__submit text-center">
                <button class="btn btn-success searchbtn" v-on:click="Search">Search</button>
            </div>
        </div>
        <div class="mt-3 container">
            <div class="emptylist-info" v-if="list.length===0" >
                <span>PLEASE SEARCH TO VIEW LIST...</span>
                <div class="emptylist__img">
                    <img src="../assets/table-loading.png"/>
                </div>
            </div>


            <div v-if="list.length>0" class="datatable_group">
                <data-tables :data="list" :action-col="actionCol" @selection-change="handleSelectionChange">
                    <el-table-column v-for="studentListInfo in studentList" :prop="studentListInfo.prop" :label="studentListInfo.label" :key="studentListInfo.prop"
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
        name: 'StudentList',
        data() {
            return {
                list: [],
                studentList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }, {
                    prop: "Status",
                    label: "Status"
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
                            if (this.$route.query.mode == "Search")
                            {
                                this.$router.push('student?id=' + row.Student_ID);
                            }
                            else if (this.$route.query.mode == "Course")
                            {
                                this.$router.push('student-edit-level?id=' + row.Student_ID);
                            }
                            else
                            {
                                alert('Error! Please try again later');
                            }
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
                    const response = await DataSource.shared.getStudent('', this.$refs.stud_id.value, this.$refs.stud_fname.value, this.$refs.stud_lname.value, this.$refs.stud_parname.value);
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