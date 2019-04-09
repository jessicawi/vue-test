<template>
    <div id="approvermaster">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <b-btn v-b-modal.specificUserToApprove variant="primary">
                        Specific User To Approve
                    </b-btn>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="approverListInt.length>0" class="datatable_group">
                        <data-tables :data="approverListInt" :action-col="approverListDeleteButton" @selection-change="handleSelectionChange">
                            <el-table-column v-for="approverListInfo in approverList" :prop="approverListInfo.prop"
                                             :label="approverListInfo.label" :key="approverListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Approver Type</label>
                    <select v-model="ddlApproverType" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in approverTypeList" v-bind:value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Approver Level</label>
                    <select v-model="ddlApproverLevel" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in approverLevelList" v-bind:value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Approver</label>
                    <select v-model="ddlStaffList" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in staffList" v-bind:value="item.CONid">
                            {{ item.CONname }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button v-on:click="saveApproverMaster()" class="btn btn-primary waves-effect waves-light m-r-10">
                        Save
                    </button>
                </div>
            </div>
        </div>

        <b-modal id="specificUserToApprove" size="lg" title="Specific User To Approve" ok-only
                 ok-variant="secondary" ok-title="Cancel" ref="familyModalShowModal">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="approverSpecificUserInt.length>0" class="datatable_group">
                        <data-tables :data="approverSpecificUserInt" :action-col="approverSpecificUserListDeleteButton" @selection-change="handleSelectionChange">
                            <el-table-column v-for="approverSpecificUserListInfo in approverSpecificUserList" :prop="approverSpecificUserListInfo.prop"
                                             :label="approverSpecificUserListInfo.label" :key="approverSpecificUserListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Approver Type</label>
                    <select v-model="ddlApproverTypeSpecificUser" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in approverTypeList" v-bind:value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Specific Needed Approve User</label>
                    <select v-model="ddlStaffListSpecificUser" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in staffListSpecificUser" v-bind:value="item.CONid">
                            {{ item.CONname }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button v-on:click="saveApproveSpecificUser()" class="btn btn-primary waves-effect waves-light m-r-10">
                        Save
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "ApproverMaster",
        data() {
            return {
                ddlStaffList: '',
                staffList: [],
                ddlStaffListSpecificUser: '',
                staffListSpecificUser: [],
                approverTypeList: ['Portfolio', 'Documentation_Posting', 'Update_Posting', 'Portfolio_Posting', 'Report_Posting', 'Broadcast_Posting'],
                ddlApproverType: '',
                ddlApproverTypeSpecificUser: '',
                approverLevelList: ['1','2','3','4','5','6','7','8','9','10'],
                ddlApproverLevel: '',

                approverListInt: [],
                approverList: [{
                    prop: "ApproverMasterType",
                    label: "Type"
                }, {
                    prop: "ApproverMasterLevel",
                    label: "Approval Level"
                }, {
                    prop: "CONname",
                    label: "Approver"
                }, {
                    prop: "ContainAnySpecificUser",
                    label: "Specific User To Approve"
                }],
                approverListDeleteButton: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.deleteApproverMaster(row.ApproverMasterID);
                        },
                        label: 'Delete'
                    }]
                },

                approverSpecificUserInt: [],
                approverSpecificUserList: [{
                    prop: "AppMacSpeType",
                    label: "Type"
                }, {
                    prop: "CONname",
                    label: "Specific Needed Approve User Name"
                }],
                approverSpecificUserListDeleteButton: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.deleteApproverMasterSpecificUser(row.AppMasSpeID);
                        },
                        label: 'Delete'
                    }]
                },
            };
        },
        async created() {
            this.getStaffList();
            this.getStaffListBySchool();
        },
        async mounted() {
            this.getApproverMaster();
            this.getApproverMasterSpecificUser();
        },
        methods: {
            async getStaffList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getAllStaffList();
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

                        this.staffList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async getStaffListBySchool() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getAllStaffListBySchool();
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

                        this.staffListSpecificUser = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async getApproverMaster() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getApproverMaster();
                    if (response) {
                        switch (response.code) {
                            case "2":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'no record found'
                                });
                                break;
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Get list Error'
                                });
                                break;
                        }

                        this.approverListInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async deleteApproverMaster(approverMasterID) {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.updateApproverMaster(approverMasterID , "VOID");
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.$notify.error({
                                    title: 'Successful Delete',
                                    message: 'Successful Delete'
                                });
                                window.location.replace('/ApproverMaster');
                                break;
                            case "2":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Higher Approver Level Is Existing, Not Able To Empty Lower Approver Level'
                                });
                                break;
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

                        this.approverListInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async saveApproverMaster() {
                try {
                    if (this.ddlApproverType === '' || this.ddlApproverLevel === '' || this.ddlStaffList === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all fields'
                        });
                    } else {
                        this.$vs.loading();

                        const response = await DataSource.shared.saveApproverMaster(this.ddlApproverLevel, this.ddlStaffList, this.ddlApproverType);
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.$notify.error({
                                        title: 'Successful',
                                        message: 'Successful Added'
                                    });
                                    window.location.replace('/ApproverMaster');
                                    break;
                                case "2":
                                    this.$notify.error({
                                        title: 'Duplicated',
                                        message: 'Approver duplicated'
                                    });
                                    break;
                                case "3":
                                    this.$notify.error({
                                        title: 'Fail to Add',
                                        message: 'Lower approver level is not existed, please follow the correct sequence of approver level'
                                    });
                                    break;
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

                            this.approverListInt = response.Table;
                        }

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }

            },
            async getApproverMasterSpecificUser() {
                try {
                    const response = await DataSource.shared.getApproverMasterSpecificUser();
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

                        this.approverSpecificUserInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteApproverMasterSpecificUser(value) {
                try {
                    this.$vs.loading();

                    const response = await DataSource.shared.updateApproverMasterSpecificUser(value, "VOID");
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.$notify.error({
                                    title: 'Successful',
                                    message: 'Successful Added'
                                });
                                window.location.replace('/ApproverMaster');
                                break;
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
                    }

                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            async saveApproveSpecificUser() {
                try {
                    if (this.ddlApproverTypeSpecificUser === '' || this.ddlStaffListSpecificUser === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all fields'
                        });
                    } else {
                        this.$vs.loading();

                        const response = await DataSource.shared.saveApproverMasterSpecificUser(this.ddlStaffListSpecificUser, this.ddlApproverTypeSpecificUser);
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.$notify.error({
                                        title: 'Successful',
                                        message: 'Successful Added'
                                    });
                                    window.location.replace('/ApproverMaster');
                                    break;
                                case "2":
                                    this.$notify.error({
                                        title: 'Duplicated',
                                        message: 'Approver duplicated'
                                    });
                                    break;
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
                        }

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }

            },
        },
    }
</script>

<style scoped>

</style>