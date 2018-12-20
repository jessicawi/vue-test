<template>
    <div id="staff-post" class="mt-3 container">
        <div>
            <h4>STAFF POST</h4>
            <b>result:</b> {{staffPostResults}}
        </div>
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
                    default:
                        alert("Please try again later");
                        this.staffPostResults = JSON.stringify(response);
                }
            }
        }
    };
</script>

<style scoped>
</style>