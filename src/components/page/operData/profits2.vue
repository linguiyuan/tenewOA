<template>
    <div id="profits2" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 股东管理</p>
        <div class="profitsBox">
            <span>类型选择:</span>
            <template>
                <el-radio v-model="radio" label="1">股东</el-radio>
                <el-radio v-model="radio" label="2">合伙人</el-radio>
                <el-radio v-model="radio" label="3">账本</el-radio>
            </template>
        </div>
        <template v-if='radio == 1'>
            <template v-if='radio2 == 1'>
                <!--<div class="pro_add_user">-->
                <!--<p>-->
                <!--<span style='margin-right: 8px;color: #999999;'>设置股东名称:</span>-->
                <!--<el-input v-model="addUser.shareholders" size="mini" style='width: 160px;margin-right: 20px;'></el-input>-->
                <!--<span style='margin-right: 8px;color: #999999;'>设置密码:</span>-->
                <!--<el-input v-model="addUser.shareholderspassword" size="mini" style='width: 160px'></el-input>-->
                <!--</p>-->
                <!--<span style='display: block;margin-left: 40px;'>-->
                <!--<el-tag class="my_tag" size='medium'>添加股东</el-tag>-->
                <!--</span>-->
                <!--</div>-->
                <el-table
                    :data="shareholder_list"
                    height="80%"
                    key='tableData'
                    style="width: 100%;font-size: 14px;">
                    <el-table-column
                        prop="name"
                        label="名称">
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--prop="password"-->
                        <!--label="密码">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="devices_num"
                        label='总设备数'>
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--prop="need_storage"-->
                        <!--label='应存备用金'>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--prop="already_storage"-->
                        <!--label='已存备用金'>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="sh_percent"
                        label='分红'>
                    </el-table-column>
                    <el-table-column
                        label='操作'>
                        <template slot-scope='scope'>
                            <el-button type="info" plain @click='setinfo(scope.row["id"])' size="mini">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template v-else-if='radio2 == 2'>
                <template>
                    <div class='i_box'>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click='adddev'>添加设备</el-button>
                        <i class="fontfamily te-oa-chehuisekuai back" @click='back()'></i>
                    </div>
                    <!--<div class="pro_add_user" style='margin-bottom: 10px;'>-->
                        <!--<p>-->
                            <!--<span style='margin-right: 8px;color: #999999;'>设置股东名称:</span>-->
                            <!--<el-input v-model="reUser.shareholders" size="mini"-->
                                      <!--style='width: 160px;margin-right: 20px;'></el-input>-->
                            <!--<span style='margin-right: 8px;color: #999999;'>设置密码:</span>-->
                            <!--<el-input v-model="reUser.shareholderspassword" size="mini" style='width: 160px'></el-input>-->
                        <!--</p>-->
                        <!--<span style='display: block;margin-left: 40px;'>-->
                            <!--<el-tag class="my_tag" size='medium'>修改信息</el-tag>-->
                        <!--</span>-->
                    <!--</div>-->
                    <template v-loading='loading'>
                        <el-table
                            :data="devicelist"
                            height="80%"
                            border
                            key='devicelist'
                            style="width: 100%">
                            <el-table-column
                                prop="sequence"
                                width='50'
                                label="序号">
                            </el-table-column>
                            <el-table-column
                                prop="device"
                                label="设备">
                            </el-table-column>
                            <el-table-column
                                prop="wechat_id"
                                label="微信号">
                            </el-table-column>
                            <el-table-column
                                prop="qq_id"
                                label="QQ号">
                            </el-table-column>
                            <el-table-column
                                prop="online_number"
                                label="号码卡">
                            </el-table-column>
                            <el-table-column
                                prop="phone_number"
                                label="上网卡">
                            </el-table-column>
                            <el-table-column
                                prop="account"
                                label="账号">
                            </el-table-column>
                            <el-table-column
                                prop='status'
                                label="在线情况">
                            </el-table-column>
                            <el-table-column
                                prop="sesstion_update_time"
                                label="授权截止时间">
                                <!--<template slot-scope='scope'>-->
                                <!--<span>{{scope.row.sesstion_update_time | sq()}}</span>-->
                                <!--</template>-->
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template slot-scope='scope'>
                                    <span @click='delDev(scope.row.eid)' class='sp'>删除设备</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </template>
            </template>
        </template>
        <template v-else-if='radio == 2'>
            <el-table
                :data="partner_list"
                height="80%"
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="name"
                    label="合伙人">
                </el-table-column>
                <el-table-column
                    prop="devices_num"
                    label="设备数">
                </el-table-column>
                <el-table-column
                    prop="sh_percent"
                    label='分红'>
                </el-table-column>
            </el-table>
        </template>
        <template v-else-if='radio == 3'>
            <div class="function">
                <el-date-picker
                    v-model="newData.month"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择月">
                </el-date-picker>
                <el-input v-model="newData.cost_manpower" style='width: 200px;' @blur='getall'>
                    <template slot="prepend">人工:</template>
                </el-input>
                <el-input v-model="newData.cost_device" style='width: 200px;' @blur='getall'>
                    <template slot="prepend">设备:</template>
                </el-input>
                <el-input v-model="newData.cost_rent" style='width: 200px;' @blur='getall'>
                    <template slot="prepend">场地:</template>
                </el-input>
                <el-input v-model="newData.cost_all" style='width: 200px;' :disabled="true">
                    <template slot="prepend">总运营成本:</template>
                </el-input>
                <el-button type='primary' @click='costInof'>提交</el-button>
            </div>
            <el-table
                :data="cost_record"
                height="80%"
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="month"
                    label="月份">
                </el-table-column>
                <el-table-column
                    prop="employee_wages"
                    label="人工">
                </el-table-column>
                <el-table-column
                    prop="cost_device"
                    label='设备'>
                </el-table-column>
                <el-table-column
                    prop="cost_rent"
                    label='场地'>
                </el-table-column>
            </el-table>
        </template>
        <div class="adddevisebox" v-show='adddevisebox'>
            <p><el-button type="primary" plain size='mini' @click='btn_adddev'>添加</el-button><i class="el-icon-error" @click='celadddevisebox' style='color: #666666;'></i></p>
            <template v-loading='getdevlistloading'>
                <el-table
                    :data="deviceList"
                    v-loading='addloading'
                    @selection-change="handleSelectionChange"
                    height="80%"
                    border
                    style="width: 100%;">
                    <el-table-column
                        type="selection"
                        width='50'>
                    </el-table-column>
                    <el-table-column
                        prop="device"
                        label="设备">
                    </el-table-column>
                    <el-table-column
                        prop="wechat_id"
                        label="微信号">
                    </el-table-column>
                    <el-table-column
                        prop="qq_id"
                        label="QQ号">
                    </el-table-column>
                    <el-table-column
                        prop="online_number"
                        label="号码卡">
                    </el-table-column>
                    <el-table-column
                        prop="phone_number"
                        label="上网卡">
                    </el-table-column>
                    <el-table-column
                        prop="account"
                        label="账号">
                    </el-table-column>
                    <el-table-column
                        label="在线情况">
                        <template slot-scope="scope">
                            <span :class='{"te":scope.row.status == "掉线"}'>{{scope.row.status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="授权截止时间">
                        <template slot-scope='scope'>
                            <span>{{scope.row.sesstion_update_time | sq()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'profits2',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                id:null,
                radio: '1',
                radio2: '1',
                loading: false,
                adddevisebox:false,
                getdevlistloading:false,
                deviceList:[],
                addUser: {
                    shareholders: '',
                    shareholderspassword: '',
                },
                reUser: {
                    shareholders: '',
                    shareholderspassword: '',
                },
                shareholder_list: [],
                cost_record:[],
                partner_list:[],
                tableData1: [

                ],
                newData: {
                    month: '',
                    cost_manpower: 0,
                    cost_device: 0,
                    cost_rent: 0,
                    cost_id: '',
                    cost_all:0
                },
                devicelist: [],
                selectNb:[],
                addloading:false,
            }
        },
        mounted: function () {
            this.getshareholderslist()
        },
        methods: {
            handleSelectionChange: function (val) {
                let arr = [];
                for (let i = 0, len = val.length; i < len; i++) {
                    arr.push(val[i].id)
                }
            },
            getshareholderslist: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/profits2',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                    }
                })
                   .then(function(res){
                       if(res.data.code == 0){
                           vm.shareholder_list = res.data.data.shareholder_list;
                           vm.partner_list = res.data.data.partner_list;
                           vm.cost_record = res.data.data.cost_record;
                       }
                       vm.$message.success(res.data.message);
                   })
                   .catch(function(err){});
            },
            //返回
            back: function () {
                this.radio2 = '1';
                this.getshareholderslist();
            },
            //查看股东设备详情
            setinfo: function (id) {
                let vm  = this;
                vm.id = id;
                vm.radio2 = '2';
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/owndevices',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        id:id
                    }
                })
                   .then(function(res){
                       vm.devicelist = res.data.data;
                   })
                   .catch(function(err){});
            },
            //点击新增弹出设备列表
            adddev: function () {
              let vm = this;
              vm.adddevisebox = true;
              vm.getdevlist();
            },
            //关闭新增设备遮罩
            celadddevisebox: function () {
                this.adddevisebox = false
            },
            //获取设备可选设备列表
            getdevlist: function () {
                let vm = this;
                vm.getdevlistloading = true;
                vm.addloading = true;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/devices1',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                    }
                })
                    .then(function(res){
                        vm.getdevlistloading = false;
                        vm.addloading = false;
                        if(res.data.code == 0){
                            vm.deviceList = res.data.data;
                        }else {
                            console.error(res.data.message);
                        }
                    })
                    .catch(function(err){vm.getdevlistloading = false;});
            },
            //多选框事件
            handleSelectionChange(val) {
                let arr = [];
                for(let i = 0 ,len = val.length ; i < len; i++){
                    arr.push(val[i].id);
                }
                this.selectNb = arr;
            },
            //确认添加设备
            btn_adddev:function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/holder/adddevice',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        id:vm.id,
                        eids:vm.selectNb
                    }
                })
                   .then(function(res){
                       vm.$alert(res.data.message);
                       vm.adddevisebox = false;
                       vm.radio2 = '2';
                       vm.$axios({
                           method:'post',
                           url:window.$g_Api + '/oa/owndevices',
                           data:{
                               token:vm.token,
                               uid:vm.uid,
                               id:vm.id
                           }
                       })
                           .then(function(res){
                               vm.devicelist = res.data.data;
                           })
                           .catch(function(err){});
                   })
                   .catch(function(err){});
            },
            //删除设备
            delDev: function (eid) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/holder/deldevice',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        id:vm.id,
                        eids:eid
                    }
                })
                   .then(function(res){
                       vm.$alert(res.data.message);
                       vm.$axios({
                           method:'post',
                           url:window.$g_Api + '/oa/owndevices',
                           data:{
                               token:vm.token,
                               uid:vm.uid,
                               id:vm.id
                           }
                       })
                           .then(function(res){
                               vm.devicelist = res.data.data;
                           })
                           .catch(function(err){});
                   })
                   .catch(function(err){});
            },
            //新增或修改成本
            costInof: function () {
                let vm = this;
                let type;
                vm.newData.cost_id?type=1:type=0;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/holder/add_cost',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        month:vm.newData.month,
                        cost_manpower: vm.newData.cost_manpower,
                        cost_rent: vm.newData.cost_rent,
                        cost_device: vm.newData.cost_device,
                        cost_id: vm.newData.cost_id,
                        type:type,
                    }
                })
                   .then(function(res){})
                   .catch(function(err){});
            },
            //计算总和
            getall: function () {
                this.newData.cost_all = Number(this.newData.cost_rent) + Number(this.newData.cost_device) + Number(this.newData.cost_manpower);
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #profits2 {
        position: relative;
        .profitsBox {
            margin-bottom: 15px;
            span {
                margin-right: 20px;
            }
        }
        .pr_tag {
            &:hover {
                cursor: pointer;
            }
        }
        .function {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
            .el-input {
                margin-right: 25px;
            }
        }
        .i_box {
            width: 100%;
            /*height: 24px;*/
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .back {
                display: block;
                color: #409EFF;
                font-size: 24px;
                margin-right: 30px;
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .gd_head {
            display: flex;
            justify-content: flex-start;
            span {
                margin-right: 10px;
                line-height: 32px;
            }
        }
        .pro_add_user {
            display: flex;
            justify-content: flex-start;
            padding-left: 10px;
        }
        .adddevisebox{
            width: 100%;
            height: 100%;
            padding: 0 20px;
            background-color:rgb(255,255,255);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 8888;
            p{
                width: 100%;
                height: 32px;
                margin: 15px 0;
                i{
                    float: right;
                    font-size: 24px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
        .sp{
            color:red;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>

