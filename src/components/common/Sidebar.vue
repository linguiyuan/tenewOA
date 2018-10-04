<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title" v-show=item.power>
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-show=item.power>
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    let power = JSON.parse(sessionStorage.getItem('power'))
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-star-off',
                        index: '3',
                        title: '数据统计',
                        subs: [
                            {
                                index: 'datastatistics',
                                title: '实时数据',
                                power:power.datastatistics
                            },
                            {
                                index: 'daydata',
                                title: '每日数据',
                                power:power.daydata
                            },
                            {
                                index: 'oacustomer',
                                title: '客户人数',
                                power:power.customer
                            },
                        ]
                    //    各项数据(各类数据展示),每日数据(单项数据展示,按日期排序),用户数统计(记录操作日志)
                    },
                    // {
                    //     icon: 'el-icon-tickets',
                    //     index: 'dataAnalysis',
                    //     title: '数据分析',
                    //     power:power.datastatistics
                    // //    订单比,产出比
                    // },
                    // {
                    //     icon: 'el-icon-mobile-phone',
                    //     index: 'dataManage',
                    //     title: '数据管理',
                    //     power:power.dataManage
                    // //    设置分组,分组数据展示
                    // },
                    {
                        icon: 'el-icon-edit',
                        index: '2',
                        title: '提现转账',
                        subs:[
                            {
                                index: 'money',
                                title: '新建转账',
                                power:power.money,
                            },
                            {
                                index: 'moneylog',
                                title: '转账记录',
                                power:power.money,
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'manage',
                        title: '权限管理',
                        power:power.manage
                    },
                    // {
                    //     icon: 'el-icon-error',
                    //     index: '404',
                    //     title: '404页面'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 170px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
