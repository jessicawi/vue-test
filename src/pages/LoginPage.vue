<template>
    <div id="Login" class="content">
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
                            <span>Don't have an account? <a href="/register/parent">Find out how</a> </span>
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
                                <button class="btn btn-primary btn-lg btn-block login-btn" type="submit" v-show="isLoading===false" :class="{ 'd-none': redirecting===true }">
                                    Login
                                </button>
                                <div class="loading mb-4" v-if="isLoading===true">
                                    <div class="load-3">
                                        <div class="line"></div>
                                        <div class="line"></div>
                                        <div class="line"></div>
                                    </div>
                                </div>
                                <small><a href="/reset-email">Forgot password</a></small>
                            </div>
                        </div>
                    </form>
                    <!--<div class="social-wrap row">-->
                        <!--<div class="col-md-6 pr-2">-->
                            <!--<a class="social-item facebook">-->
                                <!--<i class="fa fa-facebook" aria-hidden="true"></i>-->
                                <!--<span>Connect with Facebook</span>-->
                            <!--</a>-->
                        <!--</div>-->
                        <!--<div class="col-md-6 pl-2">-->
                            <!--<a class="social-item twitter">-->
                                <!--<i class="fa fa-twitter" aria-hidden="true"></i>-->
                                <!--<span>Connect with Twitter</span>-->
                            <!--</a>-->
                        <!--</div>-->
                        <!--<div class="col-md-6 pr-2">-->
                            <!--<a class="social-item linkedin">-->
                                <!--<i class="fa fa-linkedin" aria-hidden="true"></i>-->
                                <!--<span>Connect with Linkedin</span>-->
                            <!--</a>-->
                        <!--</div>-->
                        <!--<div class="col-md-6 pl-2">-->
                            <!--<a class="social-item google">-->
                                <!--<i class="fa fa-google-plus" aria-hidden="true"></i>-->
                                <!--<span>Connect with Google +</span>-->
                            <!--</a>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
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
                //this.results = "<< Requesting.. >>";

                //this.usernameInput = 'cheeseng.goh';
                //this.passwordInput = 'ems121';
                try{
                    this.isLoading = true;
                    const response = await DataSource.shared.login(this.usernameInput, this.passwordInput);
                    this.redirecting = true;

                    const isParent = sessionStorage.getItem('userTypeSession');
                    console.log(response);
                    if (response) {
                        if (response.token) {
                            this.results = `Login Success, Welcome Back`;
                            if (isParent === "Parent") {
                                window.location.replace("/post/staff");
                            }else{
                                window.location.replace("/");
                            }

                        } else {
                            switch (response.code) {
                                case "2":
                                    this.results = `Invalid Email ID`;
                                    //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                    break;
                                case "3":
                                    this.results = `Invalid Password`;
                                    //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                    break;
                                case "99":
                                    this.results = `Please fill in all field`;
                                    //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                    break;
                                default:
                                    alert("Please try again later");
                                    this.results = JSON.stringify(response);
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                    this.isLoading = false;
                }
            },
        },
        mounted() {
            const isLogin = sessionStorage.getItem('authToken');
            if (isLogin && isLogin !== "null") {
                this.results = `You already logged in`;
                // window.location.replace("/");
            }
        },
        data() {
            return {
                status: "",
                usernameInput: "",
                passwordInput: "",
                results: "",
                isLoading:false,
                redirecting: ""
            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        display: none;
    }
</style>

<style>
    .login div#parentx-static,
    .login header {
        display: none;
    }
</style>
