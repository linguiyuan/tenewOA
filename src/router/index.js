import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/datastatistics1'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/datastatistics1',
                    component: resolve => require(['../components/page/viewData/dataDtatistics1.vue'], resolve),
                    meta: { title: '实时数据1' }
                },
                {
                    path: '/daydata1',
                    component: resolve => require(['../components/page/viewData/dayData1.vue'], resolve),
                    meta: { title: '每日数据1' }
                },
                {
                    path: '/oacustomer1',
                    component: resolve => require(['../components/page/viewData/oacustomer1.vue'], resolve),
                    meta: { title: '客户人数1' }
                },
                {
                    path: '/order1',
                    component: resolve => require(['../components/page/viewData/order1.vue'], resolve),
                    meta: { title: '订单比1'}
                },
                {
                    path: '/achievement1',
                    component: resolve => require(['../components/page/viewData/achievement1.vue'], resolve),
                    meta: { title: '员工绩效1'}
                },
                {
                    path: '/profits1',
                    component: resolve => require(['../components/page/viewData/profits1.vue'], resolve),
                    meta: { title: '股东收益1'}
                },
                {
                    path: '/devices1',
                    component: resolve => require(['../components/page/viewData/devices1.vue'], resolve),
                    meta: { title: '设备管理1'}
                },
                {
                    path: '/moneylog1',
                    component: resolve => require(['../components/page/viewData/moneylog1.vue'], resolve),
                    meta: { title: '转账记录' }
                },
                {
                    path: '/datastatistics2',
                    component: resolve => require(['../components/page/operData/dataDtatistics2.vue'], resolve),
                    meta: { title: '实时数据2' }
                },
                {
                    path: '/daydata2',
                    component: resolve => require(['../components/page/operData/dayData2.vue'], resolve),
                    meta: { title: '每日数据2' }
                },
                {
                    path: '/oacustomer2',
                    component: resolve => require(['../components/page/operData/oacustomer2.vue'], resolve),
                    meta: { title: '客户人数2' }
                },
                {
                    path: '/order2',
                    component: resolve => require(['../components/page/operData/order2.vue'], resolve),
                    meta: { title: '订单比2'}
                },
                {
                    path: '/achievement2',
                    component: resolve => require(['../components/page/operData/achievement2.vue'], resolve),
                    meta: { title: '员工绩效2'}
                },
                {
                    path: '/profits2',
                    component: resolve => require(['../components/page/operData/profits2.vue'], resolve),
                    meta: { title: '股东收益2'}
                },
                {
                    path: '/money',
                    component: resolve => require(['../components/page/operData/money.vue'], resolve),
                    meta: { title: '新建转账' }
                },
                {
                    path: '/devices2',
                    component: resolve => require(['../components/page/operData/devices2.vue'], resolve),
                    meta: { title: '设备管理2'}
                },
                {
                    // 权限页面
                    path: '/manage',
                    component: resolve => require(['../components/page/manage.vue'], resolve),
                    meta: { title: '权限管理', permission: true }
                },
                {
                    path: '/operationlog',
                    component: resolve => require(['../components/page/operationlog.vue'], resolve),
                    meta: { title: '操作日志'}
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
