<template>
    <div id="staff-post" class="mt-3 container">
        <vs-row>
            <!--<b>result:</b> {{staffPostResults}}-->
            <vs-col vs-justify="center" vs-w="8">
                <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12" v-for="object in list" :key="object.PostID">
                    <vs-card actionable class="cardx">
                        <div slot="header">
                            <h3>
                                {{object.PostContent}}
                            </h3>
                        </div>
                        <div>
                            <span>Author: {{object.PostCreatedBy}}</span>
                        </div>
                        <!--<div slot="footer">-->
                            <!--<vs-row vs-justify="flex-end">-->
                                <!--<vs-button color="primary" type="gradient" >View</vs-button>-->
                                <!--<vs-button color="danger" type="gradient">Delete</vs-button>-->
                            <!--</vs-row>-->
                        <!--</div>-->
                    </vs-card>
                </vs-col>

            </vs-col>
            <vs-col vs-justify="center" vs-w="4">
                profile here
            </vs-col>
        </vs-row>
    </div>

</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'staffPost',
        data() {
            return {
                token: null,
                userType: null,
                list: [],
                error: "",
                staffPostResults: "",
            }
        },
        // components: {Step},
        async mounted() {
            // this.showSession()
            // user menu
            this.staffPostResults = response;
            let response =  await DataSource.shared.getStaffPost();
            this.list = response.Table;
            console.log(response);
            if (response) {
                switch (response.code) {
                    case "2":
                        this.staffPostResults = `No Record Found`;
                        //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                        break;
                    case "88":
                        this.staffPostResults = `Please login`;
                        //this.results = `Invalid password - sample 2: code: ${response.code}`;
                        break;
                    case "99":
                        this.staffPostResults = `Please try again later`;
                        //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                        break;
                }
            }
        }
    };
</script>

<style scoped>
    .cardx {
        margin: 0px 15px;
        width: calc(100% - 30px);
        margin: 15px;
        margin-bottom: 20px;
    }
</style>