<template>
    <div id="money">
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：新建转账</p>
        <div class="btn_box">
            <el-button type="primary" @click=initWebSocket style='height: 36px;'>新建转账</el-button>
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
        <div class="textbox">
            <p v-for='(item,index) in websockData' :key='index'>{{item}}</p>
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
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            initWebSocket(){
                //初始化weosocket
                this.websockData = ['程序启动中......'];
                if ("WebSocket" in window) {
                    const wsuri = "ws://47.106.39.104:80/oa/money";
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
                console.log(this.websockData);
            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                if(this.websock.readyState == 3 && !!this.websock){
                    this.websockData.push('执行完毕,断开连接')
                    this.load = false;
                    window.location.href = window.$g_Api+"/oa/download_transfer_file"
                }else {
                    this.websockData.push('程序出错,断开连接')
                }
            },
            uploadFile: function (response, file, fileList) {
                console.log(response);
                if(response.code == 0){
                    this.$message.success('上传成功')
                }else {
                    this.$message.error(response.message)
                }

            },
            error: function (err, file, fileList) {
                console.log(err);
                this.$message.error(err.message)
            }
        },
        destroyed() {
            this.websock.onclose() //离开路由之后断开websocket连接
        },
    }

</script>

<style lang='scss'>
    #money{
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
            margin-top: 20px;
        }
    }

</style>
