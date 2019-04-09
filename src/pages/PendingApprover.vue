<template>
    <div id="pendingapprover" >
        <div class="container">
            <div v-if="list.length>0" class="datatable_group">
                <data-tables :data="list" :action-col="actionCol" @selection-change="handleSelectionChange">
                    <el-table-column v-for="item in pendingApproverList" :prop="item.prop"
                                     :label="item.label" :key="item.prop"
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
        name: "PendingApprover",
        data() {
            return {
                list: [],
                pendingApproverList: [{
                    prop: "ApproverPendingType",
                    label: "Type"
                }, {
                    prop: "ApproverPendingContent",
                    label: "Title"
                }, {
                    prop: "ApproverPendingConName",
                    label: "Requester"
                }],
                actionCol: {
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
                            if (row.ApproverPendingType === "Portfolio") {
                                this.$router.push({
                                    name: 'Portfolio Preview',
                                    params: {
                                        portfolioID: row.ApproverItemID,
                                        mode: 'APPROVER'
                                    }
                                });
                            } else if (row.ApproverPendingType.includes("Posting - ")) {
                                this.$router.push({
                                    name: 'Post Approve',
                                    params: {
                                        postID: row.ApproverItemID,
                                        postType: row.ApproverPendingType
                                    }
                                });
                            } else {
                                alert('Error! Please try again later');
                            }
                        },
                        label: 'Action'
                    }]
                },
                selectedRow: null,
            };
        },
        async created() {
            this.getPendingApproverList();
        },
        methods: {
            handleSelectionChange(val) {
                this.selectedRow = val;
            },
            async getPendingApproverList() {
                try {
                    const response = await DataSource.shared.getPendingApprover();
                    if (response) {
                        this.list = response.Table;
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