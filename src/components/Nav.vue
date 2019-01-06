<template>
    <vs-navbar v-model="activeItem" class="nabarx topbar">
        <vs-navbar-title>
            {{$route.name}}
        </vs-navbar-title>

        <vs-spacer></vs-spacer>

        <!--<vs-input icon="search" placeholder="Search" v-model="search"/>-->
        <vs-navbar-item index="0">
            <a href="#"><vs-icon icon="feedback"></vs-icon><span>Feedback</span></a>
        </vs-navbar-item>
        <vs-navbar-item index="1">
            <a href="#"><vs-icon icon="timeline"></vs-icon><span>Timeline</span></a>
        </vs-navbar-item>
        <vs-navbar-item index="2">
            <a href="#"><vs-icon icon="calendar_today"></vs-icon><span>Calendar</span></a>
        </vs-navbar-item>
        <vs-navbar-item index="3">
            <vs-dropdown >
                <a class="a-icon" href="#">
                    <vs-icon icon="account_circle"></vs-icon><span>Account</span>
                </a>

                <vs-dropdown-menu>
                    <vs-dropdown-item>
                        <span @click="logout">Logout</span>
                    </vs-dropdown-item>
                </vs-dropdown-menu>
            </vs-dropdown>
        </vs-navbar-item>
    </vs-navbar>
</template>

<script>
    import DataSource from "../data/datasource";
    export default {
        name: 'navBar',
        data() {
            return {
                activeItem: 0,
                // isLoading: true,
                // token: null,
                // isLoggedIn: null
            }
        },
        methods: {
            logout() {
                    DataSource.shared.logout();
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

<style >
    .login header{
        display: none;
    }
    .vs-navbar--item a {
        width: 50px;
        overflow: hidden;
    }
    .vs-navbar--item i {
        float: right;
    }
    .topbar {
        background: #413f56 !important;
        color: white;
        padding: 5px 0px;
        z-index: 999 !important;
    }

    .topbar a {
        color: white !important;
    }

    .topbar h3.vs-navbar--title {
        margin: 0px;
    }

    .topbar .vs-con-input i {
        color: #413f56;
    }

    .topbar .vs-con-input input {
        border-radius: 40px !important;
        padding: 8px 0px;
    }
    .examplex {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .examplex .a-icon {
        outline: none;
        text-decoration: none !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .examplex .a-icon i {
        font-size: 18px;
    }

</style>