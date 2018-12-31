import Vue from 'vue';
import VueRouter from 'vue-router';
import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";
import countryListPage from "../pages/CountryListPage";
import forgotPassword from "../pages/ForgotPassword";
import resetPassword from "../pages/ResetPassword";
import studentList from "../pages/Student";
import parentList from "../pages/ParentList";
import staffPost from "../pages/StaffPost";
import parentPost from "../pages/ParentPost";
import savePost from "../pages/savePost";
import pendingPost from "../pages/PendingPost";
import approvePost from "../pages/ApprovePost";
import updatePost from "../pages/updatePost";
import parentRegister from "../pages/ParentRegister";
import getApproverMaster from "../pages/Approver";
import saveApproverMaster from "../pages/saveApprover";
import updateApproverMaster from "../pages/updateApprover";
import testPage from "../pages/test";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: homePage
        },
        {
            path: '/login',
            name: 'Login',
            component: loginPage,
            meta: { bodyClass: 'login' }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: forgotPassword
        },
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: resetPassword
        },
        {
            path: '/student',
            name: 'Student List',
            component: studentList
        },
        {
            path: '/parent',
            name: 'Parent List',
            component: parentList
        },
        {
            path: '/register/parent',
            name: 'Parent Registration',
            component: parentRegister,
            meta: { bodyClass: 'parent-register' }
        },
        {
            path: '/post/staff',
            name: 'Latest Update (Staff)',
            component: staffPost,
        },
        {
            path: '/post/parent',
            name: 'Parent Post',
            component: parentPost,
        },
        {
            path: '/post/save',
            name: 'Save Post',
            component: savePost,
        },
        {
            path: '/post/pending',
            name: 'Pending Post',
            component: pendingPost,
        },
        {
            path: '/post/approve',
            name: 'Approve Post',
            component: approvePost,
        },
        {
            path: '/post/update',
            name: 'Update Post',
            component: updatePost,
        },
        {
            path: '/approver',
            name: 'Approver',
            component: getApproverMaster,
        },
        {
            path: '/approver/save',
            name: 'Save Approver',
            component: saveApproverMaster,
        },

        {
            path: '/approver/update',
            name: 'Update Approver',
            component: updateApproverMaster,
        },
        {
            path: '/test-page',
            name: 'Test',
            component: testPage
        }
    ]
});

export default router;