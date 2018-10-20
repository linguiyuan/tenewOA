import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import qs from 'qs'
import "babel-polyfill";
import vfilters from './components/common/vfilters'
Vue.use(ElementUI, { size: 'small' });
//http请求配置
axios.defaults.withCredentials=true;
axios.defaults.headers={
    "Content-Type": "application/x-www-form-urlencoded"
}
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
for(let key in vfilters){
    Vue.filter(key,vfilters[key]);
}
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token');
    if(!token && to.path !== '/login'){
        next('/login');
    }else {
        next();
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
