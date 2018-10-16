<template>
    <div id='oacustomer' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：客户人数</p>
        <el-button type="primary" style="margin-bottom:10px" @click="dialogVisible = true">添加</el-button>
        <div class="my_table_box">
            <template>
                <el-table
                    :data="content"
                    stripe
                    height="450"
                    style="width: 100%">
                    <el-table-column v-for='(value,key,index) in title' :key='index'
                                     highlight-current-row= true
                                     :fixed='index<2?true:false'
                                     :label="value"
                                     :min-width="index==1?'180':'160'">
                        <template slot-scope="scope">
                            <span v-if="key == 't0'">{{scope.row[key]}}</span>
                            <span v-else style='display: block;width: 100%;height: 100%;' @click='reviseData(scope.row["t0"],title["t"+index],scope.row["t"+index])'>
                                {{scope.row['t'+index]}}
                                <sup
                                    :class="(scope.row['t'+index]-scope.row['t'+(index+1)]>0?'sub1':'sub2')"
                                    style='margin-left: 6px;'>{{[(scope.row['t'+index]),(scope.row['t'+(index+1)])] | setSub()}}
                                </sup>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            width="30%">
            <span>新备注:</span>
            <input type="text" v-model='addName'>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewName(addName)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改数据"
            :visible.sync="dialogVisible1"
            width="30%">
            <p>
                <span>备注:</span>
                <span>{{reviseName}}</span>
            </p>
            <p style="margin: 15px 0;">
                <span>日期:</span>
                <span>{{reviseTime}}</span>
            </p>
            <p>
                <span>人数:</span>
                <input type="text" v-model='reviseNumber'>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addNewName(reviseName,reviseTime,reviseNumber)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'oacustomer',
        data() {
            return {
                title:null,
                content:null,
                propArr:[],
                dialogVisible: false,
                dialogVisible1: false,
                at:null,
                addName:null,
                reviseName:null,
                reviseTime:null,
                reviseNumber:null,
            }
        },
        mounted: function () {
            this.getAxios()
        },
        computed: {},
        methods:{
            getEveryDay: function () {
                let vm = this;
                vm.at = null
                vm.getAxios()
            },
            getAxios: function (data,nb) {
                let vm = this;
                if(nb){
                    vm.at = nb;
                }
                if(!data){
                    data = {token:sessionStorage.getItem('token')}
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/customer',
                    data:vm.$qs.stringify(data)
                })
                    .then(function(res){
                        if(res.data.code == 0){
                            vm.content = res.data.data.content;
                            vm.title = res.data.data.title;
                        }else {
                            vm.$message.error(res.data.message);
                        }

                    })
                    .catch(function(err){});
            },
            addNewName: function (name,time,data) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/customerstatistics',
                    data:vm.$qs.stringify({
                        username:name,
                        time:time,
                        data:data,
                        token:sessionStorage.getItem('token')
                    })
                })
                   .then(function(res){
                       if(res.data.code == 0){
                           if(!time && !data){
                               vm.dialogVisible = false;
                           }else {
                               vm.dialogVisible1 = false;
                           }
                           vm.getAxios()
                       }else {
                           vm.$message.error(res.data.message);
                       }
                   })
                   .catch(function(err){});
            },
            reviseData: function (name,time,data) {
                this.reviseName = name,
                this.reviseTime = time,
                this.reviseNumber = data,
                this.dialogVisible1 = true;
            }
        }
    }

</script>


<style lang='scss' scoped>
    #oacustomer{
        table,thead,tbody,tr,th,td{
            border: 1px solid #dedede;
            white-space:nowrap;
        }
        .da_header{
            display: flex;
            justify-content: flex-start;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            .shortcut{
                margin-left: 40px;
                span{
                    display: inline-block;
                    padding: 0px 20px;
                    color: #409eff;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .activate{
                    color: #e6a23c;
                }
            }
        }
        .my_table_box{
            width: 100%;
            height: 100%;
            div.cell{
                white-space:nowrap !important;
            }
            thead{
                th{
                    background-color: #50bfff;
                }
            }
            .sub1{
                color: #f56c6c;
            }
            .sub2{
                color: #5daf34;
            }
            .device{
                width: 100%;
                background-color: transparent;
                border:none;
                color: #606266;
                font-size: 12px;
            }
        }
    }
</style>
