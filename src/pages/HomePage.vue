<template>
    <div class="Content">
        <div class="homeBg"></div>
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
            <div class="dashboard-title"><h4 class="text-left" style="color: white;">Overview</h4></div>
            <div class="row mb-3">
                <div class="col-md-3 student">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-student.png"/></div>
                        <div class="overview__desc"><span
                                class="large">{{activeStudent.length}}</span><span>Students</span></div>
                        <div class="quicklink" v-if="isParent !== 'Teacher'">
                            <a href="/student">NEW STUDENT</a>
                            <a href="/student-list?mode=Search">VIEW ALL</a>
                        </div>
                        <div class="quicklink" v-if="isParent === 'Teacher'">
                            <a href="#">CLASSES</a>
                            <a href="#">STUDENT LIST</a>
                        </div>
                    </div>

                </div>
                <div class="col-md-3 teacher">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-enroll.png"/></div>
                        <div class="overview__desc"><span
                                class="large">{{enrollment.length}}</span><span>New Enrollment</span></div>
                        <!--<div class="quicklink" v-if="isParent !== 'Teacher'">-->
                        <!--<a href="/parent-list">VIEW / EDIT PARENT</a>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="col-md-3 course">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-withdraw.png"/></div>
                        <div class="overview__desc"><span class="large">{{withdraw.length}}</span><span>Withdraw</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 attendance">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-school.png"/></div>
                        <div class="overview__desc"><span
                                class="large">{{transfer.length}}</span><span>Transferred</span></div>
                    </div>
                </div>
            </div>
            <div class="row mb-5" style="padding: 0 10px;">
                <div class="col-md-9 chartBox">
                    <div class="dashboard-title"><h4 class="text-left">Statistic</h4></div>
                    <div class="small">
                        <!--<line-chart></line-chart>-->
                        <div style="max-width: 100%;width:700px;margin: auto">
                            <bar-chart
                                    v-if="isLoaded"
                                    :chartdata="chartdata"
                                    :options="options"/>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 custom-wrapper">
                    <div class="dashboard-title"><h5 class="text-left">Recent Feed</h5></div>
                    <div class="dashboard-subtitle">
                        <el-tooltip class="item" effect="dark" content="View All Activities" placement="top-start">
                            <a href="/feed">
                                <small>VIEW ALL</small>
                            </a>
                        </el-tooltip>
                    </div>
                    <hr/>
                    <div class="dashboard-studentList">
                        <div class="" v-for="object in post" :key="`${object.PostID}`">
                            <PostComponent
                                    :parent-post="object"
                                    :hideComment="true"
                                    :isHome="true"
                            />
                            <hr/>
                        </div>
                        <!--<li><img src="../assets/thumb1.jpg"/> <span>when an unknown printer took a galley of type </span></li>-->
                    </div>
                    <!--<form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">-->
                    <!--<div class="form-group">-->
                    <!--<label for="userID">ID</label>-->
                    <!--<input type="text" class="form-control" id="userID" v-model="userID"-->
                    <!--required>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                    <!--<label for="userType">User Type</label>-->
                    <!--<select class="form-control" id="userType" v-model="userType">-->
                    <!--<option selected value="">Parent</option>-->
                    <!--<option value="">Student</option>-->
                    <!--<option value="">Teacher</option>-->
                    <!--</select>-->
                    <!--</div>-->
                    <!--<div class="">-->
                    <!--<button class="custom-btn btn btn-primary col-md-12" type="submit">Submit-->
                    <!--</button>-->
                    <!--</div>-->
                    <!--</form>-->
                </div>
            </div>

            <div class=" mb-3 home-news">
                <div class="dashboard-title"><h4 class="text-left float-left">Upcoming</h4><a class="float-right"
                                                                                              href="#">MORE </a></div>
                <div class="row">
                    <div class="col-md-4 mt-2">
                        <div class="home-news__item custom-wrapper">
                            <strong>Key facts about our school</strong>
                            <div class="thumbnail">
                                <img src="../assets/news1.jpg" title="News"/>
                            </div>
                            <div class="news-content">
                                we offer academic, social and personal success for every student. Through opportunities
                                to learn from the best, experiences beyond the ordinary, and the encouragement to
                                achieve
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
                                to learn from the best, experiences beyond the ordinary, and the encouragement to
                                achieve
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
                                to learn from the best, experiences beyond the ordinary, and the encouragement to
                                achieve
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
    import PostComponent from "../components/postCompnent";
    import barChart from "../components/charts/barChart.vue";
    import {countDuplicates} from "../helper/utily";
    import Cookies from "js-cookie";

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
                height: 200,
                isParent: "",
                activeStudent: "",
                enrollment: "",
                withdraw: "",
                transfer: "",
                post: [],
                isLoaded: false,
                countedCrs: {},
                chartdata: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Students by Crs',
                            backgroundColor: ['rgba(255, 99, 132, 0.6)','rgba(0, 123, 255, 0.6)','rgba(23, 162, 184, 0.6)','rgba(255, 193, 7, 0.6)','rgba(237, 33, 124, 0.6)','rgba(0, 186, 255, 0.6)','rgba(18, 189, 215, 0.6)','rgba(255, 181, 0, 0.6)','rgba(154, 244, 23, 0.6)'],
                            hoverBackgroundColor: ['rgba(255, 99, 132, 1)','rgba(0, 123, 255, 1)','rgba(23, 162, 184, 1)','rgba(255, 193, 7, 1)','rgba(237, 33, 124, 1)','rgba(0, 186, 255, 1)','rgba(18, 189, 215, 1)','rgba(255, 181, 0, 1)','rgba(154, 244, 23, 1)'],
                            borderColor: 'rgba(237, 240, 244, 1)',
                            borderWidth: 5,
                            data: []
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            barPercentage: 0.8
                        }]
                    }
                }
            };
        },
        components: {
            PostComponent,
            barChart
            // Step,
            // LineChart
        },
        async mounted() {
            try {
                this.isParent = Cookies.get('userTypeSession');
                this.showSession();
                // user menu
                if (this.isParent !== "Parent") {
                    this.results = response;

                    // window.location.replace("/");
                }
                let response = await DataSource.shared.getUserMenu();
                this.list = response.Table;

                this.usermenu = response;
                //login text

                const isLogin = Cookies.get('authToken');
                if (isLogin && isLogin !== "null") {
                    this.results = `You already logged in`;
                    // window.location.replace("/");
                }
                // Overwriting base render method with actual data.
                setInterval(() => {
                    this.fillData();
                }, 2000);


                // activeStudent
                let activeStudentResponse = await DataSource.shared.getAllActiveStudentsBySchool();
                if (activeStudentResponse.Table) {
                    this.activeStudent = activeStudentResponse.Table;
                    const crsNames = activeStudentResponse.Table.map(d => d.CRS_Course_Name);
                    this.chartdata.labels = [...new Set(crsNames)];
                    this.countedCrs = countDuplicates(crsNames);
                    this.chartdata.datasets[0].data = await this.chartdata.labels.map(d => {
                        for (let key in this.countedCrs) {
                            if (d === key) {
                                return this.countedCrs[d];
                            }
                        }
                    });
                }

                //enrollment
                let enrollmentResponse = await DataSource.shared.getStudentEnrollment();
                if (enrollmentResponse.Table) {
                    this.enrollment = enrollmentResponse.Table;
                }

                //withdraw
                let withdrawResponse = await DataSource.shared.getWithdrawStudent();
                if (withdrawResponse.Table) {
                    this.withdraw = withdrawResponse.Table;
                }

                //transfer
                let transferResponse = await DataSource.shared.getTransferStudent();
                if (transferResponse.Table) {
                    this.transfer = transferResponse.Table;
                }

                // graph

                //feed
                if (this.isParent === "Parent") {
                    let Parentresponse = await DataSource.shared.getParentPost();
                    if (Parentresponse.Table) {
                        for (let item of Parentresponse.Table) {
                            const fileRes = await DataSource.shared.getPostFile(item.PostID);
                            if (fileRes.Table) {
                                item.postFiles = fileRes.Table;
                            }
                        }
                        this.post = Parentresponse.Table;
                    }
                } else {
                    let Staffresponse = await DataSource.shared.getStaffPostHome();
                    if (Staffresponse.Table) {
                        for (let item of Staffresponse.Table) {
                            const fileRes = await DataSource.shared.getPostFile(item.PostID);
                            if (fileRes.Table) {
                                item.postFiles = fileRes.Table;
                            }
                        }
                        this.post = Staffresponse.Table;
                    }
                }

                this.isLoaded = true;
            } catch (e) {
                console.log(e);
            }
        },
        // mounted() {
        //     this.showSession()
        // },
        methods: {
            showSession: async function () {
                this.token = Cookies.get('authToken') || "no token";
                this.userType = Cookies.get('userTypeSession');
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
        position: relative;
        margin-top: 30px;
    }

    .overview__item {
        background: white;
        margin: 20px 10px;
        padding: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-radius: 5px;
        align-items: center;
        position: relative;
        overflow: hidden;
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

    .student, .teacher, .course, .attendance {
        padding: 0px;
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
        background: #fff;
        padding: 20px;
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
        width: 100%; position: relative;
    }
</style>
