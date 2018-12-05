import Vue from 'vue';
import VueRouter from 'vue-router';
import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";
import countryListPage from "../pages/CountryListPage";

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
            component: loginPage
        },
        {
            path: '/countries',
            name: 'CountryList',
            component: countryListPage
        },
    ]
});

export default router;