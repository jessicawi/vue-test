<template>
    <div class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>
        <!--<div class="pb-5">-->
        <!--<h2>Login Test</h2>-->
        <!--<p class="lead">Fill in the form and submit to get the response from the server.</p>-->
        <!--</div>-->

        <div class="row login-box">
            <div class="login-wrap">
                <div class="col-md-6 mb-6 login-img"></div>
                <div class="col-md-6 mb-6 login-form col-sm-12">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Login</h4>
                            <span>Don't have an account? <a href="">Find out how</a> </span>
                        </div>
                        <div class="col-md-2 pl-0 pr-0">
                            <img src="../assets/kagami.jpg"/>
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

                        <div class="mb-2">
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
                        <div class="system-msg"><p>{{results}}</p></div>
                        <div class="row d-flex mt-3 mb-5">
                            <div class="col-md-6"></div>
                            <div class="col-md-6">
                                <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Login</button>
                                <small><a href="">Forgot password</a></small>
                            </div>
                        </div>
                    </form>
                    <div class="social-wrap row">
                        <div class="col-md-6">
                            <a class="social-item facebook">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                <span>Connect with Facebook</span>
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a class="social-item twitter">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                                <span>Connect with Facebook</span>
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a class="social-item linkedin">
                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                                <span>Connect with Facebook</span>
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a class="social-item google">
                                <i class="fa fa-google-plus" aria-hidden="true"></i>
                                <span>Connect with Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="col-md-12">-->
            <!--<div class="row">-->
                <!--<div class="col-xl-6">-->
                    <!--<h4 class="d-flex justify-content-between align-items-center mb-3">-->
                        <!--<span class="text-muted">Request</span>-->
                    <!--</h4>-->
                    <!--<div class="form-group">-->
                            <!--<textarea class="form-control text-request bg-white" rows="15" readonly-->
                                      <!--v-model="request"></textarea>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="col-xl-6">-->
                    <!--<h4 class="d-flex justify-content-between align-items-center mb-3">-->
                        <!--<span class="text-muted">Response {{ status }}</span>-->
                    <!--</h4>-->
                    <!--<div class="form-group">-->
                            <!--<textarea class="form-control text-response bg-white" rows="15" readonly-->
                                      <!--v-model="response"></textarea>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";

    export default {
        computed: {
            request() {
                return JSON.stringify(this.usernameInput, null, "  ");
            },
        },
        methods: {
            async onSubmit() {
                this.results = "<< Requesting.. >>";
                const response = await DataSource.shared.login(this.usernameInput, this.passwordInput);
                console.log(response);
                if (response) {
                    switch (response.code) {
                        case "1":
                            this.results = `Login Success - ${JSON.stringify(response)}`;
                            // window.location.replace("/");
                            break;
                        case "2":
                            this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                            break;
                        case "3":
                            this.results = `Invalid password - sample 2: code: ${response.code}`;
                            break;
                        case "99":
                            this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                            break;
                        default:
                            alert("Please try again later");
                            this.results = JSON.stringify(response);
                    }
                }
            },
        },
        data() {
            return {
                status: "",
                usernameInput: "",
                passwordInput: "",
                results: "",

            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    }

    .login-wrap {
        display: flex;
        width: 80%;
        background: #f7f6f6;
        position: relative;
        margin: auto;
        box-shadow: 0px 0px 10px 0px;
    }

    .login-img {
        margin: 0px -15px;
        background: url(/img/login-img.014f34ad.jpg);
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
        background: transparent;
    }

    .social-item {
        background: #3b5798;
        color: #fff !important;
        padding: 6px 0px;
        margin: 4px 0px;
        border-radius: 4px;
        position: relative;
        display:block;
        transition: all 0.3s ease-in-out;
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
        margin-right: 4px;
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

    .login-btn:hover {
        background-color: #404040;
        border-color: #999;
    }

    a.social-item:hover {
        background: #404040 !important;
    }

    .system-msg p {
        background: #dbdbdb;
        margin: 10px 0px 0px;
        border-radius: 3px;
        line-height: 50px;
    }
    .login-box {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .content {
        height: calc(100vh - 90px);
    }
    @media (max-width: 1025px){
        .backstretch img {
            height: 100%;
            min-width: 100%;
            width: auto !important;
        }
        .social-item i {
            display: inline-block;
            padding: 0px 10px;
        }

        .social-item span {
            display: inline-block;
            margin: 5px 0px;
            white-space: pre-wrap;
        }

        .social-item{
            padding: 0px 10px;
        }
    }
    @media (max-width: 769px){

        .login-img {
            display: none;
        }

        .login-form {
            max-width: 100%;
            flex: 0 0 100%;
        }
    }


</style>
