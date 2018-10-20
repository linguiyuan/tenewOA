<template>
    <div id="moneylog">
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 转账记录</p>
        <div class="da_header">
            <p>查询时间：</p>
            <el-date-picker
                v-model="queryTime "
                type="daterange"
                align="left"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" style='margin-left: 15px;' @click='getData(queryTime[0],queryTime[1])'>点击搜索</el-button>
        </div>
        <div class="logBox">
            <table class='logtable' v-if='result' v-loading='loading'>
                <thead>
                <tr>
                    <th>金额</th>
                    <th>账户</th>
                    <th>姓名</th>
                    <th>交易编号</th>
                    <th>设备信息</th>
                    <th>交易转态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='(data,index) in result' :key='index' :class='{"error":data.status=="转账成功"?false:true}'>
                    <td>{{data.amount}}</td>
                    <td>{{data.account}}</td>
                    <td>{{data.name}}</td>
                    <td>{{data.out_biz_no}}</td>
                    <td>{{data.remark}}</td>
                    <td>{{data.status}}</td>
                </tr>
                </tbody>
            </table>
            <p v-else style='width: 100%;text-align: center;'>暂无数据</p>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'moneylog',
        data: function () {
            return {
                queryTime:null,
                result:null,
                loading:false
            }
        },
        mounted: function () {
            this.getData();
        },
        methods:{
            getData: function (time1,time2) {
                let vm = this;
                vm.loading = true;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/record',
                    data:vm.$qs.stringify({
                        type:'payment_all',
                        start_time:time1,
                        end_time:time2,
                        token:sessionStorage.getItem('token')
                    })
                })
                   .then(function(res){
                       vm.loading = false;
                       if(res.data.code == 0){
                           vm.result = res.data.data;
                       }else {
                           vm.$message.error(res.data.message);
                       }
                   })
                   .catch(function(err){});
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #moneylog{
        table{
        border-collapse: collapse;
        }
        table,thead,tbody,tr,th,td{
        border: 1px solid #dedede;
        white-space:nowrap;
        }
        .logBox{
            background-color: #ffffff;
            padding: 10px;
            border-radius:20px;
            min-height: 600px;
        }
        .logtable{
            min-width: 1200px;
            margin: 0 auto;
            margin-top: 20px;
            th,td{
                padding: 0px 6px;
                height: 32px;
                line-height: 32px;
            }
            tbody{
                tr:hover{
                    cursor: pointer;
                    background-color: rgba(204,204,204,0.3)
                }
            }
            .error{
                color:red;
            }
        }
        .da_header{
            display: flex;
            justify-content: flex-start;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
        }
    }
</style>

