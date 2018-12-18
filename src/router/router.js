import Vue from 'vue';
import VueRouter from 'vue-router';
import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";
import countryListPage from "../pages/CountryListPage";
import forgotPassword from "../pages/ForgotPassword";
import resetPassword from "../pages/ResetPassword";
import studentList from "../pages/StudentList";
import parentList from "../pages/ParentList";
import parentRegister from "../pages/ParentRegister";

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
            path: '/parent-registration',
            name: 'Parent Registration',
            component: parentRegister,
            meta: { bodyClass: 'parent-register' }
        },
        {
            path: '/countries',
            name: 'CountryList',
            component: countryListPage
        },
    ]
});

export default router;