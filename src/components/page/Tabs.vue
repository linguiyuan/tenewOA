<template>
    <div id="oderInfo">
        <table cellpadding='0px' cellspacing='0px'>
            <thead>
                <tr>
                    <th>客户名称</th>
                    <th>购买产品</th>
                    <th>授权天数</th>
                    <th>设备数量</th>
                    <th>购买金额</th>
                    <th>订单创建时间</th>
                    <th>订单状态</th>
                    <th>订单处理时间</th>
                    <th>操作人员</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in dataList" :key='index'>
                    <td>{{item.customer}}</td>
                    <td>{{item.product}}</td>
                    <td>{{item.year}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.money}}</td>
                    <td>{{item.createdTime}}</td>
                    <td>{{item.state}}</td>
                    <td>{{item.processedTime}}</td>
                    <td>{{item.processer}}</td>
                    <td>
                        <el-button type="info" size='mini'>撤销订单</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                dataList:[
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    },
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    },
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    },
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    },
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    },
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    },
                    {
                        customer:'customer',
                        product:'product',
                        year:'1year',
                        number:'number',
                        money:'money',
                        createdTime:'2018-08-29 12:13',
                        state:'已审核',
                        processedTime:'2018-08-29 22:13',
                        processer:'xxx',
                    }
                ]
            }
        },
        methods: {

        },
        computed: {

        }
    }

</script>

<style scoped>
    #oderInfo{
        min-width: 1300px;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 10px;
        min-height: 600px;
    }
    table {
        min-width: 1300px;
        line-height: 40px;
        border-collapse: collapse;
    }
    table,table tr th, table tr td{
        border:1px solid #dedede;
        white-space:nowrap;
    }
    thead{
        font-size: 16px;
        text-align: center;
    }
    tbody{
        text-align: center;
    }
</style>

