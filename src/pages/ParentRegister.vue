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

                            <div class="system-msg"><p>{{results}}</p>
                                <p v-if="error" style="color: red">{{error}}</p></div>
                            <div class="row d-flex mt-3 mb-5">
                                <div class="col-md-6"></div>
                                <div class="col-md-6">
                                    <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Register
                                    </button>
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
            methods: {
                async onSubmit() {
                    this.error = "";
                    //this.results = "<< Requesting.. >>";
                    try {
                        const response = await DataSource.shared.parentRegister(this.userEmail, this.userPassword, this.studentIDNo, this.studentID_Index, this.studentDOB, this.studentIDType);
                        console.log(response);
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.results = `Registration Success`;
                                    //this.results = `Login Success - ${JSON.stringify(response)}`;
                                    // window.location.replace("/");
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
                                    this.error = `Please try again later`;
                                    //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                    break;
                                default:
                                    alert("Please try again later");
                                    this.results = JSON.stringify(response);
                            }
                        }
                    } catch (e) {
                        this.error = e;
                    }

                },
            },
            data() {
                return {
                    results: "",
                    userEmail: "",
                    userPassword: "",
                    studentID_Index: "",
                    studentDOB: "",
                    studentIDType: "",
                    studentIDNo: "",
                    error: ""
                };
            },
        };


    </script>

    <style scoped>
        .backstretch {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: fixed;
        }

        .backstretch img {
            width: 100%;
            min-height: 100%;
        }

        .login-wrap {
            display: flex;
            width: 80%;
            background: #f7f6f6;
            position: relative;
            margin: auto;
            box-shadow: 0px 0px 10px 0px;
            max-width: 1200px;
        }

        .login-img {
            margin: 0px -15px;
            background: url(../assets/parent.jpg);
            background-size: cover;
            background-position: center;
        }

        .login-form {
            padding: 30px;
            margin: auto;
        }

        .login-header {
            text-align: left;
            color: #222 !important;
            margin-left: -15px !important;
            width: 100%;
            margin-right: -15px !important;
        }

        .login-header h4 {
            text-align: left;
            color: #222 !important;
            margin: 0px !important;
        }

        .login-header span {
            font-size: 0.8rem;
        }

        .login-wrap .form-control {
            border: 0px;
            border-bottom: 2px solid #ccc;
            border-radius: 0px;
            padding: 0px;
            background: transparent;
        }

        .login-btn {
            background: #f65151;
            border: 2px solid white;
            border-radius: 2rem;
            padding: 0.2rem 1rem;
            box-shadow: 0px 2px 3px -3px black;
        }

        .login-btn {
            background: #f65151;
            border: 2px solid white;
            border-radius: 2rem;
            padding: 0.2rem 1rem;
            box-shadow: 0px 2px 3px -3px black;
        }

        .login-btn:hover {
            background-color: #404040;
            border-color: #999;
        }

        .login-box {
            display: flex;
            height: 100%;
            align-items: center;
        }

        .content {
            height: calc(100vh - 90px);
        }

        div#Login {
            margin-left: -260px;
        }

        @media (max-width: 1025px) {
            .backstretch img {
                height: 100%;
                min-width: 100%;
                width: auto !important;
            }
        }

        @media (max-width: 769px) {

            .login-img {
                display: none;
            }

            .login-form {
                max-width: 100%;
                flex: 0 0 100%;
            }
        }
    </style>
    <style>
        .parent-register div#parentx-static,
        .parent-register header {
            display: none;
        }
    </style>