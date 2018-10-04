<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i> 权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary">新增用户</el-button>
        </div>
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            width="30%">
            <span>新备注:</span>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                dialogVisible:false
            }
        }
    }
</script>

<style scoped>
h1{
    text-align: center;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
</style>
