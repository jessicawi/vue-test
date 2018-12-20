<template>
    <div id="approver" class="mt-3 container">
        <div>
            <h4>Approver List</h4>
            <b>result:</b> {{results}}
            <div v-for="object in list" :key="object.ID">
                {{object.PostApproverMasterCreatedBy}} - {{ object.PostApproverMasterID }}- {{
                object.PostApproverMasterSchoolID }}- {{ object.PostApproverMasterUserID }}
            </div>
        </div>
    </div>

</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'parentPost',
        data() {
            return {
                results: "",
                list: [],
            }
        },
        async mounted() {
            // this.showSession()
            // user menu
            // this.results = response;
            const response = await DataSource.shared.getApproverMaster();
            this.list = response.Table;
            console.log(response);
            if (response) {
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
        }
    };
</script>

<style scoped>
</style>