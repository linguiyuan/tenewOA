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
                    :data="tableData"
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
                    <el-table-column
                        prop="need_storage"
                        label='应存备用金'>
                    </el-table-column>
                    <el-table-column
                        prop="already_storage"
                        label='已存备用金'>
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
                                prop="account"
                                label="账号">
                            </el-table-column>
                            <el-table-column
                                prop="online_number"
                                label="注册手机号">
                            </el-table-column>
                            <el-table-column
                                prop="phone_number"
                                label="联系方式">
                            </el-table-column>
                            <el-table-column
                                prop="qq_id"
                                label="QQ号">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                            <el-table-column
                                prop="wechat_id"
                                label="微信号">
                            </el-table-column>
                            <el-table-column
                                prop='status'
                                label="状态">
                            </el-table-column>
                            <el-table-column
                                prop="sesstion_update_time"
                                label="授权">
                                <!--<template slot-scope='scope'>-->
                                <!--<span>{{scope.row.sesstion_update_time | sq()}}</span>-->
                                <!--</template>-->
                            </el-table-column>
                        </el-table>
                    </template>
                </template>
            </template>
        </template>
        <template v-else-if='radio == 2'>
            <el-table
                :data="tableData1"
                height="80%"
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="date"
                    label="日期 年/月">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="合伙人1">
                </el-table-column>
                <el-table-column
                    prop="devs"
                    label='设备'>
                </el-table-column>
                <el-table-column
                    prop="place"
                    label='场地'>
                </el-table-column>
                <el-table-column
                    prop="cost"
                    label='总运营成本'>
                </el-table-column>
            </el-table>
        </template>
        <template v-else-if='radio == 3'>
            <div class="function">
                <el-date-picker
                    v-model="newData.date"
                    type="month"
                    placeholder="选择月">
                </el-date-picker>
                <el-input v-model="newData.wages" style='width: 200px;'>
                    <template slot="prepend">人工:</template>
                </el-input>
                <el-input v-model="newData.devices" style='width: 200px;'>
                    <template slot="prepend">设备:</template>
                </el-input>
                <el-input v-model="newData.area" style='width: 200px;'>
                    <template slot="prepend">场地:</template>
                </el-input>
                <el-input v-model="newData.cost" style='width: 200px;' :disabled="true">
                    <template slot="prepend">总运营成本:</template>
                </el-input>
                <el-button type='primary'>增加</el-button>
            </div>
        </template>
        <div class="adddevisebox" v-show='adddevisebox'>
            <p><el-button type="primary" plain size='mini' @click='btn_adddev'>添加</el-button><i class="el-icon-error" @click='celadddevisebox' style='color: #666666;'></i></p>
            <template v-loading='getdevlistloading'>
                <el-table
                    :data="deviceList"
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
                        prop="account"
                        label="账号">
                    </el-table-column>
                    <el-table-column
                        prop="online_number"
                        label="注册手机号">
                    </el-table-column>
                    <el-table-column
                        prop="phone_number"
                        label="联系方式">
                    </el-table-column>
                    <el-table-column
                        prop="qq_id"
                        label="QQ号">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        prop="wechat_id"
                        label="微信号">
                    </el-table-column>
                    <el-table-column
                        label="状态">
                        <template slot-scope="scope">
                            <span :class='{"te":scope.row.status == "掉线"}'>{{scope.row.status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="授权">
                        <template slot-scope='scope'>
                            <span>{{scope.row.sesstion_update_time | sq()}}</span>
                        </template>
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
                tableData: [],
                tableData1: [
                    {
                        date: '2018-11',
                        name: "合伙人1",
                        pt: '2134',
                        devs: 5,
                        place: 'XXX场地',
                        cost: 2343
                    },
                    {
                        date: '2018-11',
                        name: "合伙人1",
                        pt: '2134',
                        devs: 5,
                        place: 'XXX场地',
                        cost: 2343
                    },
                    {
                        date: '2018-11',
                        name: "合伙人1",
                        pt: '2134',
                        devs: 5,
                        place: 'XXX场地',
                        cost: 2343
                    },
                ],
                newData: {
                    date: null,
                    wages: null,
                    devices: null,
                    area: null,
                    cost: null,
                },
                devicelist: [
                    // {
                    //     account: "圣明10",
                    //     device: "代理",
                    //     online_number: 12345678,
                    //     phone_number: 1234567,
                    //     qq_id: 4566435,
                    //     remark: '无',
                    //     sequence: 1,
                    //     sesstion_update_time: "2018-11-07 14:56:51",
                    //     status: "在线",
                    //     wechat_id: 'w_88j'
                    // }
                ],
                selectNb:[]
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
                           vm.tableData = res.data.data;
                       }
                       vm.$message.success(res.data.message);
                   })
                   .catch(function(err){});
            },
            back: function () {
                this.radio2 = '1';
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
                let dataa = {
                    token:vm.token,
                        uid:vm.uid,
                    id:vm.id,
                    eids:vm.selectNb
                }
                console.log(vm.$qs.stringify(dataa));
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
    }
</style>

