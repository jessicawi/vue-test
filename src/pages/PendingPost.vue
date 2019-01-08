<template>
    <div id="staff-post" class="mt-3 container">
        <div>
            <h4 class="title">Pending Post</h4>
            <div v-if="list && list.length>0">
                <el-row style="margin-bottom: 10px" class="data-top">
                        <el-dropdown @command="handleClick" class="float-right">
                            <el-button type="primary">Actions<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="approve">Approve</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                </el-row>
                <data-tables-server :data="list" @selection-change="handleSelectionChange" :fit="false"
                                    :action-col="actionCol">
                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop"
                                     :width="title.width"
                                     sortable="custom">
                    </el-table-column>

                </data-tables-server>
            </div>
            <div v-else-if="results==='No Record Found'">
                No Record Found
            </div>
            <div v-else>
                {{results}}
                Loading...
            </div>

        </div>
        <b-modal id="viewMoreModal" hide-footer title="Post Details" v-model="isModalOpen">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">


                <div class="mb-2">
                    <label for="actionStatus">Status</label>
                    <select class="form-control" id="actionStatus" v-model="actionStatus">
                        <option selected value="Void">Disable</option>
                        <option value="Edit">Edit</option>
                    </select>
                </div>

                <div class="mb-2 d-none">
                    <input type="text" class="form-control" id="postID" v-model="viewModal"
                           placeholder="Post ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Post ID is required.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="UpdateContent">Content</label>
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="UpdateContent" v-model="UpdateContent"
                              placeholder="CONTENT"
                              required></textarea>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your content is required.
                    </div>
                </div>


                <div class="mb-2">
                    <label for="profolio">Profolio</label>
                    <select class="form-control" id="profolio" v-model="profolio">
                        <option selected value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div class="mb-2">
                    <label for="tagUserID">Tag User ID</label>
                    <input type="text" class="form-control" id="tagUserID" v-model="tagUserID"
                           placeholder="Tag User ID"
                           required>
                    <small class="text-left d-blk">separate ID by comma</small>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag User ID is required.
                    </div>
                </div>

                <div class="mb-2">
                    <label for="tagClassID">Tag Class ID</label>
                    <input type="text" class="form-control" id="tagClassID" v-model="tagClassID"
                           placeholder="Tag Class ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Class ID is required.
                    </div>
                </div>

                <div class="mb-2">
                    <label for="tagLevelID">Tag Level ID</label>
                    <input type="text" class="form-control" id="tagLevelID" v-model="tagLevelID"
                           placeholder="Tag Level ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Level ID is required.
                    </div>
                </div>
                <div class="view-details text-left">
                    <table class="table table-striped">
                        <tr class="">
                            <th>PostSchoolID</th>
                            <td>{{PostSchoolID}}</td>
                        </tr>
                        <tr class="">
                            <th>PostCreatedDate</th>
                            <td>{{PostCreatedDate}}</td>
                        </tr>
                        <tr class="">
                            <th>PostCreatedBy</th>
                            <td>{{PostCreatedBy}}</td>
                        </tr>
                    </table>
                </div>

                <div class="system-msg" v-bind:class="{'bg-danger': systemmsgError===true}"><p>{{results}}</p>
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex submit-wrap">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                        <button class="btn btn-primary login-btn" type="submit">Update
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>
    </div>

</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'PendingPost',
        data() {
            return {
                selectedRows: [],
                isModalOpen: false,
                list: [],
                viewModal: "",
                titles: [{
                    prop: "ID",
                    label: "ID"
                }, {
                    prop: "PostID",
                    label: "Post ID"
                }, {
                    prop: "PostCreatedDate",
                    label: "Created At"
                }, {
                    prop: "PostStatus",
                    label: "Post Status"
                }],
                actionCol: {
                    label: '',
                    class: 'actions',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'text',
                            // icon: 'el-icon-edit'
                        },
                        handler: async row => {
                            try {
                                console.log("clicked row data: ", row);

                                // call approve post api
                                const response = await DataSource.shared.approvePost(row.PostApproverID, "Approved");
                                console.log('approve response: ', response);

                                // update pending post view on success
                                this.getPendingPost();

                                this.getPostFile();
                            } catch (error) {
                                // log error
                                console.log(error);
                            }

                        },
                        label: 'Approve'
                    }, {
                        props: {
                            type: 'text',
                            icon: 'el-icon-edit'
                        },
                        handler: async row => {
                            console.log(row, ' ss');
                            try {
                                this.isModalOpen = true;
                                this.viewModal = row.PostID;
                                this.UpdateContent = row.PostContent;
                                this.profolio = row.PostProfolio;
                                this.tagUserID = row.tagUserID;
                                this.PostSchoolID = row.PostSchoolID;
                                this.PostCreatedDate = row.PostCreatedDate;
                                this.PostCreatedBy = row.PostCreatedBy;
                            } catch (error) {
                                // log error
                                console.log(error);
                            }

                        },
                        label: ''
                    }
                    ]
                },
                selectedRow: null,
                results: null,
                actionStatus: "",
                UpdateContent: "",
                profolio: "",
                PostSchoolID: "",
                PostCreatedDate: "",
                PostCreatedBy: "",
                systemmsgError: false,
            };
        },
        methods: {
            handleSelectionChange(rows) {
                console.log(rows);
                this.selectedRows = rows;
            },
            showModal() {
                this.isModalOpen = true;
            },
            async getPendingPost() {
                try {
                    const response = await DataSource.shared.pendingPost();
                    if (response) {
                        this.list = response.Table;
                        switch (response.code) {
                            case "2":
                                this.results = `No Record Found`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "88":
                                this.results = `Please login`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const saveResponse = await DataSource.shared.updatePost(this.postContent, this.actionStatus, this.postID, this.profolio, this.tagUserID, this.tagClassID, this.tagLevelID);
                    console.log(saveResponse);
                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.results = `Post updated`;
                                break;
                            case "88":
                                this.results = `Request Rejected / Post has been approved`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                this.systemmsgError = true;
                                break;
                            // default:
                            //     alert("Please try again later");
                            //     this.results = JSON.stringify(response);
                        }
                    }
                } catch (e) {
                    this.error = e;
                }

            },
            async handleClick(command) {

                // if clicked dropdown button is approve
                if (command === "approve") {
                    try {
                        // loop selected rows and call approve api one by one, lol
                        for (const row of this.selectedRows) {
                            const response = await DataSource.shared.approvePost(row.PostApproverID, "Approved");
                        }

                        // update pending post view on success
                        this.getPendingPost();
                    } catch (error) {
                        // log error
                        console.log(error);
                    }
                }
            },
        },
        async mounted() {
            this.getPendingPost();
        }
        ,
    }
    ;
</script>

<style scoped>
</style>
<style>
    thead.vs-table--thead th {
        width: auto;
        text-align: center !important;
    }

    .vs-table--tbody-table .tr-table td {
        text-align: left;
    }

    h4.title {
        text-align: left;
        font-weight: bold;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #ffffff !important;
        border-radius: 3px !important;
    }

    .el-table--enable-row-hover .el-table__body tr:hover {
        box-shadow: 0px 0px 10px -5px #848484 !important;
    }

    .sc-table {
        padding: 20px !important;
    }

    .pagination-bar {
        margin: 10px 0px;
        background: white;
        padding: 10px 0px;
    }


    .modal-title:before {
        content: "\F040 ";
        font-family: fontawesome;
        background: #f3415924;
        color: #f34159;
        border-radius: 35px;
        width: 30px;
        height: 30px;
        display: inline-block;
        font-size: 15px;
        line-height: 30px;
        margin-right: 10px;
    }
    .action-list button:focus {
        color: #67c23a;
    }

</style>