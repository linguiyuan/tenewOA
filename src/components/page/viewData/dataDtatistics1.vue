<template>
    <div id='nowtimeOrders' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 实时数据</p>
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
            <template>
                <el-select v-model="group_id" placeholder="请选择小组" style='margin-left: 12px;'>
                    <el-option
                        v-for="item in options"
                        :key="item.group_id"
                        :label="item.group_name"
                        :value="item.group_id">
                    </el-option>
                </el-select>
            </template>
            <el-button type="primary" style='margin-left: 15px;' @click='getEveryDay'>点击搜索</el-button>
            <p class="shortcut">
                <span @click='getAxios("","today",1)' :class="{activate:at==1?true:false}">今日</span>
                <span @click='getAxios("","yesterday",2)' :class="{activate:at==2?true:false}">昨日</span>
                <span @click='getAxios("","this_month",3)' :class="{activate:at==3?true:false}">本月</span>
                <span @click='getAxios("","last_month",4)' :class="{activate:at==4?true:false}">上月</span>
            </p>
        </div>
        <template style='height: 100%;'>
            <el-table
                :data="content"
                stripe
                height='80%'
                v-loading="loading">
                <el-table-column
                    prop="device"
                    label="设备">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号">
                    <template slot-scope="scope">
                        <span>{{scope.row['account'] | getName}}</span>
                    </template>
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
        name: 'datadtatistics',
        data() {
            return {
                queryTime: '',
                content: null,
                at: '',
                loading: true,
                uid: sessionStorage.getItem('uid'),
                token: sessionStorage.getItem('token'),
                options:[],
                group_id:'',
            }
        },
        mounted: function () {
            this.getoptions();
            this.getAxios({
                start_time: this.queryTime[0],
                end_time: this.queryTime[1],
                token: this.token,
                uid: this.uid,
                group_id:this.group_id,
            })
        },
        computed: {},
        methods: {
            getoptions: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/get_group_info',
                    data:{
                        token:vm.token,
                        uid:vm.uid
                    }
                })
                   .then(function(res){
                       vm.options = res.data.data;
                   })
                   .catch(function(err){});
            },
            getEveryDay: function () {
                let vm = this;
                vm.at = null;
                vm.getAxios({
                    start_time: vm.queryTime[0],
                    end_time: vm.queryTime[1],
                    token: vm.token,
                    uid: vm.uid,
                    group_id:vm.group_id,
                })
            },
            getAxios: function (data,ac,nb) {
                let vm = this;
                vm.loading = true;
                let newdata;
                if (nb) {
                    vm.at = nb;
                }
                data?newdata=data:newdata = {token:vm.token, uid:vm.uid,time:ac,group_id:vm.group_id,};
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/datastatistics1',
                    data: newdata
                })
                    .then(function (res) {
                        vm.loading = false;
                        vm.content = res.data.data
                    })
                    .catch(function (err) {
                    });
            },
        }
    }

</script>


<style lang='scss' scoped>
    #nowtimeOrders {

        table, thead, tbody, tr, th, td {
            border: 1px solid #dedede;
            white-space: nowrap;
        }
        .da_header {
            display: flex;
            justify-content: flex-start;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            .shortcut {
                margin-left: 40px;
                span {
                    display: inline-block;
                    width: 50px;
                    color: #409eff;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .activate {
                    color: #e6a23c;
                }
            }
        }
        .device {
            width: 100%;
            background-color: transparent;
            border: none;
            color: #606266;
            font-size: 12px;
        }
    }
</style>
