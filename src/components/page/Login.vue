<template>
    <div class="login-wrap">
        <div class="ms-title">铁牛时代后台管理系统</div>
        <div class='ms-login' :class="{yes:tast == 1?true:false}" v-loading="loading">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="register" @click='register()'>注册账号</p>
            </el-form>
        </div>
        <div :class="{'ms-register':true,'yes':tast == 2?true:false}" v-loading="loading2">
            <p class="ti">用户注册</p>
            <p class='tips'>用户名推荐使用手机号</p>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" style='text-align: center;'>
                <el-form-item prop="name">
                    <el-input v-model="ruleForm2.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2('ruleForm2')" style='width: 100%;'>提交</el-button>
                </el-form-item>
                <p class="register" @click='login()'>已用账号点击登录</p>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data: function(){
            var checkName = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('用户名不能为空'));
                }else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                tast:2,
                loading:false,
                loading2:false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                ruleForm2: {
                    name: '',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                rules2: {
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            // 登录
            submitForm(formName) {
                let vm = this;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.loading = true;
                        vm.$axios({
                            method:'post',
                            url:window.$g_Api+'/login',
                            data: vm.$qs.stringify(vm.ruleForm)
                        })
                           .then(function(res){
                               vm.loading  = false;
                               if(res.data.code == 0){
                                   sessionStorage.setItem('role',res.data.data.role);
                                   sessionStorage.setItem('userName',vm.ruleForm.username);
                                   vm.$router.push('/');
                               }else {
                                   vm.$message.error(res.data.message)
                               }
                           })
                           .catch(function(err){});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //用户注册
            submitForm2: function (formName) {
                let vm = this;
                vm.$refs[formName].validate((valid) => {
                    vm.loading2 = true;
                    if (valid) {
                        vm.$axios({
                            method:'post',
                            url:window.$g_Api+'/register ',
                            data:vm.$qs.stringify(
                                {
                                    username:vm.ruleForm2.name,
                                    password:vm.ruleForm2.checkPass
                                })
                        })
                            .then(function(res){
                                vm.loading2 = false;
                                if(res.data.code == 0 ){
                                    vm.$message.success('注册成功!');
                                }else {
                                    vm.$message.error(res.data.message);
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            register: function () {
                this.tast = 1;
            },
            login: function () {
                this.tast = 2;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .login-wrap{
        width:100%;
        height:100%;
        text-align: center;
        padding-top: 40px;
    }
    .ms-title{
        text-align: center;
        font-size:30px;
        color: #fff;
        margin-bottom: 30px;
    }
    .ms-login,.ms-register{
        width:300px;
        height:160px;
        padding:30px 40px;
        border-radius: 5px;
        background: #fff;
        margin: 0 auto;
    }
    .ti{
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }
    .yes{
        display: none;
    }
    .ms-register{
        height:260px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .register{
        font-size:12px;
        line-height:30px;
        color:rgb(32, 160, 255);
        display: flex;
        justify-content: space-between;
        &:hover{
            cursor: pointer;
        }
    }
    .tips{
        font-size: 12px;
        text-align: left;
        color: #999999;
    }
</style>
