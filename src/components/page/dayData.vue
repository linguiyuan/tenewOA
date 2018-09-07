<template>
    <div id='everyDayOrders' class='my_wap'>
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
                <span @click='getAxios("dbname=amount")'>付款金额</span>
                <span @click='getAxios("dbname=settlement")'>结算金额</span>
                <span @click='getAxios("dbname=est_effect")'>效果预估</span>
                <span @click='getAxios("dbname=set_effect")'>结算预估</span>
                <span @click='getAxios("dbname=effective_order")'>订单数量</span>
            </p>
        </div>
        <div class="my_table_box">
            <!--<table class="my_table">-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th v-for='(item,index) in title' :key='index'>{{item}}</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for='(value,index) in content' :key='index'>-->
                    <!--<td v-for='(val,i) in value' :key='i'>{{val}}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
            <!--<table class="my_table ps">-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th v-for='(item,index) in title' :key='index'>{{item}}</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for='(value,index) in content' :key='index'>-->
                    <!--<td>{{value[0]}}</td>-->
                    <!--<td>{{value[1]}}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
            <template>
                <el-table
                    :data="content"
                    stripe
                    height="450"
                    style="width: 100%">
                    <el-table-column v-for='(value,key,index) in title' :key='index'
                        highlight-current-row= true
                        :fixed='index<2?true:false'
                        :prop="key"
                        :label="value"
                        :min-width="index==1?'180':'100'">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                queryTime:'',
                title:null,
                content:null,
                propArr:[]
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
                    url:window.$g_Api + '/oa/everyday_table',
                    data:data
                })
                    .then(function(res){
                        let obj1={};
                        let arr = [];
                        for(let i = 0 ,len = res.data.content.length ; i < len; i++){
                            let obj={};
                            for(let e = 0 ,len =res.data.content[i].length  ; e < len; e++){
                                obj['t'+e] = res.data.content[i][e];
                            }
                            arr.push(obj);
                        }
                        for(let i = 0 ,len = res.data.title.length ; i < len; i++){
                            obj1['t'+i] = res.data.title[i];
                        }
                        vm.content = arr;
                        vm.title = obj1;
                    })
                    .catch(function(err){});
            }
        }
    }

</script>


<style lang='scss' scoped>
    #everyDayOrders{
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
            }
        }
        .my_table_box{
            width: 1100px;
            height: 1000px;
            div.cell{
                white-space:nowrap !important;
            }
            thead{
                th{
                    background-color: #50bfff;
                }
            }
        }
    }
</style>
