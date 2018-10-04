<template>
    <div id="dataManage">
        <img class='alipayCode' src="static/img/327552709660388901.jpg" alt="">
        <div class="text_box">
            <h3>充值规则</h3>
            <p>1. 打开手机支付宝,点击右上角扫一扫功能扫描网页左侧支付宝二维码</p>
            <p>2. 输入充值金额</p>
            <p>3. 在<span>支付备注区</span>填写自己的<span>铁牛系统用户账号</span>(页面右上角)</p>
            <p style='color: red;'>温馨提示:请在确认转账信息填写无误之后再进行转账,如遇充值问题请联系客服:124355321342</p>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'dataManage',
        data: () => ({
        })
    }
</script>

<style lang='scss' scoped>
#dataManage{
    width: 800px;
    height: 600px;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 40px 0 0 40px;
    display: flex;
    justify-content: flex-start;
    .alipayCode{
        display: block;
        width: 200px;
        height: 300px;
    }
    .text_box{
        flex: 1;
        padding: 0 40px;
        h3{
            margin-bottom: 16px;
        }
        p{
            margin-bottom: 10px;
            span{
                color: red;
            }
        }
    }
}

</style>
