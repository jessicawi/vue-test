<template>
        <div id="Login" class="content">
            <div class="backstretch">
                <img src="../assets/bg.jpg"/>
            </div>

            <div class="row login-box">
                <div class="login-wrap">
                    <div class="col-md-6 mb-6 login-img"></div>
                    <div class="col-md-6 mb-6 login-form col-sm-12">
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
                                <input type="text" class="form-control" id="userEmail" v-model="userEmail"
                                       placeholder="Email ID"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your Email ID is required.
                                </div>
                            </div>

                            <div class="mb-2">
                                <!--<label for="password">Password</label>-->
                                <input type="password" class="form-control" id="userPassword" v-model="userPassword"
                                       placeholder="Password"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your password is required.
                                </div>
                            </div>


                            <div class="mb-2">
                                <!--<label for="password">Password</label>-->
                                <input type="text" class="form-control" id="studentID_Index" v-model="studentID_Index"
                                       placeholder="studentID_Index"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your studentID_Index is required.
                                </div>
                            </div>

                            <div class="mb-2">
                                <!--<label for="password">Password</label>-->
                                <input type="text" class="form-control" id="studentDOB" v-model="studentDOB"
                                       placeholder="studentDOB"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your studentIDNo is required.
                                </div>
                            </div>

                            <div class="mb-2">
                                <!--<label for="password">Password</label>-->
                                <input type="text" class="form-control" id="studentIDType" v-model="studentIDType"
                                       placeholder="studentIDType"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your studentIDNo is required.
                                </div>
                            </div>

                            <div class="mb-2">
                                <!--<label for="password">Password</label>-->
                                <input type="text" class="form-control" id="studentIDNo" v-model="studentIDNo"
                                       placeholder="studentIDNo"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your studentIDNo is required.
                                </div>
                            </div>
                            <div class="system-msg"><p>{{results}}</p></div>
                            <div class="row d-flex mt-3 mb-5">
                                <div class="col-md-6"></div>
                                <div class="col-md-6">
                                    <button class="btn btn-primary btn-lg btn-block login-btn" type="submit" v-show="isLoading===false" :class="{ 'd-none': redirecting===true }">
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
                </div>
            </div>
        </div>
    </template>

    <script>
        /* eslint-disable */
        import DataSource from "../data/datasource";

        export default {
            name: 'parentRegister',
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
                    redirecting: ""
                };
            },
            methods: {
                async onSubmit() {
                    this.error = "";
                    //this.results = "<< Requesting.. >>";
                    try {
                        this.isLoading = true;
                        const response = await DataSource.shared.parentRegister(this.userEmail, this.userPassword, this.studentIDNo, this.studentID_Index, this.studentDOB, this.studentIDType);
                        this.isLoading = false;
                        console.log(response);
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.results = `Registration Success`;
                                    this.redirecting = true;
                                    //this.results = `Login Success - ${JSON.stringify(response)}`;
                                    window.location.replace("/login");
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
                        console.log(results);
                    } catch (e) {
                        console.log("error", error);
                        this.error = e;
                        this.isLoading = false;
                    }

                },
            },
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