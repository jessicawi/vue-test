import Vue from 'vue';
import VueRouter from 'vue-router';
import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";
import countryListPage from "../pages/CountryListPage";
import forgotPassword from "../pages/ForgotPassword";
import resetEmail from "../pages/ResetEmail";
import resetPassword from "../pages/ResetPassword";
import studentList from "../pages/StudentList";
import student from "../pages/Student";
import studentEditLevel from "../pages/StudentEditLevel";
import studentEditClass from "../pages/StudentEditClass";
import parentList from "../pages/ParentList";
import parent from "../pages/Parent";
import manageRelationship from "../pages/ManageRelationship";
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
import  userList from "../pages/userList";

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
            path: '/reset-email',
            name: 'resetEmail',
            component: resetEmail,
            meta: { bodyClass: 'resetEmail' }
        },
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: resetPassword,
            meta: { bodyClass: 'resetPassword' }
        },
        {
            path: '/student-list',
            name: 'Student List',
            component: studentList
        },
        {
            path: '/student',
            name: 'Student',
            component: student
        },
        {
            path: '/student-edit-level',
            name: 'Student Edit Level',
            component: studentEditLevel
        },
        {
            path: '/student-edit-class',
            name: 'Student Edit Class',
            component: studentEditClass
        },
        {
            path: '/parent-list',
            name: 'Parent List',
            component: parentList
        },
        {
            path: '/parent',
            name: 'Parent',
            component: parent
        },
        {
            path: '/manage-relationship',
            name: 'Manage Relationship',
            component: manageRelationship
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
        },
        {
            path: '/user-list',
            name: 'userList',
            component: userList
        },
    ]
});

export default router;