<template>
    <div id="attendance-list" class="mt-3 container">
        <label style="display:none !important;">{{lblAttID}}</label>
        <div>
            <div class="row searchingArea">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="lblClass">Class</label>
                    <select v-model="ddlClass" class="form-control pro-edt-select form-control-primary ddlClass" @change="Load()">
                        <option v-for="item in ddlClassList" v-bind:value="item.PK_Semester_ID.trim() + ',' + item.SC_FK_CourseID.trim() + ',' + item.PK_Class_ID.trim()">{{ item.CLS_ClassName.trim() }}</option>
                    </select>
                </div>
            </div>

            <div v-if="studentList.length>0" class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table class="attTable">
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <!--<th>Attendance <br> <input type="checkbox" @click="checkAll()" ref="checkAllBox"></th>-->
                            <th>Attendance</th>
                            <th>Remarks</th>
                        </tr>
                        <tr v-for="item in studentList" ref="studentList_Update">
                            <td style="display:none;"><input type="text" class="form-control" :value="item.AttDtlID" ref="studentAttID"></td>
                            <td><label>{{item.AttDtlStudentIndexNo}}</label></td>
                            <td><label>{{item.AttDtlStudentName}}</label></td>
                            <!--<td><input type="checkbox" :id="item.AttDtlID" :value="item.AttDtlID" :checked="item.AttDtlMark.includes('Yes')" ref="studentCheckList"></td>-->
                            <!--<td>-->
                                <!--<div class="form-group__wrapper row">-->
                                    <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">-->
                                        <!--<label class="lblCheckBox">-->
                                            <!--<input class="form-control" type="checkbox" :id="item.AttDtlID" :value="item.AttDtlID" :checked="item.AttDtlMark.includes('Yes')" ref="studentCheckList">-->
                                            <!--<span>-->
                                        <!--<span>-->
                                            <!--<svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path" fill="none" stroke="white"-->
                                                                                             <!--d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>-->
                                        <!--</span>-->
                                    <!--</span>-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</td>-->
                            <td>
                                <select ref="studentCheckList" class="form-control pro-edt-select form-control-primary">
                                    <option v-for="itemCheckList in checkListSelect" :value="itemCheckList" :selected="itemCheckList === item.AttDtlMark">
                                        {{ itemCheckList }}
                                    </option>
                                </select>
                            </td>
                            <td><input type="text" class="form-control" :value="item.AttDtlRemark" ref="studentRemark"></td>
                        </tr>
                    </table>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="margin-top:20px;">
                    <button class="btn btn-success" v-on:click="Save">Save</button><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "AttendanceList",
        data(){
            return{
                checkListSelect: ['Late', 'Sick', 'On Holiday', 'Sent Home'],
                lblAttID: '',
                ddlClassList: [],
                ddlClass: '',
                studentList: [],
            };
        },
        async created() {
            await this.bindClasses();
        },
        async mounted() {
        },
        methods: {
            async bindClasses() {
                try {
                    const response = await DataSource.shared.getAttendanceClass();
                    if (response) {
                        this.class = response.Table;
                        this.class.forEach(m => {
                            this.ddlClassList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Load() {

                try {
                    if (this.ddlClass == '')
                    {
                        alert('Please select class');
                    }
                    else
                    {
                        this.$vs.loading();
                        const response = await DataSource.shared.LoadAttendanceList(this.ddlClass);
                        if (response) {
                            if (response.code == '2')
                            {
                                alert('No student found');
                            }
                            else if (response.code == '99')
                            {
                                alert('Error! Please try again later');
                            }
                            else
                            {
                                this.studentList = response.Table;

                                this.studentListResponse = response.Table;
                                this.studentListResponse.forEach(m => {
                                    this.lblAttID = m.AttDtlAttID;
                                });
                            }
                        }
                        this.$vs.loading.close()
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Save() {
                try {
                    // let jsonString = '';
                    //
                    // this.$refs.studentList_Update.forEach((m, index) => {
                    //     if (jsonString === '') {
                    //         jsonString = '"' + this.$refs.studentCheckList[index].value + '":"' + this.$refs.studentCheckList[index].checked + ',' + this.$refs.studentRemark[index].value + '"';
                    //     }
                    //     else {
                    //         jsonString = jsonString + ',"' + this.$refs.studentCheckList[index].value + '":"' + this.$refs.studentCheckList[index].checked + ',' + this.$refs.studentRemark[index].value + '"';
                    //     }
                    // });
                    //
                    // jsonString = '{ ' + jsonString + ' }';

                    // const response = await DataSource.shared.updateAttendanceList(this.lblAttID, jsonString);
                    // if (response) {
                    //     if (response.code == '1') {
                    //         alert('Successfully saved');
                    //         window.location.replace('/attendancelist');
                    //     } else {
                    //         alert('Error! Please try again later');
                    //         window.location.replace('/attendancelist');
                    //     }
                    // }

                    let attendanceList = [];

                    this.$refs.studentList_Update.forEach((m, index) => {
                        let attendanceDetials = {
                            status: this.$refs.studentCheckList[index].value,
                            remark: this.$refs.studentRemark[index].value
                        };

                        let attendanceListTemp = {
                            attID: this.$refs.studentAttID[index].value,
                            attDetails: attendanceDetials
                        };

                        attendanceList.push(attendanceListTemp);
                    });

                    const response = await DataSource.shared.updateAttendanceList(this.lblAttID, JSON.stringify(attendanceList));
                    if (response) {
                        if (response.code == '1') {
                            alert('Successfully saved');
                            window.location.replace('/attendancelist');
                        } else {
                            alert('Error! Please try again later');
                            window.location.replace('/attendancelist');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async checkAll() {
                try {
                    if (this.$refs.checkAllBox.checked == true)
                    {
                        this.$refs.studentCheckList.forEach(m => {
                            m.checked = true;
                        });
                    }
                    else
                    {
                        this.$refs.studentCheckList.forEach(m => {
                            m.checked = false;
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
    .attTable
    {
        width:100%;
        margin-top:20px;
    }

    .attTable td, .attTable th, .attTable label
    {
        text-align:center;
        padding:10px;
    }

    .attTable tr:nth-child(even)
    {
        background:#fff;
    }

    .ddlClass
    {
        display:inline;
        width:auto;
    }

    .lblClass
    {
        display:inline !important;
        padding:20px;
    }

    input[type='checkbox']
    {
        width:30px;
        height:30px;
        background:white;
        border-radius:5px;
        border:2px solid #555;
    }

    .searchingArea
    {
        text-align:left;
    }

    .checkbox_wrapper
    {
        min-width:100%;
    }

    .lblCheckBox
    {
        width:100%;
    }
</style>