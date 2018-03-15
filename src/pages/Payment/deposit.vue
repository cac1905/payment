<template>
  <div class="payment">

    <h4><i class="ico ico-my-paymethods"></i>请选择适合您的充值方式</h4>

    <div class="pay-methods clearfix">
      <div class="pay-box onlinePay-box">
        <h2>欢迎使用</h2>
        <h3></h3>
        <div class="btn-unionPay">
          <button @click="payType('unionPayOnline')">网银支付</button>
          <button @click="payType('unionPayOffline')" class="closed">银联线下</button>
        </div>
      </div>

      <div class="pay-box jdPay-box">
        <h2>欢迎使用</h2>
        <h3></h3>
        <div class="btn-unionPay">
          <button @click="payType('unionPayOnline')">京东支付</button>
          <button @click="payType('unionPayOffline')" class="closed">京东线下</button>
        </div>
      </div>

      <div class="pay-box wechatPay-box">
        <h2>欢迎使用</h2>
        <h3></h3>
        <div class="btn-wechatPay">
          <button @click="payType('wechatPayOnline')" class="closed">微信支付</button>
          <button @click="payType('wechatPayOffline')" class="closed">微信线下</button>
        </div>
      </div>

      <div class="pay-box ali-box">
        <h2>欢迎使用</h2>
        <h3></h3>
        <div class="btn-aliPay">
          <button @click="payType('aliPayOnline')" class="closed">支付宝支付</button>
          <button @click="payType('aliPayOffline')" class="closed">支付宝线下</button>
        </div>
      </div>

      <div class="pay-box cftPay-box">
        <h2>欢迎使用</h2>
        <h3></h3>
        <div class="btn-caiPay">
          <button @click="payType('tenPayOnline')" class="closed">财付通支付</button>
          <button @click="payType('tenPayOffline')" class="closed">财付通线下</button>
        </div>
      </div>

      <div class="pay-box qqPay-box">
        <h2>欢迎使用</h2>
        <h3></h3>
        <div class="btn-qqPay">
          <button class="closed">QQ钱包</button>
          <button class="closed">QQ线下</button>
        </div>
      </div>

    </div>
    <div class="tips">
      <p class="tips-title">特别提示：</p>  
      请客户在进行存款操作前首先确认持有的银行卡是否具有网上支付功能。若未开通或有其他疑问，请按银行"帮助中心"详细了解及处理。<br> 
      <p class="tips-title">注意事项：</p>  
      1、你所使用的存款银行需要开通网上银行业务。 <br> 
      2、当你在存款过程中遇到任何问题，请随联系我们在线客服咨询或邮箱。<br> 
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        opening:false
      }
    },
    created() {
      // this.getOfflinePayData();
    },
    methods: {
      checkCanUsePay () {
        
      },
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      goAddress(path){
        // if(!sessionStorage.getItem('im_username')) {
        //   this.$swal({
        //     text: "请登录会员账号后体验", 
        //     type: "error",
        //     timer: 1200, 
        //   });
        //   this.$router.push('/home');  
        //   return;      
        // }
        this.$router.push({
          path: path
        })
      },
      payType(payType) {
        this.$emit('child-payType', payType);
        // let self = this;
        // let params = {};
        // let oid_info = sessionStorage.getItem('im_token');
        // params.oid = oid_info;

        // this.$http.post('/user/payin', JSON.stringify(params)).then(res => {
        //     console.log(res.data.alipay_array.length)
        //   if (res.data.msg == "4001") {
        //     this.$router.push({
        //       path: '/home'
        //     })  
        //   } else {
        //     if ((res.data.alipay_array.length === 0 && payType === 'aliPayOffline') || 
        //        (res.data.wechat_array.length === 0 && payType === 'wechatPayOffline') || 
        //        (res.data.bankpay_array.length === 0 && payType === 'unionPayOffline') ||  
        //        (res.data.online_bankU.length === 0 && payType === 'unionPayOnline') || 
        //        (res.data.online_alipay.length === 0 && payType === 'aliPayOnline') || 
        //        (res.data.online_wechatU.length === 0 && payType === 'wechatPayOnline') || 
        //        (res.data.online_cft.length === 0 && payType === 'tenPayOffline') || 
        //        (res.data.online_quickpay.length === 0 && payType === 'tenPayOnline')) {
        //       this.$swal({
        //         text: "暂不支持此种充值方式", 
        //         type: "error",
        //         timer: 1200, 
        //       });
        //       return false
        //     } else {
        //       this.$emit('child-payType', payType);
        //     }
        //   }
        // }); 

      }
    }
  }
</script> 
