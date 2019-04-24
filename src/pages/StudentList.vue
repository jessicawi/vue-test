<template>
    <div id="student-list">
        <div class="datatable-form__header">
            <div class="datatable-form__input form-group">
                <!--<label>Student No</label>-->
                <!--<input class="form-control" ref="stud_id">-->
                <vs-input label-placeholder="Student No" v-model="stud_id"/>
            </div>

            <div class="datatable-form__input form-group">
                <!--<label>Student First Name</label>-->
                <!--<input class="form-control" ref="stud_fname">-->
                <vs-input label-placeholder="Student First Name" v-model="stud_fname"/>
            </div>

            <div class="datatable-form__input form-group">
                <!--<label>Student Last Name</label>-->
                <!--<input class="form-control" ref="stud_lname">-->
                <vs-input label-placeholder="Student Last Name" v-model="stud_lname"/>
            </div>

            <div class="datatable-form__input form-group">
                <!--<label>Parent Name</label>-->
                <!--<input class="form-control" ref="stud_parname">-->
                <vs-input label-placeholder="Parent Name" v-model="stud_parname"/>
            </div>

            <div class="datatable-form__submit text-center">
                <button class="btn btn-success searchbtn" v-on:click="Search">Search</button>
            </div>
        </div>
        <div class="mt-3 container">
            <div class="emptylist-info" v-if="list.length===0">
                <span>PLEASE SEARCH TO VIEW LIST...</span>
                <div class="emptylist__img">
                    <img src="../assets/table-loading.png"/>
                </div>
            </div>


            <div v-if="list.length>0" class="datatable_group">
                <data-tables :data="list" :action-col="actionCol" @selection-change="handleSelectionChange">
                    <el-table-column v-for="studentListInfo in studentList" :prop="studentListInfo.prop"
                                     :label="studentListInfo.label" :key="studentListInfo.prop"
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
                Father_Name: "",
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
                }, {
                    prop: "Father_Name",
                    label: "Father_Name"
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
                            if (this.$route.query.mode == "Search") {
                                this.$router.push('student?id=' + row.Student_ID);
                            } else if (this.$route.query.mode == "Course") {
                                this.$router.push('student-edit-level?id=' + row.Student_ID);
                            } else {
                                alert('Error! Please try again later');
                            }
                        },
                        label: 'Edit'
                    },
                    {
                        props: {
                            type: 'primary',
                            icon: 'el-icon-document'
                        },
                        handler: row => {
                            this.isModalOpen = true;
                            this.Father_Name = row.Father_Name;
                            console.log(this.Father_Name);
                        },
                        label: 'View'
                    }]
                },
                selectedRow: null,
                stud_id: "",
                stud_fname: "",
                stud_lname: "",
                stud_parname: "",
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
                    const response = await DataSource.shared.getStudent('', this.stud_id, this.stud_fname, this.stud_lname, this.stud_parname);
                    if (response) {
                        this.list = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
        },
    };
</script>

<style>
    #student-list .vs-con-input {
        text-align: left;
    }

    #student-list .vs-input--placeholder {
        color: rgba(255, 255, 255, 0.6);
    }

    #student-list .isFocus .vs-placeholder-label {
        color: #fff;
    }

    /*jess*/
    .action-list button {
    /*width: 100%;*/
    margin: 5px 0px;
}

.sc-table .action-list > span + span {
    margin: 0px 0px;
    display: block;
}
</style>