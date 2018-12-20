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
import vbclass from 'vue-body-class';
// import VueUploadComponent from 'vue-file-upload-component';
import quillEditor from 'vue-quill-editor'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuesax);
Vue.use(vbclass, router);
// Vue.use(VueUploadComponent);
Vue.use(quillEditor);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
