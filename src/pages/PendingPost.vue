<template>
    <div id="staff-post" class="mt-3 container">
        <div>
            <h4>PENDING POST</h4>

            <div v-if="list && list.length>0">
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
    </div>

</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'PendingPost',
        data() {
            return {
                list: [],
                titles: [{
                    prop: "ID",
                    label: "ID"
                }, {
                    prop: "PostApproverID",
                    label: "Approver ID"
                }, {
                    prop: "PostContent",
                    label: "Content"
                }, {
                    prop: "PostCreatedDate",
                    label: "Created At"
                }, {
                    prop: "PostSchoolID",
                    label: "School ID"
                }, {
                    prop: "PostProfolio",
                    label: "PostProfolio"
                }, {
                    prop: "PostApproverStatus",
                    label: "Approver Status"
                }, {
                    prop: "PostStatus",
                    label: "Post Status"
                }],
                actionCol: {
                    label: 'Approved',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
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
                            } catch (error) {
                                // log error
                                console.log(error);
                            }

                        },
                        label: 'Approve'
                    }]
                },
                selectedRow: null,
                results: null
            };
        },
        methods: {
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
            }
        },
        async mounted() {
            this.getPendingPost();
        }
        ,
    }
    ;
</script>

<style>
    thead.vs-table--thead th {
        width: auto;
        text-align: center !important;
    }

    .vs-table--tbody-table .tr-table td {
        text-align: left;
    }
</style>