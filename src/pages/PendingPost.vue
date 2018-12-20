<template>
    <div id="staff-post" class="mt-3 container">
        <div>
            <h4>PENDING POST</h4>
            <b>result:</b> {{results}}
            <div v-for="object in list" :key="object.ID">
                {{object.ID}}-{{object.PostID}}-{{object.PostContent}}-{{object.PostStatus}}-
                {{object.PostSchoolID}}-
                {{object.PostProfolio}}-
                {{object.PostCreatedDate}}-
                {{object.PostCreatedBy}}
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
                ID: ""
            }
        },
        async mounted() {
            const response = await DataSource.shared.pendingPost();
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
        },
    };
</script>

<style scoped>
</style>