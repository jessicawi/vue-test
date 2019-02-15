<template>
    <div class="container-fluid">
        <div class="login-header mb-5 row">
            <div class="col-md-10">
                <h4 class="mb-3 text-muted">Parent Registration</h4>
            </div>
            <div class="col-md-2 pl-0 pr-0">
                <img src="../assets/kagami.jpg"/>
            </div>
        </div>
        <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">
            <div class="mb-3">
                <!--<label for="username">Username</label>-->
                <vs-input label-placeholder="Email ID"  class="form-control text-left" id="userEmail" v-model="userEmail" required :readonly="!emailStatus"/>
                <!--<input type="text" class="form-control" id="userEmail" v-model="userEmail"-->
                       <!--placeholder="Email ID"-->
                       <!--required :readonly="!emailStatus"/>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your Email ID is required.
                </div>
            </div>

            <div class="mb-2">
                <!--<label for="password">Password</label>-->
                <vs-input label-placeholder="Password"  type="password" class="form-control text-left" id="userPassword" v-model="userPassword"
                          required v-if="passwordStatus"/>
                <!--<input type="password" class="form-control" id="userPassword" v-model="userPassword"-->
                       <!--placeholder="Password"-->
                       <!--required v-if="passwordStatus">-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your password is required.
                </div>
            </div>


            <div class="mb-2">
                <!--<label for="password">Password</label>-->
                <vs-input label-placeholder="student ID"  type="text" class="form-control text-left" id="studentID_Index" v-model="studentID_Index"
                          required />
                <!--<input type="text" class="form-control" id="studentID_Index" v-model="studentID_Index"-->
                       <!--placeholder="student ID"-->
                       <!--required>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your student ID is required.
                </div>
            </div>

            <div class="mb-2">
                <!--<label for="password">Password</label>-->
                <!--<input type="text" class="form-control" id="studentDOB" v-model="studentDOB"-->
                       <!--placeholder="studentDOB"-->
                       <!--required>-->

                <el-date-picker
                        v-model="studentDOB"
                        type="date"
                        placeholder="student DOB">
                </el-date-picker>
                <div class="invalid-feedback" style="width: 100%;">
                    Your student DOB is required.
                </div>
            </div>

            <div class="mb-2">
                <!--<label for="password">Password</label>-->
                <!--<vs-input label-placeholder="student ID Type"  class="form-control text-left" id="studentIDType" v-model="studentIDType" required/>-->
                <vs-select
                        class="form-control"
                        id="studentIDType"
                        label="student ID Type"
                        v-model="studentIDType"
                >
                    <!--<vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in studentIDTypeList" />-->
                    <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in studentIdTypeList" />
                </vs-select>
                <!--<input type="text" class="form-control" id="studentIDType" v-model="studentIDType"-->
                       <!--placeholder="studentIDType"-->
                       <!--required>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your student ID Type is required.
                </div>
                <div class="whitespace-10"></div>
            </div>

            <div class="mb-2">
                <!--<label for="password">Password</label>-->
                <vs-input label-placeholder="Identification No"  class="form-control text-left" id="studentIDNo" v-model="studentIDNo" required/>
                <!--<input type="text" class="form-control" id="studentIDNo" v-model="studentIDNo"-->
                       <!--placeholder="Identification No"-->
                       <!--required>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your Identification No is required.
                </div>
            </div>
            <div class="system-msg"><p>{{results}}</p></div>
            <div class="row d-flex mt-3 mb-5">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                    <button class="btn btn-primary btn-lg btn-block login-btn" type="submit"
                            v-show="isLoading===false" :class="{ 'd-none': redirecting===true }">
                        Register
                    </button>
                    <div class="loading" v-if="isLoading===true">
                        <div class="load-3">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";

    export default {
        name: 'Parent_Register_Component',
        data() {
            return {
                results: "",
                userEmail: "",
                userPassword: "",
                studentID_Index: "",
                studentDOB: "",
                studentIDType: "",
                studentIDNo: "",
                error: "",
                isLoading: false,
                redirecting: "",
                studentIdTypeList:[
                    {text:'Fin',value:'Fin'},
                    {text:'Passport',value:'Passport'},
                    {text:'IC',value:'IC'},
                    {text:'Birth Certificate',value:'Birth Certificate'},
                    {text:'Others Identification',value:'Others Identification'}
                ],
            };
        },
        methods: {
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    this.isLoading = true;
                    const response = await DataSource.shared.parentRegister(this.userEmail, this.userPassword, this.studentIDNo, this.studentID_Index, this.studentDOB, this.studentIDType, this.platform, this.tokenId);
                    this.isLoading = false;
                    console.log(response);
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.results = `Registration Success`;
                                this.redirecting = true;
                                //this.results = `Login Success - ${JSON.stringify(response)}`;
                                window.location.replace("/login");
                                this.$emit("result", true);
                                break;
                            case "2":
                                this.results = `Invalid Student Info`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "3":
                                this.results = `Existing Account`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    console.log("error", e);
                    this.error = e;
                    this.isLoading = false;
                }
            },
        },
        props: {
            email: String, tokenId: String, platform: String, emailStatus: Boolean, passwordStatus: Boolean
        },
        watch: {
            email: function () {
                this.userEmail = this.email;
            }
        }
    };
</script>

<style scoped>
</style>
<style>
    .parent-register div#parentx-static,
    .parent-register header {
        display: none;
    }
</style>