<template lang="html">
    <!--<div id="header">-->
    <!--<div class="top-menu">-->
    <!--<div class="top-menu__item">-->
    <!--<router-link :to="{ name: 'Home'}">Home Page</router-link>-->
    <!--</div>-->
    <!--<div class="top-menu__item">-->
    <!--<router-link :to="{ name: 'Login'}">Login Page</router-link>-->
    <!--<div class="top-menu__subitem">-->
    <!--<router-link :to="{ name: 'Reset Password'}">Reset Password</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="top-menu__item">-->
    <!--<router-link :to="{ name: 'CountryList'}">Country List Page</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div>
    <div id="parentx-static" class="header" >

        <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active">

            <div class="header-sidebar" slot="header">
                <img src="../assets/kagami.jpg" />
            </div>

            <vs-sidebar-item index="1" icon="dashboard" :to="{ name: 'Home'}">
                Dashboard
            </vs-sidebar-item>

            <vs-sidebar-item index="2" icon="dashboard" :to="{ name: 'Parent Registration'}">
                Parent Registration
            </vs-sidebar-item>

            <vs-sidebar-item index="3" icon="dashboard">
                Document
            </vs-sidebar-item>
            <vs-sidebar-item index="4" icon="dashboard"  :to="{ name: 'Student List'}">
                Student
            </vs-sidebar-item>
            <vs-sidebar-item index="5" icon="dashboard"  :to="{ name: 'Parent List'}">
                Parent
            </vs-sidebar-item>

            <vs-sidebar-group title="Post" icon="dashboard">
                <vs-sidebar-item index="6.1" icon="dashboard"  :to="{ name: 'Staff Post'}">
                    Staff Post
                </vs-sidebar-item>
                <vs-sidebar-item index="6.2" icon="dashboard"  :to="{ name: 'Parent Post'}">
                    Parent Post
                </vs-sidebar-item>
                <vs-sidebar-item index="6.3" icon="dashboard" :to="{ name: 'Save Post'}">
                    Save Post
                </vs-sidebar-item>
                <vs-sidebar-item index="6.4" icon="dashboard" :to="{ name: 'Pending Post'}">
                    Pending Post
                </vs-sidebar-item>
                <vs-sidebar-item index="6.5" icon="dashboard" :to="{ name: 'Update Post'}">
                    Update Post
                </vs-sidebar-item>
            </vs-sidebar-group>
            <vs-sidebar-group title="Approver" icon="dashboard">
                <vs-sidebar-item index="7.1" icon="dashboard" :to="{ name: 'Approver'}">
                    Approver List
                </vs-sidebar-item>
                <vs-sidebar-item index="7.2" icon="dashboard" :to="{ name: 'Save Approver'}">
                    Save Approver
                </vs-sidebar-item>
                <vs-sidebar-item index="7.3" icon="dashboard" :to="{ name: 'Update Approver'}">
                    Update Approver
                </vs-sidebar-item>
            </vs-sidebar-group>

            <div class="footer-sidebar" slot="footer">
                <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
                <vs-button icon="settings" color="primary" type="border"></vs-button>
            </div>

        </vs-sidebar>
    </div></div>

</template>

<script>
    export default {
        name: 'Header',
        data:()=>({
            active:false
        }),
        // data() {
        //     return {
        //         isSideBarOpen: false
        //     };
        // },
        // methods: {
        //     toggleSideBar: function () {
        //         this.isSideBarOpen = !this.isSideBarOpen; // toggle, true to false, false to true
        //     }
        // }
    };
</script>

<style >
    #header {
        background: #fff;
        text-align: center;
        padding: 15px;
        position: fixed;
        width: 100%;
    }

    .top-menu a {
        padding: 2px 5px;
    }
    #parentx-static {
        overflow: hidden;
        position: absolute;
        width: 260px;
    }
    header.vs-sidebar--header{
        background: #f8f6f7 !important;
    }
    .header-sidebar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }
    .header-sidebar h4 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .header-sidebar h4 > button {
        margin-left: 10px;
    }
    .footer-sidebar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .footer-sidebar > button {
        border: 0px solid rgba(0,0,0,0) !important;
        border-left: 1px solid rgba(0,0,0,0.07) !important;
        border-radius: 0px !important;
    }
    .vs-sidebar--background {
        z-index: 0 !important;
        background: #413f56 !important;
    }

    .vs-sidebar {
        background: transparent !important;
    }

    .vs-sidebar--item a {
        color: white !important;
    }

    .footer-sidebar > button {
        color: white !important;
    }

    .footer-sidebar > button:hover {
        color: #eb4052 !important;
    }

    .vs-divider--text {
        background: transparent !important;
        color: white !important;
    }

    .vs-divider .after, .vs-divider .before {
        border-color: #504e68 !important;
    }
    .vs-navbar--item span {
        display: none !important;
    }
    .vs-sidebar-group h4 {
        color: white;
        opacity: 0.8;
        font-size: .85rem !important;
    }
</style>
