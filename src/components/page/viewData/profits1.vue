<template>
    <div id="profits1" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 股东收益</p>
        <div class="pro_head">
            <span style='margin-right: 15px;line-height: 32px;'>选择时间段</span>
            <el-date-picker
                v-model="month"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
            </el-date-picker>
            <el-button type="primary" style='margin-left: 20px;' @click='getprofits'>查询</el-button>
            <template>
                <el-radio-group v-model="type" style='margin-left: 100px;margin-top: 10px;' v-show='show'>
                    <el-radio :label="1">股东</el-radio>
                    <el-radio :label="2">合伙人</el-radio>
                </el-radio-group>
            </template>
        </div>
        <template>
            <el-table
                v-if='type == 1'
                :data="tableData"
                height="80%"
                key='shareholders'
                v-loading='laoding'
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="sh_name"
                    label="股东">
                </el-table-column>
                <el-table-column
                    prop="sh_ratio"
                    label="分红">
                </el-table-column>
                <el-table-column
                    prop="month"
                    label='月份'>
                </el-table-column>
                <el-table-column
                    prop="device_name"
                    label='设备'>
                </el-table-column>
                <el-table-column
                    prop="output"
                    label='月结算预估'>
                </el-table-column>
                <el-table-column
                    prop="cost_rent"
                    label='场地成本'>
                </el-table-column>
                <el-table-column
                    prop="cost_man_power"
                    label='人工成本'>
                </el-table-column>
                <el-table-column
                    prop="cost_payment"
                    label='月提现金额'>
                </el-table-column>
                <el-table-column
                    prop="cost_reserve"
                    label='需补交备用金'>
                </el-table-column>
                <el-table-column
                    prop="profit"
                    label='收益'>
                </el-table-column>
            </el-table>
            <el-table
                v-else-if='type == 2'
                :data="tableData1"
                height="80%"
                key='partners'
                v-loading='laoding'
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="sh_name"
                    label="合伙人">
                </el-table-column>
                <el-table-column
                    prop="sh_ratio"
                    label="分红">
                </el-table-column>
                <el-table-column
                    prop="month"
                    label='月份'>
                </el-table-column>
                <el-table-column
                    prop="avg_promoted_customer"
                    label='设备平均客户人数'>
                </el-table-column>
                <el-table-column
                    prop="single_profit"
                    label='单客收益'>
                </el-table-column>
                <el-table-column
                    prop="partner_one_device_profit"
                    label='单设备收益'>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'profits1',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                type:3,
                show:false,
                month:'',
                tableData:[],
                tableData1:[],
                laoding:false,
            }
        },
        mounted: function () {
            this.month = new Date().getFullYear() + '-'+ (new Date().getMonth()+1);
            this.getprofits();
        },
        methods:{
            getprofits: function () {
                let vm = this;
                vm.laoding = true;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/profits1',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        date:vm.month
                    }
                })
                   .then(function(res){
                       if(res.data.type == 0){
                           vm.show = true;
                           vm.type = 1;
                           vm.tableData = res.data.data.shareholders;
                           vm.tableData1 = res.data.data.partners;
                       }else {
                           vm.type = res.data.type;
                           if(res.data.type == 1){
                               vm.tableData = res.data.data;
                           }else if(res.data.type == 2){
                               vm.tableData1 = res.data.data;
                           }
                       }
                       vm.laoding = false;
                   })
                   .catch(function(err){});
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #profits1 {
        .pro_head {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
        }
    }
</style>

