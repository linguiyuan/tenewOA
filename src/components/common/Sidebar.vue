<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <!--<template v-if="item.subs">-->
                    <!--<el-submenu :index="item.index" :key="item.index">-->
                        <!--<template slot="title">-->
                            <!--<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>-->
                        <!--</template>-->
                        <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">-->
                            <!--{{ subItem.title }}-->
                        <!--</el-menu-item>-->
                    <!--</el-submenu>-->
                <!--</template>-->
                <!--<template v-else>-->
                    <!--<el-menu-item :index="item.index" :key="item.index">-->
                        <!--<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>-->
                    <!--</el-menu-item>-->
                <!--</template>-->
                    <el-menu-item :index="item.index" :key="item.index" v-show='!item.itype'>
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>

        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-star-off',
                        index: 'dashboard',
                        title: '系统首页',
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'tabs',
                        title: '订单详情',
                    },
                    {
                        icon: 'el-icon-mobile-phone',
                        index: 'recharge',
                        title: '充值',
                    },
                    {
                        icon: 'el-icon-edit',
                        index: 'table',
                        title: '订单处理',
                        itype:sessionStorage.getItem('role') == 'T0'?false:true
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'manage',
                        title: '功能管理',
                        itype:sessionStorage.getItem('role') == 'T0'?false:true
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
        width: 160px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
