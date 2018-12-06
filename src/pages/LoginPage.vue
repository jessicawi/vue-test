<template>
    <div class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>
        <!--<div class="pb-5">-->
        <!--<h2>Login Test</h2>-->
        <!--<p class="lead">Fill in the form and submit to get the response from the server.</p>-->
        <!--</div>-->

        <div class="row">
            <div class="login-wrap">
                <div class="col-md-6 mb-6 login-img"><img src="../assets/login-img.jpg"/></div>
                <div class="col-md-6 mb-6 login-form">
                    <div class="login-header mb-5">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Login</h4>
                            <span>Don't have an account? <a href="">Find out how</a> </span>
                        </div>
                        <div class="col-md-2">

                        </div>
                    </div>
                    <form class="needs-validation" novalidate @submit.prevent="onSubmit">

                        <div class="mb-3">
                            <!--<label for="username">Username</label>-->
                            <input type="text" class="form-control" id="username" v-model="usernameInput"
                                   placeholder="Email ID"
                                   required>
                            <div class="invalid-feedback" style="width: 100%;">
                                Your username is required.
                            </div>
                        </div>

                        <div class="">
                            <!--<label for="password">Password</label>-->
                            <input type="password" class="form-control" id="password" v-model="passwordInput"
                                   placeholder="Password"
                                   required>
                            <div class="invalid-feedback" style="width: 100%;">
                                Your password is required.
                            </div>
                        </div>
                        <small class="d-block text-left">By signing in, you accept the terms found in our <a href="">Trust
                            Centre</a></small>
                        <div class="row d-flex mt-3">
                            <div class="col-md-6"></div>
                            <div class="col-md-6">
                                <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Login</button>
                                <small><a href="">Forgot password</a></small>
                            </div>
                        </div>
                    </form>
                    <div class="social-wrap row">
                        <div class="col-md-6">
                            <div class="social-item facebook">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                Connect with Facebook
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="social-item twitter">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                                Connect with Facebook
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="social-item linkedin">
                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                                Connect with Facebook
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="social-item google">
                                <i class="fa fa-google-plus" aria-hidden="true"></i>
                                Connect with Facebook
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-xl-6">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Request</span>
                    </h4>
                    <div class="form-group">
                            <textarea class="form-control text-request bg-white" rows="15" readonly
                                      v-model="request"></textarea>
                    </div>
                </div>
                <div class="col-xl-6">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Response {{ status }}</span>
                    </h4>
                    <div class="form-group">
                            <textarea class="form-control text-response bg-white" rows="15" readonly
                                      v-model="response"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";
    import jQuery from 'jquery';

    export default {
        computed: {
            request() {
                return JSON.stringify(this.usernameInput, null, "  ");
            },
        },
        methods: {
            async onSubmit() {
                this.response = "<< Requesting.. >>";
                const response = await DataSource.shared.login(this.usernameInput, this.passwordInput);
                console.log(response);
                if (response) {
                    switch (response.code) {
                        case "1":
                            this.response = `Login Success - ${JSON.stringify(response)}`;
                            window.location.replace("/");
                            break;
                        case "2":
                            this.response = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                            break;
                        case "3":
                            this.response = `Invalid password - sample 2: code: ${response.code}`;
                            break;
                        case "99":
                            this.response = `Please fill in all field - sample 3: code: ${response.code}`;
                            break;
                        default:
                            alert("Please try again later");
                            this.response = JSON.stringify(response);
                    }
                }
                // jQuery.ajax({
                //     dataType: "json",
                //     url: "http://local.emsv2/controller/Login.asmx/checkLogin",
                //     data:
                //         {
                //             'userID': this.usernameInput,
                //             'userPassword': this.passwordInput,
                //         },
                //     cache: false,
                //     success: function (response) {
                //         if (response) {
                //             switch (response.code) {
                //                 case "1":
                //                     this.response = `Login Success - ${JSON.stringify(response)}`;
                //                     // window.location.replace("/");
                //                     break;
                //                 case "2":
                //                     this.response = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                //                     break;
                //                 case "3":
                //                     this.response = `Invalid password - sample 2: code: ${response.code}`;
                //                     break;
                //                 case "99":
                //                     this.response = `Please fill in all field - sample 3: code: ${response.code}`;
                //                     break;
                //                 default:
                //                     alert("Please try again later");
                //                     this.response = JSON.stringify(response);
                //             }
                //         } else {
                //             alert('Error');
                //         }
                //     }.bind(this)
                // });
            },
        },
        data() {
            return {
                status: "",
                usernameInput: "",
                passwordInput: "",
                response: "",

            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .backstretch {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .backstretch img {
        max-width: 100%;
    }

    .login-wrap {
        display: flex;
        width: 80%;
        background: white;
        position: relative;
        margin: auto;
        box-shadow: 0px 0px 10px 0px;
    }

    .login-img img {
        max-width: 100%;
    }

    .login-img {
        margin: 0px -15px;
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

    body {
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
    }

    .social-item {
        background: #3b5798;
        color: #fff;
        padding: 6px 0px;
        margin: 4px 0px;
        border-radius: 4px;
        position: relative;
    }

    .login-btn {
        background: #f65151;
        border: 2px solid white;
        border-radius: 2rem;
        padding: 0.2rem 1rem;
        box-shadow: 0px 2px 3px -3px black;
    }

    .social-item i {
        font-size: 1.3rem;
        bottom: -11px;
        display: inline-block;
        left: 0px;
        position: relative;
    }

    .facebook {
        background: #3b5798;
        color: #fff;
        padding: 6px 0px;
        margin: 4px 0px;
        border-radius: 4px;
        position: relative;
    }

    .login-btn {
        background: #f65151;
        border: 2px solid white;
        border-radius: 2rem;
        padding: 0.2rem 1rem;
        box-shadow: 0px 2px 3px -3px black;
    }

    .facebook i {
        font-size: 1.3rem;
        bottom: -10px;
        display: inline-block;
        left: 0px;
        position: relative;
    }

    .social-item.twitter {
        background: #4ccdf7;
    }

    .social-item.linkedin {
        background: #0a74b7;
    }

    .social-item.google {
        background: #ce0003;
    }
</style>
