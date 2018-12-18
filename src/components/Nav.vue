<template>
    <vs-navbar v-model="activeItem" class="nabarx topbar">
        <vs-navbar-title>
            {{$route.name}}
        </vs-navbar-title>

        <vs-spacer></vs-spacer>

        <vs-input icon="search" placeholder="Search" v-model="search"/>
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
            <a href="/login"><vs-icon icon="account_circle"></vs-icon><span>Account</span></a>
        </vs-navbar-item>
    </vs-navbar>
</template>

<script>
    export default {
        name: 'navBar',
        data() {
            return {
                activeItem: 0,
                // loginmsg: "",
            }
        },
        // mounted() {
        //     //login text
        //
        //     const isLogin = sessionStorage.getItem('authToken');
        //     if (isLogin && isLogin !== "null") {
        //         this.loginmsg = `Welcome Back`;
        //         // window.location.replace("/");
        //     }
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
</style>