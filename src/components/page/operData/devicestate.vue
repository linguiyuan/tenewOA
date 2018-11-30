<template>
    <div id="devicestate" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 设备推广</p>
        <div class="pro_head">
            <span style='margin-right: 15px;line-height: 32px;'>选择时间段</span>
            <el-date-picker
                v-model="month"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
            </el-date-picker>
            <el-button type="primary" style='margin-left: 20px;' @click='getdata'>查询</el-button>
        </div>
        <template>
            <el-table
                :data="tableData"
                height="80%"
                border
                stripe
                highlight-current-row
                style="width: 100%;font-size: 14px;white-space: nowrap">
                <el-table-column
                    fixed
                    prop="name"
                    :label="month+''">
                </el-table-column>
                <el-table-column
                    fixed
                    prop='total'
                    label='总计'>
                </el-table-column>
                <el-table-column
                    v-for='item in days'
                    :key='item'
                    :label="item+'号'">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.data['i'+item]}}</p>
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.data['d'+item]}}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
export default{
    name:'devicestate',
    data: function () {
        return {
            month:'',
            days:[],
            tableData:[
                {}
            ]
        }
    },
    mounted: function () {
        let vm = this;
        let date = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
        this.month = date;
    },
    methods:{
        getdays: function (data) {
            let date = new Date(data);//构造当前日期对象
            let year = date.getFullYear();//获取年份
            let mouth = date.getMonth() + 1;//获取当前月份
            let days;//定义当月的天数；
            let newdays =[];
            if (mouth == 2) {//当月份为二月时，根据闰年还是非闰年判断天数
                days = year % 4 == 0 ? 29 : 28;
            } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
                days = 31;//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            }
            else {
                days = 30;//其他月份，天数为：30.
            }
            for(let i = 0 ,len = days ; i < len; i++){
                newdays.push(i+1)
            }
            this.days = newdays;
        },
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#devicestate{
    .pro_head {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
}
</style>

