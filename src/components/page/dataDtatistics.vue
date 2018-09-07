<template>
    <div id='nowtimeOrders' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：实时订单汇总</p>
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
            <el-button type="primary" style='margin-left: 15px;' @click='getEveryDay'>点击搜索</el-button>
            <p class="shortcut">
                <span @click='getAxios("time=today")'>今日</span>
                <span @click='getAxios("time=yesterday")'>昨日</span>
                <span @click='getAxios("time=this_month")'>本月</span>
                <span @click='getAxios("time=last_month")'>上月</span>
            </p>
        </div>
        <template>
            <el-table
                :data="content"
                stripe
                height="450"
                style="width: 100%">
                <el-table-column
                 prop="device"
                 label="设备"
                 min-width="100">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="payment"
                    label="付款金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="结算金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="effect"
                    label="效果预估"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="estimate"
                    label="结算预估"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="valid"
                    label="有效订单"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="settlementOrders"
                    label="结算订单"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="goods"
                    label="有效商品"
                    min-width="100">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                queryTime:'',
                content:null,
            }
        },
        mounted: function () {
            this.getAxios()
        },
        filters:{
        },
        computed: {},
        methods:{
            getEveryDay: function () {
                let vm = this;
                vm.getAxios(vm.$qs.stringify({
                    start_time:vm.queryTime[0],
                    end_time:vm.queryTime[1]
                }))
            },
            getAxios: function (data) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    url:window.$g_Api + '/oa/realtime_table',
                    data:data
                })
                    .then(function(res){
                        vm.content = res.data.data
                    })
                    .catch(function(err){});
            },
        }
    }

</script>


<style lang='scss' scoped>
    #nowtimeOrders{
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
                    width: 50px;
                    color: #409eff;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
        .my_table{
            min-width: 1100px;
            border-collapse: collapse;
            thead{
                th{
                    text-align: left;
                    background-color: #50bfff;
                    color: #ffffff;
                }
            }
            th,td{
                height: 32px;
                line-height: 32px;
                padding-left: 10px;
            }
            tbody{
                tr:nth-child(2n){
                    background-color: rgba(204,204,204,0.15);
                }
            }
        }
    }
</style>
