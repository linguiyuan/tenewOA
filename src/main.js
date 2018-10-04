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
// axios.defaults.headers.common["Authorization-Token"] = '';
// http request 拦截器x`
// axios.interceptors.request.use(
//     config => {
//         config.withCredentials = true
        //
        // if (sessionStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.common['Authorization-Token'] = 'tmd';
        // }
    //     return config;
    // },
    // err => {
    //     return Promise.reject(err);
    // });
// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     sessionStorage.removeItem('token')
//                     router.replace({
//                         path: 'login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//         return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     });

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
