<template>
    <div id="groupmanagement" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 分组管理</p>
        <template>
            <el-table
                :data="grouplist"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    width='160'
                    label="小组名">
                </el-table-column>
                <el-table-column
                    prop="member"
                    label="小组成员">
                </el-table-column>
                <el-table-column
                    prop="devise"
                    label="小组设备">
                </el-table-column>
            </el-table>
        </template>
        <template>
            <el-transfer v-model="value1" :data="value2" @change='change'></el-transfer>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'groupmanagement',
    data: function () {
        return {
            grouplist:[],
            value1:[],
            value2:[
                {
                    key:1,
                    label:"1",
                }
            ]
        }
    },
    methods:{
        change: function () {
            console.log(this.value1);
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>

</style>

