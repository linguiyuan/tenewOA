<template>
    <div id="money" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：新建转账</p>
        <div class="btn_box">
            <el-button type="primary" @click='open' style='height: 36px;margin-left: 10px;'>启动程序</el-button>
            <!--<el-button type="primary" @click=initWebSocket>上传文件</el-button>-->
            <el-upload
                class="upload-demo"
                style='border:none; height:60px;display: flex;justify-content: flex-start;'
                :action='url'
                :on-success='uploadFile'
                :on-error='error'
                name='payment'>
                <el-button size="small" type="primary" :disabled='load'>点击上传</el-button>
            </el-upload>
        </div>
        <div class="textbox" v-show='progress'>
            <p v-for='(item,index) in websockData' :key='index'>{{item}}</p>
        </div>
        <div class="feedback_box" v-show='feedback'>
            <table>
                <thead>
                    <tr>
                        <th>payee_real_name</th>
                        <th>payee_account</th>
                        <th>pay_date</th>
                        <th>order_id</th>
                        <th>out_biz_no</th>
                        <th>remark</th>
                        <th>amount</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in result' :key='item.order_id'>
                        <td>{{item.payee_real_name}}</td>
                        <td>{{item.payee_account}}</td>
                        <td>{{item.pay_date}}</td>
                        <td>{{item.order_id}}</td>
                        <td>{{item.out_biz_no}}</td>
                        <td>{{item.remark}}</td>
                        <td>{{item.amount}}</td>
                        <td>{{item.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'money',
        data() {
            return {
                websock: null,
                websockData:[],
                url:window.$g_Api+'/oa/upload_excel',
                load:true,
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                result:[],
                progress:true,
                feedback:false,
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            //确定启动程序提示对话框
            open() {
                let vm = this;
                vm.$confirm('即将启动程序, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    vm.progress=true;
                    vm.feedback=false;
                    vm.initWebSocket();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            openNew:function (url) {
                let a = document.createElement("a"); //创建a对象
                a.setAttribute("href", url);
                a.setAttribute("target", "_blank");
                a.setAttribute("id", "camnpr");
                document.body.appendChild(a);
                a.click(); //执行当前对象
            },
            initWebSocket(){
                //初始化weosocket
                this.websockData = ['程序启动中......'];
                if ("WebSocket" in window) {
                    const wsuri = "ws://"+window.$g_Api2+"/oa/exec_each_machines";
                    this.websock = new WebSocket(wsuri);
                    this.websock.onmessage = this.websocketonmessage;
                    this.websock.onopen = this.websocketonopen;
                    // this.websock.onerror = this.websocketonerror;
                    this.websock.onclose = this.websocketclose;
                }else {
                    vm.$message.warning('您的浏览器版本不支持该功能请升级版本或更换浏览器!')
                }
            },
            // websocketonopen(){ //连接建立之后执行send方法发送数据
            //     let actions = {"test":"12345"};
            //     this.websocketsend(JSON.stringify(actions));
            // },
            websocketonerror(){//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e){ //数据接收
                this.websockData.push(this.$qs.parse(e.data));
            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                if(this.websock.readyState == 3 && !!this.websock){
                    this.websockData.push('执行完毕,断开连接')
                    this.load = false;
                    // window.location.href =window.$g_Api+"/oa/download_transfer_excel"
                    // window.location.href ="http://www.baidu.com"
                    // window.open(window.$g_Api+"/oa/download_transfer_excel");
                    // this.openNew(window.$g_Api+"/oa/download_transfer_excel")
                    this.openNew(window.$g_Api+"/oa/download_transfer_excel")
                }else {
                    this.websockData.push('程序出错,断开连接')
                }
            },
            uploadFile: function (response, file, fileList) {
                if(response.code == 0){
                    this.$message.success('上传成功')
                    this.pay();
                }else {
                    this.$message.error(response.message)
                }

            },
            error: function (err, file, fileList) {
                console.log(err);
                this.$message.error(err.message)
            },
            pay: function (data) {
                let vm = this;
                if(!data){
                    data = {token:vm.token,uid:vm.uid}
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/money',
                    data:vm.$qs.stringify(data)
                })
                   .then(function(res){
                       if(res.data.code == 0){
                           vm.result = res.data.data;
                           vm.progress=false;
                           vm.feedback=true;
                       }
                   })
                   .catch(function(err){
                       console.error(err)
                   });
            }
        },
        destroyed() {
            this.websock.onclose() //离开路由之后断开websocket连接
        },
    }

</script>

<style lang='scss'>
    #money{
        min-height: 600px;
        background-color: #ffffff;
        .btn_box{
            display: flex;
            justify-content: flex-start;
            .upload-demo{
                .el-upload--text{
                    border: none;
                    height: 60px;
                }
            }
        }
        .textbox{
            width: 100%;
            height: 520px;
            overflow-y: auto;
            padding: 10px;
            background-color: #ffffff;
        }
        .feedback_box{
            width: 100%;
            margin-top: 20px;
            overflow-x: auto;
            table{
                width: 100%;
                border-collapse: collapse;
                text-align: left;
                th,td{
                    border-bottom: 1px solid #cccccc;
                    padding-left: 10px;
                    height: 28px;
                    line-height: 28px;
                }
                tbody{
                    tr{
                        &:hover{
                            background-color: rgba(204,204,204,0.2);
                        }
                    }
                }
            }
        }
    }

</style>
