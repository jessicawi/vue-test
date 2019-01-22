<template>

    <div class="row nabarx topbar">
        <div class="col-md-4 text-left">
            <a href="/"> <img src="../assets/kagami-white.png"/></a>
            {{$route.name}}
        </div>
        <div class="col-md-8 info-menu">
            <div class="input-group search"  v-if="!isMobile()">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                </span>
            </div><!-- /input-group -->

            <li class="info-menu__item">
                <a href="#">
                    <i class="fa fa-commenting" aria-hidden="true"></i>
                    <span>Feedback</span>
                </a>
            </li>

            <li class="info-menu__item">
                <a href="#">
                    <i class="fa fa-code-fork" aria-hidden="true"></i>
                    <span>Timeline</span>
                </a>
            </li>

            <li class="info-menu__item">
                <a href="#">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <span>Calendar</span>
                </a>
            </li>

            <li class="info-menu__item">
                <vs-dropdown>
                    <a class="a-icon" href="#">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                        <span>Account</span>
                    </a>

                    <vs-dropdown-menu>
                        <vs-dropdown-item>
                            <span @click="logout">Logout</span>
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>
            </li>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'navBar',
        data() {
            return {
                // isLoading: true,
                // token: null,
                // isLoggedIn: null
            };
        },
        methods: {
            logout() {
                DataSource.shared.logout();
            },

            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        // mounted() {
        //     const isLogin = sessionStorage.getItem('authToken');
        //     if (this.$route.path !== "/login" && (!isLogin || isLogin === "null")) {
        //         this.$router.push('/login');
        //     } else if (isLogin) {
        //         this.isLoggedIn = true;
        //         setTimeout(this.warningLogout, 10800); // 3 hours
        //     }
        //     this.isLoading = false;
        // },
    };
</script>

<style>

</style>