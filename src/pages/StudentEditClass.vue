<template>
    <div id="student-edit-class" class="mt-3 container">
        <label style="display:none !important;">{{lblStudentID}}</label>
        <label style="display:none !important;">{{lblCourseID}}</label>
        <label style="display:none !important;">{{lblSemID}}</label>
        <label style="display:none !important;">{{lblSubjectCourseID}}</label>
        <div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student Name: {{lblStudentName}}</label>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student Status: {{lblStudentStatus}}</label>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class</label>
                    <select ref="ddlEditClass" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in EditClassList" v-bind:value="item.PK_Class_ID.trim()">{{ item.CLS_ClassName.trim()}} ({{item.CLS_Batch.trim()}})</option>
                    </select>
                </div>
            </div>

            <div v-if="list.length>0">
                <data-tables :data="list">
                    <el-table-column v-for="studentClassListInfo in studentClassList" :prop="studentClassListInfo.prop" :label="studentClassListInfo.label" :key="studentClassListInfo.prop"
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
        name: "StudentEditClass",
        async created() {
            this.lblStudentID = this.$route.query.id;
            this.lblCourseID = this.$route.query.courseid;
            this.lblSemID = this.$route.query.semid;
            this.lblSubjectCourseID = this.$route.query.subjectcourseid;
            await this.BindStudentInfo();
            await this.BindEditClass();
        },
        async mounted() {
            await this.GetStudentClassList();
        },
        data() {
            return {
                EditClassList: [],

                lblStudentID: '',
                lblCourseID: '',
                lblStudentName: '',
                lblStudentStatus: '',
                lblSemID: '',
                lblSubjectCourseID: '',

                list: [],
                studentClassList: [{
                    prop: "CLS_ClassName",
                    label: "Class Name",
                }, {
                    prop: "SCI_AssignedOn_convert",
                    label: "Assigned On"
                }, {
                    prop: "CONname",
                    label: "Assigned By"
                }, {
                    prop: "CLS_Batch",
                    label: "Programme"
                }],
            };
        },
        methods: {
            async BindEditClass() {
                try {
                    const response = await DataSource.shared.getEditClass(this.lblSemID, this.lblSubjectCourseID);
                    if (response) {
                        if (response) {
                            this.EditClassListResponse = response.Table;
                            this.EditClassListResponse.forEach(m => {
                                this.EditClassList.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentInfo() {
                try {
                    const response = await DataSource.shared.getStudent(this.lblStudentID, '', '', '', '');
                    if (response) {
                        this.studentInfoResponse = response.Table;
                        this.studentInfoResponse.forEach(m => {
                            this.lblStudentName = m.Full_Name + ' ' + m.Last_name;
                            this.lblStudentStatus = m.Status;
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async GetStudentClassList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getStudentClass(this.lblStudentID, this.lblCourseID);
                    if (response) {
                        if (response.code == 2)
                        {
                            alert('No record found');
                        }
                        else if (response.code == 99) {
                            alert('Please try again later');
                        }
                        else
                        {
                            this.list = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close()
            },
        },
    }
</script>

<style scoped>

</style>