<template>
    <div class="login-wrap">
        <div class="ms-title">铁牛时代订单管理系统</div>
        <div class='ms-login' v-loading="loading">
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
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data: function(){
            return {
                loading:false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
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
                            url:window.$g_Api+'/oa/login',
                            data: vm.$qs.stringify(vm.ruleForm)
                        })
                           .then(function(res){
                               vm.loading  = false;
                               if(res.data.code == 0){
                                   sessionStorage.setItem('role',res.data.data.role);
                                   sessionStorage.setItem('power',JSON.stringify(res.data.data.auth));
                                   sessionStorage.setItem('token',res.data.data.token);
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
            getName:  function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1){
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
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
    .ms-login{
        width:300px;
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
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
