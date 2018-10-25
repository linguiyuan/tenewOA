<template>
    <div id="manage">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container wap">
            <el-button type="primary" @click='changeBox(1)'>+新增用户</el-button>
            <div class="userlist_box">
                <table>
                    <thead>
                    <tr>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>小组类型</th>
                        <th>操作</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for='item in userlist' :key='item.id'>
                        <td>{{item.username}}</td>
                        <td>{{item.password}}</td>
                        <td>{{item.group}}</td>
                        <td><el-button type="primary" @click='changeBox(2,item.id)'>查看修改</el-button></td>
                        <td><el-button type="danger" @click='del(item.id)'>删除用户</el-button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="40%">
            <div class='addUserBox'>
                <p>
                    <span style='display: inline-block;width: 80%;'>设置用户名:</span>
                    <input type="text" v-model='username'>
                    <br>
                    <span style='display: inline-block;width: 80%; margin-top: 8px;'>设置密码:</span>
                    <input type="text" v-model='password'>
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
                <el-button type="primary" @click='setUser()' v-if='t1'>新增用户</el-button>
                <el-button type="primary" @click='reviseUser()' v-else>修改用户</el-button>
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
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                title:'',
                userlist:[],
                username:null,
                password:null,
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
                t1:true,
                id:null
            }
        },
        mounted: function () {
            this.getuserlist();
        },
        methods: {
            //显示弹出框
            changeBox: function (type,id) {
                let vm = this;
                let url;
                vm.id = null;
                if(type == 1){
                    vm.power = []
                    vm.t1 = true;
                    vm.title = '新增用户'
                }else if(type == 2){
                    vm.id = id;
                    vm.t1 = false;
                    vm.title = '修改用户';
                    let ac;
                    for(let i = 0 ,len =vm.userlist.length; i < len; i++){
                       if(vm.userlist[i].id == id){
                           ac = i;
                           break;
                       }else {
                           continue;
                       }
                    }
                    vm.power = vm.userlist[ac].auth;
                    vm.password = vm.userlist[ac].password;
                    vm.username = vm.userlist[ac].username;
                }
                this.dialogVisible = true;
            },
            setUser: function () {
                let vm = this;
                let url = window.$g_Api+'/oa/manage/edituser';
                let data = vm.$qs.stringify({
                    token:vm.token,
                    uid:vm.uid,
                    username:vm.username,
                    password:vm.password,
                    power:vm.power
                })
                vm.userApi(url,data,'新增用户成功');
            },
            reviseUser: function () {
                let vm = this;
                let url = window.$g_Api+'/manage/update_user_info'
                let data = vm.$qs.stringify({
                    token:vm.token,
                    uid:vm.uid,
                    username:vm.username,
                    password:vm.password,
                    power:vm.power,
                    id:vm.id
                })
                vm.userApi(url,data,'修改用户成功!');
            },
            userApi: function (url,data,resultMessage) {
                let vm = this;
                if(!vm.username || !vm.password){
                    vm.$message.warning('用户名和密码不能为空');
                    return false;
                }
                vm.$axios({
                    method:'post',
                    url:url,
                    data:data
                })
                    .then(function(res){
                        if(res.data.code == 0){
                            vm.$message.success(resultMessage)
                        }else {
                            vm.$message.error(res.data.message)
                        }
                    })
                    .catch(function(err){
                        console.error(err);
                    });
            },
            del: function (id) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/manage/remove_user',
                    data:vm.$qs.stringify({
                        token:vm.token,
                        uid:vm.uid,
                        id:id
                    })
                })
                   .then(function(res){
                       if(res.data.code == 0){
                           vm.$message.success('删除成功!');
                           vm.getuserlist();
                       }
                   })
                   .catch(function(err){});
            },
            getuserlist: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/manage',
                    data:vm.$qs.stringify({
                        token:vm.token,
                        uid:vm.uid,
                    })
                })
                   .then(function(res){
                       if(res.data.code == 0){
                           vm.userlist = res.data.data;
                       }else {
                           console.error(res.data.message);
                       }
                   })
                   .catch(function(err){console.error(err);});
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
        .wap{
            min-height: 600px;
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
        .userlist_box{
            table{
                text-align: left;
                border-collapse: collapse;
                tr{
                    height: 60px;
                    line-height: 60px;
                    border-bottom: 1px solid #cccccc;
                    th,td{
                        width: 200px;
                        padding-left: 8px;
                    }
                }
            }
        }
    }
</style>
