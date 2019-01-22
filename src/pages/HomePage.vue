<template>
    <div class="Content">
        <!--<Step/>-->
        <!--<div>-->
        <!--<b>session token:</b> {{token}}<br/><br/>{{userType}}<br/><br/>-->
        <!--<div v-for="object in list" :key="object.UserIDSession">-->
        <!--{{object.UserIDSession}}-->
        <!--</div>-->
        <!--<h4>USER MENU</h4>-->
        <!--<div style="height: 100px;overflow-y: scroll;width:80%;margin: auto;border:1px solid;">{{usermenu}}</div>-->
        <!--</div>-->
        <div class="container">
            <div class="dashboard-title"><h4 class="text-left">Overview</h4></div>
            <div class="row mb-3">
                <div class="col-md-3 student">
                    <div class="overview__item">
                        <div class="overview__icon"><i class="fa fa-graduation-cap" aria-hidden="true"></i></div>
                        <div class="overview__desc"><span class="large">58888</span><span>Students</span></div>
                    </div>
                </div>
                <div class="col-md-3 teacher">
                    <div class="overview__item">
                        <div class="overview__icon"><i class="fa fa-users" aria-hidden="true"></i></div>
                        <div class="overview__desc"><span class="large">5684</span><span>Teachers</span></div>
                    </div>
                </div>
                <div class="col-md-3 course">
                    <div class="overview__item">
                        <div class="overview__icon"><i class="fa fa-file" aria-hidden="true"></i></div>
                        <div class="overview__desc"><span class="large">300</span><span>Courses</span></div>
                    </div>
                </div>
                <div class="col-md-3 attendance">
                    <div class="overview__item">
                        <div class="overview__icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                        <div class="overview__desc"><span class="large">52365</span><span>Attendance</span></div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-9">
                    <div class="dashboard-title"><h4 class="text-left">Statistic</h4></div>
                    <div class="small">
                        <line-chart></line-chart>
                    </div>
                </div>

                <div class="col-md-3 custom-wrapper">
                    <div class="dashboard-title"><h4 class="text-left">Search Information</h4></div>
                    <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="userID">ID</label>
                            <input type="text" class="form-control" id="userID" v-model="userID"
                                   required>
                        </div>
                        <div class="form-group">
                            <label for="userType">User Type</label>
                            <select class="form-control" id="userType" v-model="userType">
                                <option selected value="">Parent</option>
                                <option value="">Student</option>
                                <option value="">Teacher</option>
                            </select>
                        </div>
                        <div class="">
                            <button class="custom-btn btn btn-primary col-md-12" type="submit">Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class=" mb-3 home-news">
                <div class="dashboard-title"><h4 class="text-left float-left">Latest News</h4><a class="float-right" href="#">MORE NEWS</a> </div>
                <div class="row">
                    <div class="col-md-4 mt-2">
                        <div class="home-news__item custom-wrapper">
                            <strong>Key facts about our school</strong>
                            <div class="thumbnail">
                                <img src="../assets/news1.jpg" title="News"/>
                            </div>
                            <div class="news-content">
                                we offer academic, social and personal success for every student. Through opportunities
                                to learn from the best, experiences beyond the ordinary, and the encouragement to achieve
                                more than what they thought possible.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mt-2">
                        <div class="home-news__item custom-wrapper">
                            <strong>Key facts about our school</strong>
                            <div class="thumbnail">
                                <img src="../assets/news2.jpg" title="News"/>
                            </div>
                            <div class="news-content">
                                we offer academic, social and personal success for every student. Through opportunities
                                to learn from the best, experiences beyond the ordinary, and the encouragement to achieve
                                more than what they thought possible.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mt-2">
                        <div class="home-news__item custom-wrapper">
                            <strong>Key facts about our school</strong>
                            <div class="thumbnail">
                                <img src="../assets/news3.jpg" title="News"/>
                            </div>
                            <div class="news-content">
                                we offer academic, social and personal success for every student. Through opportunities
                                to learn from the best, experiences beyond the ordinary, and the encouragement to achieve
                                more than what they thought possible.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // import Step from "../components/Step";
    import DataSource from "../data/datasource";
    import LineChart from '../components/chart/LineChart.js';

    export default {
        name: 'homePage',
        data() {
            return {
                token: null,
                userType: null,
                list: [],
                results: "",
                usermenu: "",
                dataPoints: null,
                height: 200
            };
        },
        components: {
            // Step,
            LineChart
        },
        async mounted() {
            this.showSession();
            // user menu
            if (isParent !== "Parent") {
                this.results = response;

                // window.location.replace("/");
            }
            let response = await DataSource.shared.getUserMenu();
            this.list = response.Table;

            console.log(response);
            this.usermenu = response;
            //login text

            const isLogin = sessionStorage.getItem('authToken');
            if (isLogin && isLogin !== "null") {
                this.results = `You already logged in`;
                // window.location.replace("/");
            }
            // Overwriting base render method with actual data.
            setInterval(() => {
                this.fillData();
            }, 2000);
        },
        // mounted() {
        //     this.showSession()
        // },
        methods: {
            showSession: async function () {
                this.token = sessionStorage.getItem('authToken') || "no token";
                this.userType = sessionStorage.getItem('userTypeSession');
            },
            increaseHeight() {
                this.height += 10;
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            },
            fillData() {
                this.dataPoints = {
                    labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Attendance',
                            backgroundColor: '#f87979',
                            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                        }
                    ]
                };
            }
        },
        computed: {
            myStyles() {
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                };
            }
        }
    };
</script>

<style scoped>

    .Content {
        padding: 30px 20px;
    }

    .overview__item {
        background: white;
        margin: 20px 10px;
        padding: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-radius: 5px;
        box-shadow: 0px 0px 10px -5px;
    }

    .overview__item div {
        flex: 1;
    }

    .overview__icon i {
        background: #f5f6fa;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #f0f1f3;
        width: 50px;
        font-size: 22px;
        color: white;
    }

    .student .overview__icon i {
        background: #eb4052;
    }

    .teacher .overview__icon i {
        background: #00dcff;
    }

    .course .overview__icon i {
        background: #ffcb07;
    }

    .attendance .overview__icon i {
        background: #7b9fff;
    }

    .overview__desc .large {
        font-size: 29px;
        display: block;
        line-height: 29px;
    }

    .overview__item .overview__desc {
        flex: 2;
    }

    .custom-wrapper {
        background: #e7e8ec;
        padding: 20px;
        border-radius: 4px;
    }

    .custom-btn {
        background-color: #f13b4a;
        border-color: #f13b4a;
    }

    .custom-btn:hover,
    .custom-btn:focus,
    .custom-btn:active {
        background-color: #828282 !important;
        border-color: #828282 !important;
        -webkit-box-shadow: 0 0 0 0.2rem rgb(204, 204, 204) !important;
        box-shadow: 0 0 0 0.2rem rgb(204, 204, 204) !important;
    }

    .thumbnail img {
        max-width: 100%;
    }

    .home-news__item {
        background: white !important;
    }

    .home-news__item strong {
        font-size: 16px;
        margin-bottom: 10px;
        display: block;
    }

    .thumbnail {
        width: 80%;
        margin: 20px auto;
    }

    .dashboard-title {
        display: table;
        width: 100%;
    }
</style>
