<template>
    <div id="manage">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i> 权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" @click='changeBox'>新增/修改</el-button>
        </div>
        <el-dialog
            title="新增/修改用户"
            :visible.sync="dialogVisible"
            width="40%">
            <div class='addUserBox'>
                <p>
                    <span>设置用户名:</span>
                    <input type="text">
                </p>
                <p>
                    权限设置:
                </p>
                <p class='cheackBox'>
                    <template>
                        <el-checkbox v-model="power.datastatistics1">实时数据(可视)</el-checkbox>
                        <el-checkbox v-model="power.daydata1">每日数据(可视)</el-checkbox>
                        <el-checkbox v-model="power.oacustomer1">客户人数(可视)</el-checkbox>
                        <el-checkbox v-model="power.order1">订单比(可视)</el-checkbox>
                        <el-checkbox v-model="power.achievement1">员工绩效(可视)</el-checkbox>
                        <el-checkbox v-model="power.profits1">股东收益(可视)</el-checkbox>
                        <el-checkbox v-model="power.moneylog1">转账记录(可视)</el-checkbox>
                        <el-checkbox v-model="power.devices1">设备管理(可视)</el-checkbox>
                        <el-checkbox v-model="power.datastatistics2">实时数据(操作)</el-checkbox>
                        <el-checkbox v-model="power.daydata2">每日数据(操作)</el-checkbox>
                        <el-checkbox v-model="power.oacustomer2">客户人数(操作)</el-checkbox>
                        <el-checkbox v-model="power.order2">订单比(操作)</el-checkbox>
                        <el-checkbox v-model="power.achievement2">员工绩效(操作)</el-checkbox>
                        <el-checkbox v-model="power.profits2">股东收益(操作)</el-checkbox>
                        <el-checkbox v-model="power.money">新建转账(操作)</el-checkbox>
                        <el-checkbox v-model="power.devices2">设备管理(操作)</el-checkbox>
                        <el-checkbox v-model="power.manage">权限管理(操作)</el-checkbox>
                        <el-checkbox v-model="power.operationlog">操作日志(操作)</el-checkbox>
                    </template>
                </p>
            </div>
            <div class="bnt_box">
                    <el-button type="primary">修改用户</el-button>
                    <el-button type="primary">新增用户</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'manage',
        data: function () {
            return {
                dialogVisible: false,
                power: {
                    datastatistics1: false,//实时数据
                    daydata1: false,//每日数据
                    oacustomer1: false,//客户人数
                    order1: false,//订单比
                    achievement1: false,//员工绩效
                    profits1: false,//股东收益
                    moneylog1: false,//转账记录
                    devices1: false,//设备管理
                    datastatistics2: false,//实时数据
                    daydata2: false,//每日数据
                    oacustomer2: false,//客户人数
                    order2: false,//订单比
                    achievement2: false,//员工绩效
                    profits2: false,//股东收益
                    money: false,//新建转账
                    devices2: false,//设备管理
                    manage: false,//权限管理
                    operationlog: false,//操作日志
                },
                userList:[
                    {
                        name:'用户名称',
                        power:'实时数据,每日数据......',//已开通权限
                    },
                    {
                        code:0,//0表示请求成功,1表示请求失败
                        message:null,//请求失败信息,成功则空
                        data:
                        {//后台接收的数据
                            type:1,//1表示新增,2表示修改
                            token:'token值',
                            username:'用户名',
                            power: {
                                datastatistics1: false,//实时数据
                                daydata1: false,//每日数据
                                oacustomer1: false,//客户人数
                                order1: false,//订单比
                                achievement1: false,//员工绩效
                                profits1: false,//股东收益
                                moneylog1: false,//转账记录
                                devices1: false,//设备管理
                                datastatistics2: false,//实时数据
                                daydata2: false,//每日数据
                                oacustomer2: false,//客户人数
                                order2: false,//订单比
                                achievement2: false,//员工绩效
                                profits2: false,//股东收益
                                money: false,//新建转账
                                devices2: false,//设备管理
                                manage: false,//权限管理
                                operationlog: false,//操作日志
                            },
                        },
                    }
                ],

            }
        },
        methods: {
            //显示弹出框
            changeBox: function () {
                this.dialogVisible = true;
            },
            addUser: function () {

            }
        }
    }
</script>

<style lang='scss'>
    #manage {
        h1 {
            text-align: center;
            margin: 30px 0;
        }
        .logout {
            color: #409EFF;
        }
        .addUserBox {
            p {
                margin-bottom: 10px;
            }
            .cheackBox {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .el-checkbox {
                    margin: 0px 12px;
                }
            }
        }
        .bnt_box{
            display: flex;
            flex-direction: row-reverse;
            button{
                margin-left: 20px;
            }
        }
    }
</style>
