<template>
    <div id="classmanagement">
        <div class="container">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12 actionDiv">
                    <b-btn v-b-modal.newClassModal variant="primary">
                        New
                    </b-btn>

                    <b-btn variant="primary" v-on:click="directToPromotion()">
                        Mass Promotion
                    </b-btn>
                </div>

                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="classListInt.length>0">
                        <data-tables :data="classListInt" :action-col="classListAction">
                            <el-table-column v-for="classListInfo in classList" :prop="classListInfo.prop"
                                             :label="classListInfo.label" :key="classListInfo.prop"
                                             sortable="custom">
                            </el-table-column>

                            <el-table-column label="Assign Students" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button v-for="assignStudents in assignStudentToClass(scope.row)"
                                               :key="assignStudents.name" type="primary"
                                               @click="assignStudents.handler">
                                        {{assignStudents.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="newClassModal" size="lg" title="Create New Class" ok-only ok-variant="secondary" ok-title="Cancel" ref="newClassShowModal">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level</label>
                    <select v-model="ddlClassLevel" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in levelList" v-bind:value="item.PK_Course_ID">
                            {{ item.CRS_Course_Name }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Semester</label>
                    <select v-model="ddlSemester" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in semesterList" v-bind:value="item.PK_Semester_ID">
                            {{ item.SMT_Code }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Name</label>
                    <input type="text" class="form-control" v-model="inputClassName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Programme</label>
                    <select v-model="ddlClassType" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in classTypeList" v-bind:value="item.CTY_ClassType">
                            {{ item.CTY_ClassType }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Teacher</label>
                    <select v-model="ddlClassTeacher" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in classTeacherList" v-bind:value="item.CONid">
                            {{ item.CONname }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Maximum Student</label>
                    <input type="text" class="form-control" v-model="inputMaxStudents" @keypress="onlyNumber">
                </div>

                <button v-on:click="saveClass()" class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Create</button>
            </div>
        </b-modal>

        <b-modal id="editClassModal" size="lg" title="Edit Class" ok-only ok-variant="secondary" ok-title="Cancel" ref="editClassShowModal">
            <div class="row">
                <div style="display: none;">{{ editClassID }}</div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level</label>
                    <input type="text" class="form-control" v-model="inputeditLevel" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Name</label>
                    <input type="text" class="form-control" v-model="inputEditClassName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Status</label>
                    <select v-model="ddlEditClassStatus" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in editClassStatusList" v-bind:value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Maximum Student</label>
                    <input type="text" class="form-control" v-model="inputEditMaxStudents" @keypress="onlyNumber">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button v-on:click="updateClass()" class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Edit</button>
                </div>
            </div>
        </b-modal>

        <b-modal id="assignClassModal" size="lg" title="Assign Class" ok-only ok-variant="secondary" ok-title="Cancel" ref="assignClassShowModal">
            <div class="row">
                <div style="display: none;">{{ assignClassLevelID }} - {{ assignClassID }}</div>

                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="assignStudentsListInt.length>0">
                        <data-tables :data="assignStudentsListInt" @selection-change="changeSelection" >
                            <el-table-column type="selection" width="55" :reserve-selection="true">
                            </el-table-column>

                            <el-table-column v-for="assignStudentsListInfo in assignStudentsList" :prop="assignStudentsListInfo.prop"
                                             :label="assignStudentsListInfo.label" :key="assignStudentsListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button v-on:click="assignClass()" class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Assign</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "ClassManagement",
        async created() {
            await this.getClass();
            await this.getLevel();
            await this.getAcademicYear();
            await this.getClassType();
            await this.getClassTeacher();
        },
        data() {
            return {
                ddlClassLevel: '',
                ddlSemester: '',
                inputClassName: '',
                ddlClassType: '',
                ddlClassTeacher: '',
                inputMaxStudents: '',
                editClassID: '',
                ddlEditClassStatus: '',
                inputEditClassName: '',
                inputEditMaxStudents: '',
                inputeditLevel: '',
                assignClassLevelID: '',
                assignClassID: '',

                levelList: [],
                semesterList: [],
                classTypeList: [],
                classTeacherList: [],
                classListInt: [],
                editClassStatusList: ['Active', 'Closed'],
                assignStudentsListInt: [],

                classList: [{
                    prop: "CLS_ClassName",
                    label: "Class Name"
                }, {
                    prop: "CLS_Batch",
                    label: "Programme"
                }, {
                    prop: "CLS_Class_Max_Students",
                    label: "Max Students"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }],
                classListAction: {
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
                            this.editClassID =  row.PK_Class_ID;
                            this.inputEditClassName = row.CLS_ClassName;
                            this.ddlEditClassStatus = 'Active';
                            this.inputEditMaxStudents = row.CLS_Class_Max_Students;
                            this.inputeditLevel = row.CRS_Course_Name;
                            this.$refs.editClassShowModal.show();
                        },
                        label: 'Edit'
                    }]
                },

                assignStudentsList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Middle_name",
                    label: "Middle Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }, {
                    prop: "assignToCurrentClass",
                    label: "Assigned Current Class"
                }],
                multipleSelection:[]
            }
        },
        methods: {
            async changeSelection(val) {
                this.multipleSelection = val;
            },
            async getClass() {
                try {
                    const response = await DataSource.shared.getClass('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            this.classListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getLevel() {
                try {
                    const response = await DataSource.shared.getLevel('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            this.levelList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            this.semesterList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getClassType() {
                try {
                    const response = await DataSource.shared.getClassType('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            this.classTypeList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getClassTeacher() {
                try {
                    const response = await DataSource.shared.getTeacherListBySchool();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            this.classTeacherList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            onlyNumber ($event) {
                //console.log($event.keyCode); //keyCodes value
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                if (keyCode < 48 || keyCode > 57) { // 46 is dot
                    $event.preventDefault();
                }
            },
            async saveClass() {
                try {
                    if (this.ddlClassLevel === '' || this.ddlSemester === '' || this.ddlClassType === '' || this.inputClassName === '' || this.inputMaxStudents === '' || this.ddlClassTeacher === '') {
                        alert('Please fill in all information');
                    } else {
                        const response = await DataSource.shared.saveClass(this.ddlClassLevel, this.ddlSemester, this.ddlClassType, this.inputClassName, this.inputMaxStudents, this.ddlClassTeacher);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                alert('Save Class Error!');
                            } else {
                                alert('Successfully Saved!');
                                window.location.replace('/ClassManagement');
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async updateClass() {
                try {
                    if (this.editClassID === '' || this.inputEditClassName === '' || this.inputEditClassName === '' || this.inputEditMaxStudents === '') {
                        alert('Please fill in all information');
                    } else {
                        const response = await DataSource.shared.updateClass(this.editClassID, this.inputEditClassName, this.ddlEditClassStatus, this.inputEditMaxStudents);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                alert('Edit Class Error!');
                            } else {
                                alert('Successfully Edited!');
                                window.location.replace('/ClassManagement');
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            directToPromotion () {
                window.location.replace('/Promotion');
            },
            assignStudentToClass(row) {
                return [{
                    name: 'Assign',
                    handler: _ => {
                        this.assignClassLevelID = row.PK_Course_ID;
                        this.assignClassID = row.PK_Class_ID;
                        this.getAssignStudents();
                        this.$refs.assignClassShowModal.show();
                    }
                }];
            },
            async getAssignStudents() {
                try {
                    const response = await DataSource.shared.getActiveStudentsByLevelSchool(this.assignClassLevelID, this.assignClassID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            this.assignStudentsListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async assignClass () {
                let classAssignList = [];

                this.multipleSelection.forEach(item => {
                    let classAssignDetials = {
                        studentID: item.Student_ID,
                        classHistoryID: item.PK_Student_Course_ID
                    };

                    classAssignList.push(classAssignDetials);
                });

                const response = await DataSource.shared.massSetClass(this.assignClassID, JSON.stringify(classAssignList));
                if (response) {
                    if (response.code === '1') {
                        alert('Successfully saved');
                        window.location.replace('/ClassManagement');
                    } else if (response.code === '2') {
                        alert('The class have been exceeded max number of student!');
                    } else {
                        alert('Error! Please try again later');
                        window.location.replace('/ClassManagement');
                    }
                }
            },
        },
    }
</script>

<style scoped>
    .actionDiv {
        text-align: right;
    }
    .actionDiv .btn-primary {
        display: inline;
        margin-left: 10px;
    }
</style>