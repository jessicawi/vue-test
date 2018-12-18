import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import "./custom.css"
import vbclass from 'vue-body-class'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuesax);
Vue.use(vbclass, router);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
