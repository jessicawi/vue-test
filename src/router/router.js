import Vue from 'vue';
import VueRouter from 'vue-router';
import loginPage from "../pages/loginPage";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
        },
        {
            path: '/login',
            name: 'Login',
            component: loginPage
        },
    ]
});

export default router;