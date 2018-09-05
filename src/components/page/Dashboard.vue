<template>
    <div>
        <div class="user_money">
            <span class="balance">剩余软件币:<i>20455</i></span>
            <span class="used">已用软件币:<i>20777</i></span>
        </div>
        <div class="product_main">
            <div>
                <div class="product_info">产品套餐:</div>
                <div class="product_box">
                    <table  border="0" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <td>设备数</td>
                            <td>服务时间</td>
                            <td>费用</td>
                            <td>服务费</td>
                            <td>总价</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in todoList" :key='index'>
                            <td>{{item.nb}}台</td>
                            <td>{{item.time}}{{item.time | hw()}}</td>
                            <td>{{item.money}}元</td>
                            <td>{{item.server}}元</td>
                            <td>{{item.all}}元</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="buy">
                <p class="title">套餐选购</p>
                <div class="radio">
                    <el-radio-group v-model="buyData.radio" @change='radionChange'>
                        <el-radio label="5">5台</el-radio>
                        <el-radio label="10">10台</el-radio>
                        <el-radio label="20">20台</el-radio>
                        <el-radio label="30">30台</el-radio>
                        <el-radio label="50">50台</el-radio>
                        <el-radio label="100">100台</el-radio>
                    </el-radio-group>
                </div>
                <div class="buytime">
                    <span>购买年数:</span><el-input-number size="mini" :min="1" @change="handleChange" v-model="buyData.year"></el-input-number>
                </div>
                <div class="serverMoney">
                    <span>基础费用:</span><p>{{buyData.money}}</p><i v-show='rebateif' class='rebate'>{{rebate}}</i>
                </div>
                <div class="serverMoney">
                    <span>服务费:</span><p>{{buyData.servermoney}}</p>
                </div>
                <div class="all">
                    <span>总价:</span><p>{{buyData.all}}</p>
                </div>
                <div class="submit">
                    <el-button type="primary" @click='placeOrder'>提交订单</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                todoList: [
                    {
                        nb: 5,
                        time: 1,
                        money:4980,
                        server:1280,
                        all:6260
                    },
                    {
                        nb: 10,
                        time: 1,
                        money:7980,
                        server:1280,
                        all:9260
                    },
                    {
                        nb: 20,
                        time: 1,
                        money:12980,
                        server:1280,
                        all:14260
                    },
                    {
                        nb: 30,
                        time: 1,
                        money:19980,
                        server:1280,
                        all:20260
                    },
                    {
                        nb: 50,
                        time: 1,
                        money:29980,
                        server:1280,
                        all:30260
                    },

                    {
                        nb: 100,
                        time: 1,
                        money:49980,
                        server:1280,
                        all:50260
                    },
                    {
                        nb: 5,
                        time: 2,
                        money:7968,
                        server:2560,
                        all:10528
                    },
                    {
                        nb: 10,
                        time: 2,
                        money:12768,
                        server:2560,
                        all:15328
                    },
                    {
                        nb: 20,
                        time: 2,
                        money:20768,
                        server:2560,
                        all:23328
                    },
                    {
                        nb: 30,
                        time: 2,
                        money:31968,
                        server:2560,
                        all:34528
                    },
                    {
                        nb: 50,
                        time: 2,
                        money:47968,
                        server:2560,
                        all:50528
                    },
                    {
                        nb: 100,
                        time: 2,
                        money:79968,
                        server:2560,
                        all:82528
                    },
                    {
                        nb: 5,
                        time: 3,
                        money:10458,
                        server:3840,
                        all:14298
                    },
                    {
                        nb: 10,
                        time: 3,
                        money:16758,
                        server:3840,
                        all:20598
                    },
                    {
                        nb: 20,
                        time: 3,
                        money:27258,
                        server:3840,
                        all:31098
                    },
                    {
                        nb: 30,
                        time: 3,
                        money:41958,
                        server:3840,
                        all:45789
                    },
                    {
                        nb: 50,
                        time: 3,
                        money:62958,
                        server:3840,
                        all:66798
                    },
                    {
                        nb: 100,
                        time: 3,
                        money:82528,
                        server:3840,
                        all:108798
                    },
                ],
                rebateif:false,
                rebate:'八折！',
                buyData:{
                    radio:'5',
                    year:1,
                    money:4980,
                    servermoney:1280,
                    all:6260
                },
            }
        },
        filters:{
            hw: function (value) {
                let val;
                switch (value) {
                    case 1:val='年';
                    break;
                    case 2:val='年(八折)';
                    break;
                    case 3:val='年(七折)';
                }
                return val;
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        methods:{
            //台数单选改变时同时改变基础费用和总价
            radionChange: function(value) {
                let vm = this;
                let year = vm.buyData.year;
                vm.buyData.servermoney = 1280 * year;
                switch (value) {
                    case '5':vm.buyData.money = vm.getMoney(year,4980);
                        break;
                    case '10':vm.buyData.money = vm.getMoney(year,7980);
                        break;
                    case '20':vm.buyData.money = vm.getMoney(year,12980);
                        break;
                    case '30':vm.buyData.money = vm.getMoney(year,19980);
                        break;
                    case '50':vm.buyData.money = vm.getMoney(year,29980);
                        break;
                    case '100':vm.buyData.money = vm.getMoney(year,49980);
                        break;
                };
                vm.buyData.all = vm.buyData.servermoney + vm.buyData.money;
            },
            //封装价格判断函数
            getMoney: function (year,money) {
                let allmoney;
                if(year == 1){
                    allmoney = money * year
                }else if(year == 2){
                    allmoney = money * year * 8 / 10
                }else if(year >= 3){
                    allmoney = money * year * 7 / 10
                }
                return allmoney;
            },
            handleChange:  function(value) {
                let vm = this;
                if(value == 2){
                    vm.rebateif = true;
                    vm.rebate = '八折！';
                }else if(value >= 3){
                    vm.rebateif = true;
                    vm.rebate = '七折！';
                }else {
                    vm.rebateif = false;
                }
                vm.buyData.servermoney = 1280 * value;
                switch (vm.buyData.radio) {
                    case '5':vm.buyData.money = vm.getMoney(value,4980);
                        break;
                    case '10':vm.buyData.money = vm.getMoney(value,7980);
                        break;
                    case '20':vm.buyData.money = vm.getMoney(value,12980);
                        break;
                    case '30':vm.buyData.money = vm.getMoney(value,19980);
                        break;
                    case '50':vm.buyData.money = vm.getMoney(value,29980);
                        break;
                    case '100':vm.buyData.money = vm.getMoney(value,49980);
                        break;
                };
                vm.buyData.all = vm.buyData.servermoney + vm.buyData.money;
            },
            placeOrder: function () {
                let vm = this;
                vm.$confirm('<p>' +
                    '购买台数:'+vm.buyData.radio+'<br/>购买年数:'+vm.buyData.year+'<br/>基础费用'+vm.buyData.money+'<br/>服务费'+vm.buyData.servermoney+'<br/>总价'+vm.buyData.all+
                    '</p>', '订单详情', {
                    confirmButtonText: '已支付',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true,
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    vm.$message({
                        type: 'success',
                        message: '支付成功!'
                    });
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消支付'
                    });
                });
            }
        }
    }

</script>


<style scoped>
    *{
        box-sizing: border-box;
    }
    .user_money{
        background-color: #ffffff;
        height: 30px;
        line-height: 30px;
        padding-left: 40px;
        margin-left: -40px;
    }
    .user_money span i{
        margin-left: 6px;
    }
    .balance{
        margin-right: 20px;
    }
    .product_main{
        width: 1200px;
        background-color: #ffffff;
        margin-top: 30px;
        padding-left: 10px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .buy{
        width: 520px;
        height: 500px;
        padding: 10px;
        margin-right: 20px;
        /*text-align: center;*/
    }
    .buy .title{
        font-size: 20px;
        width: 100%;
        text-align: center;
        margin-top: 8px;
    }
    .buy span{
        display: inline-block;
        width: 70px;
        margin-right: 20px;
        line-height: 28px;
    }
    .radio{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .product_box table{
        width: 600px;
        text-align: center;
    }
    .product_box table thead{
        color: #909399;
    }
    .product_box table tbody{
        color:#606266;
    }
    .product_box table tbody tr:hover{
        background-color: rgba(64,158,255,.1);
    }
    .product_box table tr{
        height: 48px;
    }
    .serverMoney,.all{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .buytime {
        margin-bottom: 20px;
    }
    .serverMoney p, .all p{
        height: 28px;
        width: 130px;
        line-height: 28px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }
    .submit{
        width: 100%;
        text-align: center;
    }
    .rebate{
        color: red;
        display: block;
        height: 28px;
        line-height: 28px;
        margin-left: 3px;
        font-size: 18px;
        font-weight: 600;
    }
    .oderInfo{
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;

    }
</style>
