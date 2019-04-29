<template>
    <div id="classmanagement">
        <div class="container admin-wrap">
            <div class="row header mb-2">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">Class Management</h3>
                </div>
                <div class="col-lg-7 actionDiv">
                    <el-button-group>
                        <el-button type="primary" v-b-modal.newClassModal variant="primary"><i class="material-icons">
                            playlist_add
                        </i> New Class
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="directToPromotion()">Mass Promotion <i
                                class="material-icons">
                            view_module
                        </i></el-button>
                    </el-button-group>
                    <!--<b-btn v-b-modal.newClassModal variant="primary">-->
                    <!--Mass Promotion-->
                    <!--</b-btn>-->

                    <!--<b-btn variant="primary" v-on:click="directToPromotion()">-->
                    <!--Mass Promotion-->
                    <!--</b-btn>-->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="classListInt.length>0">
                        <el-row style="margin-bottom: 10px">
                            <el-col :span="11">
                                <el-input v-model="ClassFilters[0].value" class="search-datatable" placeholder="Search">
                                    <template slot="prepend"><i class="material-icons">
                                        search
                                    </i> Search Class Name
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="11" :offset="2">
                                <!--<el-select v-model="ClassFilters[1].value" placeholder="select type"-->
                                <!--multiple="multiple" class="float-right">-->
                                <!--<el-option-->
                                <!--v-for="item in classListFilteritem"-->
                                <!--:key="item"-->
                                <!--:label="item"-->
                                <!--:value="item">-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <el-popover
                                        placement="bottom-end"
                                        width="400"
                                        trigger="click">

                                    <el-checkbox-group v-model="ClassFilters[1].value" class="custom-checkbox">
                                        <el-checkbox-button v-for="item in classListFilteritem" :label="item"
                                                            :key="item">{{item}}
                                        </el-checkbox-button>
                                    </el-checkbox-group>
                                    <el-button slot="reference" type="primary" round
                                               class="float-right large-btn classManage-filter"><i
                                            class="material-icons">
                                        tune
                                    </i> Filter
                                    </el-button>
                                </el-popover>
                            </el-col>
                        </el-row>
                        <data-tables :data="classListInt" :action-col="classListAction" class="classManage-Table"
                                     :filters="ClassFilters">
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
                            <el-table-column label="View Students" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button v-for="assignStudents in ViewStudentToClass(scope.row)"
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

        <b-modal id="newClassModal" size="lg" title="Create New Class" ok-only ok-variant="secondary" hide-footer
                 ref="newClassShowModal" v-model="newClassShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-3">
                    <label>Level</label>
                    <!--<select v-model="ddlClassLevel" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in levelList" v-bind:value="item.PK_Course_ID">-->
                    <!--{{ item.CRS_Course_Name }}-->
                    <!--</option>-->
                    <!--</select>-->
                    <el-select v-model="ddlClassLevel" placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in levelList"
                                :key="item.PK_Course_ID"
                                :label="item.CRS_Course_Name"
                                :value="item.PK_Course_ID">
                        </el-option>
                    </el-select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Semester</label>
                    <el-select v-model="ddlSemester" placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in semesterList"
                                :key="item.PK_Semester_ID"
                                :label="item.SMT_Code"
                                :value="item.PK_Semester_ID">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlSemester" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in semesterList" v-bind:value="item.PK_Semester_ID">-->
                    <!--{{ item.SMT_Code }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Name</label>
                    <input type="text" class="form-control" v-model="inputClassName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Programme</label>
                    <el-select v-model="ddlClassType" placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in classTypeList"
                                :key="item.CTY_ClassType"
                                :label="item.CTY_ClassType"
                                :value="item.CTY_ClassType">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlClassType" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in classTypeList" v-bind:value="item.CTY_ClassType">-->
                    <!--{{ item.CTY_ClassType }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Teacher</label>
                    <el-select v-model="ddlClassTeacher" filterable placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in classTeacherList"
                                :key="item.CONid"
                                :label="item.CONname"
                                :value="item.CONid">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlClassTeacher" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in classTeacherList" v-bind:value="item.CONid">-->
                    <!--{{ item.CONname }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Maximum Student</label>
                    <input type="text" class="form-control" v-model="inputMaxStudents" @keypress="onlyNumber">
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="closeAssignModal()"
                            class="btn btn-secondary close-modal-btn float-left">Close
                    </button>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="saveClass()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Create
                    </button>
                </div>
            </div>
        </b-modal>

        <b-modal id="editClassModal" size="lg" title="Edit Class" ok-only ok-variant="secondary"
                 ref="editClassShowModal" hide-footer v-model="editClassShowModal">
            <div class="row ml-2 mr-2">
                <div style="display: none;">{{ editClassID }}</div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level</label>
                    <input type="text" class="form-control" v-model="inputeditLevel" readonly="readonly" disabled>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Name</label>
                    <input type="text" class="form-control" v-model="inputEditClassName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Status</label>
                    <el-select v-model="ddlEditClassStatus" filterable placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in editClassStatusList"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlEditClassStatus" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in editClassStatusList" v-bind:value="item">-->
                    <!--{{ item }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Maximum Student</label>
                    <input type="text" class="form-control" v-model="inputEditMaxStudents" @keypress="onlyNumber">
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button @click="closeAssignModal()" class=" btn btn-secondary float-left">
                        Close
                    </button>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="updateClass()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Update
                    </button>
                </div>
            </div>
        </b-modal>

        <b-modal id="assignClassModal" size="lg" title="Assign Class" ok-only ok-variant="secondary" hide-footer
                 ref="assignClassShowModal" v-model="assignClassModal">
            <div class="">
                <div style="display: none;">{{ assignClassLevelID }} - {{ assignClassID }}</div>

                <div class="">
                    <div v-if="assignStudentsListInt.length>0">

                        <el-row style="margin-bottom: 10px" class="classManage-ActionBar    ">
                            <el-col :span="16">
                                <el-input v-model="filters[0].value">
                                    <template slot="prepend">Search</template>
                                </el-input>
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <el-button type="primary" round @click="ViewStudentToClassInner()">View Assigned Student
                                </el-button>
                            </el-col>
                        </el-row>
                        <data-tables :data="assignStudentsListInt" :filters="filters"
                                     @selection-change="changeSelection" :row-key="getRowKey">
                            <el-table-column type="selection" width="55" :reserve-selection="true">
                            </el-table-column>

                            <el-table-column v-for="assignStudentsListInfo in assignStudentsList"
                                             :prop="assignStudentsListInfo.prop"
                                             :label="assignStudentsListInfo.label" :key="assignStudentsListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
                <hr class="custom-hr"/>
                <div class="row">
                    <div class="col-lg-6">
                        <button v-on:click="closeAssignModal()"
                                class="btn btn-secondary close-modal-btn float-left">Close
                        </button>
                    </div>
                    <div class="col-lg-6">
                        <button v-on:click="assignClass()"
                                class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">Assign
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="ViewClassModal" size="lg" title="Assign Class" ok-only ok-variant="secondary"
                 ref="ViewClassModal" ok-title="Close">
            <div class="">
                <div style="display: none;">{{ assignClassLevelID }} - {{ assignClassID }}</div>

                <div class="">
                    <div>
                        <data-tables :data="currentStudent">

                            <el-table-column v-for="studentList in currentStudentList"
                                             :prop="studentList.prop"
                                             :label="studentList.label" :key="studentList.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
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
                assignClassModal: false,
                newClassShowModal: false,
                editClassShowModal: false,
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
                classListFilteritem: [],
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
                            this.editClassID = row.PK_Class_ID;
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
                },
                    //     {
                    //     prop: "assignToCurrentClass",
                    //     label: "Assigned Current Class"
                    // }
                ],
                ClassFilters: [
                    {
                        value: '',
                        prop: 'CLS_ClassName',
                    },
                    {
                        value: [],
                        prop: ['CRS_Course_Name', 'CLS_Batch']
                    }],
                filters: [{
                    value: '',
                    prop: 'Full_Name',
                }],
                multipleSelection: [],
                currentStudent: [],
                currentStudentList: [{
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
                }],
                tempRow: ""
            };
        },
        methods: {
            getRowKey(row) {
                console.log("helo", row);
                return row.Student_ID;
            },
            async changeSelection(val) {
                this.multipleSelection = val;
            },
            async getClass() {
                try {
                    const response = await DataSource.shared.getClass('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.classListInt = response.Table;
                            this.classListInt.forEach(object => {
                                const found = this.classListFilteritem.find(d => d === object.CLS_Batch);
                                if (!found) {
                                    this.classListFilteritem.push(object.CLS_Batch);
                                }
                                const foundLevel = this.classListFilteritem.find(d => d === object.CRS_Course_Name);
                                if (!foundLevel) {
                                    this.classListFilteritem.push(object.CRS_Course_Name);
                                }
                            });
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
                        } else {
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
                        } else {
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
                        } else {
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
                        } else {
                            this.classTeacherList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            onlyNumber($event) {
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
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all information'
                        });
                    } else {
                        const response = await DataSource.shared.saveClass(this.ddlClassLevel, this.ddlSemester, this.ddlClassType, this.inputClassName, this.inputMaxStudents, this.ddlClassTeacher);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save Class Error!'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Saved!',
                                    type: 'success'
                                });
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

                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all information'
                        });
                    } else {
                        const response = await DataSource.shared.updateClass(this.editClassID, this.inputEditClassName, this.ddlEditClassStatus, this.inputEditMaxStudents);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Edit Class Error!'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Edited!',
                                    type: 'success'
                                });
                                this.getClass();
                                this.editClassShowModal = false;
                                // window.location.replace('/ClassManagement');
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            directToPromotion() {
                window.location.replace('/Promotion');
            },
            assignStudentToClass(row) {
                return [{
                    name: 'Assign',
                    handler: _ => {
                        this.assignClassLevelID = row.PK_Course_ID;
                        this.assignClassID = row.PK_Class_ID;
                        this.getAssignStudents();
                        // this.$refs.assignClassShowModal.show();
                        this.assignClassModal = true;
                        this.tempRow = row;
                    }
                }];
            },
            closeAssignModal() {
                this.assignClassModal = false;
                this.newClassShowModal = false;
                this.editClassShowModal = false;
            },
            ViewStudentToClass(row) {
                return [{
                    name: 'View',
                    handler: _ => {
                        this.assignClassLevelID = row.PK_Course_ID;
                        this.assignClassID = row.PK_Class_ID;
                        this.getAssignStudents();
                        this.$refs.ViewClassModal.show();

                    }
                }];
            },
            ViewStudentToClassInner() {
                const row = this.tempRow;
                this.assignClassLevelID = row.PK_Course_ID;
                this.assignClassID = row.PK_Class_ID;
                this.getAssignStudents();
                this.$refs.ViewClassModal.show();
            },
            async getAssignStudents() {
                try {

                    this.$vs.loading();
                    const response = await DataSource.shared.getActiveStudentsByLevelSchool(this.assignClassLevelID, this.assignClassID);
                    if (response) {
                        this.$vs.loading.close();
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            // response.Table.forEach(d => {
                            let assignStudentList = response.Table;

                            this.assignStudentsListInt = assignStudentList.filter(d => {
                                return d.assignToCurrentClass !== "YES";
                            });
                            this.currentStudent = assignStudentList.filter(d => {
                                return d.assignToCurrentClass === "YES";
                            });


                            console.log("assignStudentsListInt", this.assignStudentsListInt);

                            // if (x.assignToCurrentClass !== "YES") {
                            //     this.assignStudentsListInt.push(x);
                            // }else{
                            //     this.currentStudent.push(x);
                            //     console.log(this.currentStudent,"111")
                            // }
                            // });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async assignClass() {
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
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully saved',
                            type: 'success'
                        });
                        this.closeAssignModal();
                        // window.location.replace('/ClassManagement');
                    } else if (response.code === '2') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'The class have been exceeded max number of student!'
                        });
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error! Please try again later'
                        });
                        window.location.replace('/ClassManagement');
                    }
                }
            },
        },
    };
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