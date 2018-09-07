import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/datastatistics'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/datastatistics',
                    component: resolve => require(['../components/page/dataDtatistics.vue'], resolve),
                    meta: { title: '实时数据' }
                },
                {
                    path: '/daydata',
                    component: resolve => require(['../components/page/dayData.vue'], resolve),
                    meta: { title: '每日数据' }
                },
                {
                    path: '/money',
                    component: resolve => require(['../components/page/money.vue'], resolve),
                    meta: { title: '转账提现' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/recharge',
                    component: resolve => require(['../components/page/recharge.vue'], resolve),
                    meta: { title: '充值' }
                },
                {
                    // 权限页面
                    path: '/manage',
                    component: resolve => require(['../components/page/manage.vue'], resolve),
                    meta: { title: '功能管理', permission: true }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
