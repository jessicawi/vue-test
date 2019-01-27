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
import pendingPost from "../pages/PendingPost";
import parentRegister from "../pages/ParentRegister";
import getApproverMaster from "../pages/Approver";
import attendanceList from "../pages/AttendanceList";
import testPage from "../pages/test";
import gallery from "../pages/Gallery";

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
            path: '/post/pending',
            name: 'Pending Post',
            component: pendingPost,
        },
        {
            path: '/approver',
            name: 'Approver',
            component: getApproverMaster,
        },
        {
            path: '/attendancelist',
            name: 'Attendance List',
            component: attendanceList,
        },
        {
            path: '/test-page',
            name: 'Test',
            component: testPage
        },
        {
            path: '/Gallery',
            name: 'Gallery',
            component: gallery
        },
    ]
});

export default router;