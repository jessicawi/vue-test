<template>
    <div id="transferin">
        <div class="container">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="transferInListInt.length>0">
                        <data-tables :data="transferInListInt" :action-col="transferListAction">
                            <el-table-column v-for="transferInListInfo in transferInList" :prop="transferInListInfo.prop"
                                             :label="transferInListInfo.label" :key="transferInListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="transferModal" size="lg" title="Transfer" ok-only ok-variant="secondary" ok-title="Cancel" ref="transferShowModal">
            <div>{{ transferStudentID }} - {{ studentSchoolID }}</div>
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Select Level</label>
                    <select ref="ddlStudentSelectLevel" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in levelList" v-bind:value="item.PK_Course_ID.trim()">{{ item.CRS_Course_Name.trim() }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Academic Year</label>
                    <select ref="ddlStudentFirstAcademicYear"
                            class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in academicYearList" v-bind:value="item.PK_Semester_ID.trim()">{{ item.SMT_Code.trim() }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Intake Year</label>
                    <select ref="ddlStudentIntakeYear" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in studentIntakeYearList" v-bind:value="item.PK_PAI_ID.trim()">{{ item.PAI_Intake_No.trim() }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="ApproveReject('APPROVE')">Approve</button>
                    <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="ApproveReject('REJECT')">Reject</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "TransferIn",
        data() {
            return {
                levelList: [],
                academicYearList: [],
                studentIntakeYearList: [],
                transferStudentID: '',
                studentSchoolID: '',

                transferInListInt: [],
                transferInList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Middle Name",
                    label: "Middle_name"
                }, {
                    prop: "Last Name",
                    label: "Last_name"
                }],
                transferListAction: {
                    label: 'Action',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.transferStudentID = row.Student_ID;
                            this.studentSchoolID = row.PK_STUSCH_ID;
                            this.$refs.transferShowModal.show();
                        },
                        label: 'Action'
                    }]
                },
            };
        },
        async created() {
            this.getPendingAcceptTransferSchoolList();
            this.BindStudentLevel();
            this.BindAcademicYear();
            this.BindStudentIntakeYear();
        },
        async mounted() {

        },
        methods: {
            async getPendingAcceptTransferSchoolList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getPendingAcceptTransferSchoolBySchool();
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;
                        }

                        this.transferInListInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async BindStudentLevel() {
                try {
                    const response = await DataSource.shared.getLevel('');
                    if (response) {
                        this.levelListResponse = response.Table;
                        this.levelListResponse.forEach(m => {
                            this.levelList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear();
                    if (response) {
                        this.academicYearListResponse = response.Table;
                        this.academicYearListResponse.forEach(m => {
                            this.academicYearList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentIntakeYear() {
                try {
                    const response = await DataSource.shared.getIntakeYear();
                    if (response) {
                        this.studentIntakeYearListResponse = response.Table;
                        this.studentIntakeYearListResponse.forEach(m => {
                            this.studentIntakeYearList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async ApproveReject(value) {
                try {
                    if (this.transferStudentID !== "" && this.studentSchoolID !== "") {
                        if (value === 'APPROVE') {
                            if (this.$refs.ddlStudentSelectLevel.value !== "" && this.$refs.ddlStudentFirstAcademicYear.value !== "" && this.$refs.ddlStudentIntakeYear.value !== "") {
                                const getAcaYearRes = await DataSource.shared.getAcademicYearDateRange(this.$refs.ddlStudentFirstAcademicYear.value);

                                if (getAcaYearRes) {
                                    if (getAcaYearRes.code === "99") {
                                        alert('Get Academic Year Error - Please try again later');
                                    } else {
                                        let academicYearFromDate, academicYearToDate;

                                        this.getAcaYearResTemp = getAcaYearRes.Table;
                                        this.getAcaYearResTemp.forEach(m => {
                                            academicYearFromDate = m.SMT_From;
                                            academicYearToDate = m.SMT_To;
                                        });

                                        this.academicYearToDate(value, academicYearFromDate, academicYearToDate, this.$refs.ddlStudentSelectLevel.value, this.$refs.ddlStudentFirstAcademicYear.value, this.$refs.ddlStudentIntakeYear.value);
                                    }
                                }
                            } else {
                                alert('Please fill in all the information');
                            }
                        } else if (value === 'REJECT') {
                            this.academicYearToDate(value, 'NO DATA', 'NO DATA', 'NO DATA', 'NO DATA', 'NO DATA');
                        }
                    } else {
                        alert('Error! Fail to get table info');
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async academicYearToDate(value, academicYearFromDate, academicYearToDate, level, adYear, intakeYear) {
                try {
                    const getSetLvlRes = await DataSource.shared.setLevelForAcceptScool(this.transferStudentID, level, academicYearFromDate, academicYearToDate, adYear, intakeYear, value, this.studentSchoolID);

                    if (getSetLvlRes) {
                        if (getSetLvlRes.code === "1") {
                            alert('Records Successfully Saved');
                            window.location.replace('/TransferIn');
                        } else {
                            alert('Save Student Accept / Reject School - Please try again later');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            }
        },
    }
</script>

<style scoped>

</style>