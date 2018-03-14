<template>
  <div class="payment">
    <h4>
      <i :class="`ico ${payType==='微信'?'ico-my-wechat': bankName==='支付宝' ? 'ico-my-alipay' : bankName=== 'QQ' ? 'ico-my-qq' : 'ico-my-bank' }`"></i>
      <span>{{bankName}}</span>在线支付
    </h4>

    <div v-if='subm'>
      <p class="pay-title">请输入充值金额</p>
        <form ref="formPay" method="post" target="_blank" onsubmit="return false">
        <el-row class="inputArea">
          <el-col :span="6">
              <!-- <el-tooltip :content="`单笔下限${moneyMin},单笔上限${moneyMax}`" placement="right" effect="light"> -->
                <div class="inputBox ">
                    <span>￥</span>
                    <el-input v-model="shu" @input="chkInput(shu)"></el-input>
                    <span class='el-icon-error' @click="clearNum"></span>
                    <div class="limit-tips">
                      单笔下限<i>{{moneyMin}}</i>,单笔上限<i>{{moneyMax}}</i>
                    </div>
                </div>
              <!-- </el-tooltip> -->
          </el-col>

        </el-row>
 
        <el-row :gutter="20" style='margin-top:40px;'>
          <el-col :span="3" v-for='(item,index) in list'><div ref='xuan' class="btn-number"  @click="select(item,index)">{{item}}</div></el-col>
        </el-row>

        <el-row v-if="payType != 'jdPayOnline'">
            <el-col :span="2">
                <div class="grid-content bg-purple-dark" >
                 <p class="pay-title">选择银行：</p>
                </div>
            </el-col>

            <el-col :span="6"><div class="grid-content bg-purple-dark">
                <el-select style='height:28px;line-height:28px;outline:none;width:100%;' v-model="selectBank" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item"
                      :value="item">

                    </el-option>
                  </el-select>
            </div></el-col>
          </el-row>

     </form>
        <div class="btn-box" > 
              <Button type="error" size="large" @click.native="reset">重&nbsp;置</Button>
              <Button type="primary"  size="large" :loading="btnLoading" icon="checkmark-round" @click.native="submitM">
                <span v-if="!btnLoading">提交</span>
                <span v-else>提交中...</span>
              </Button> 
        </div> 
    </div>
   <!--  <div v-if='!subm'>
        <iframe style='width:100%;height:400px;' :src='dizhi'></iframe>
    </div> -->
  </div>
</template>
<script>
    // import Dialog from './dialog'
export default {
  data () {
    return {
      moneyMin: 0,
      moneyMax: 0,
      bankName: '',
      radio: '0',
      selec:false,
      subm:true,
      payUrl:'',
      dizhi:null,
      online_cftU:null,
      online_alipayU:null,
      online_bank:null,
      online_wechatU:null,
      shu:'',
      balance:sessionStorage.im_money,
      list:[100,200,500,1000,2000,3000,5000,10000],
      btnLoading: false,
      selectBank:'农业银行',
      options: ["农业银行", "中国银行", "招商银行", "建设银行", "交通银行", "工商银行", "渤海银行", "光大银行", "兴业银行", "民生银行", "中信银行", "广发银行", "华夏银行", "平安银行", "邮政储蓄银行", "浦发银行","北京农商", "上海银行"]
    };
  },
  props: {
    payType: {
      type: String
    }
  },
  created () {
    // this.getPayData ();
  },
  methods: {
    chkInput (shu) {  
      let r = /^\+?[1-9][0-9]*$/;　　//正整数 
      if(!r.test(shu)){
        this.shu=''
        return
      }
      this.$emit('child-step','step1');      
    },
    select(item,index){
      this.$emit('child-step','step1');
      this.shu=item;
      console.log(index)
      this.$refs.xuan.map( item=>{
          item.className='btn-number'
      })
      this.$refs.xuan[index].className='active1 '
    },
    reset(){
      this.shu='';
      this.$refs.xuan.map( item=>{
        item.className='btn-number'
      })
    },
    clearNum () {
      this.shu='';
    },
    getPayData () {
      let params = {};
      let oid_info = sessionStorage.getItem('im_token');
      params.oid = oid_info;
      this.$http.post('/user/payin',  params).then(res => {
          console.log(res)
        // if (res.data.msg == "4001") {
        //   this.$router.push({
        //     path: '/home'
        //   })  
        // } else {  
        //   switch(this.payType){
        //     case 'unionPayOnline':
        //       this.payData = res.data.bankpay_array;
        //       this.bankName = '网银'; 
        //       this.online_bank=res.data.online_bankU
        //       console.log(this.online_bank)
        //       this.moneyMax = parseInt(res.data.moneylimit.bankmax);
        //       console.log(this.moneyMax)
        //       this.moneyMin = parseInt(res.data.moneylimit.bankmin);
        //       break;
        //     case 'aliPayOnline':
        //       this.payData = res.data.alipay_array;
        //       this.bankName = '支付宝'; 
        //       this.online_alipayU=res.data.online_alipayU
        //       this.moneyMax = parseInt(res.data.moneylimit.alipaymax);
        //       this.moneyMin = parseInt(res.data.moneylimit.alipaymin);
        //       break;
        //     case 'wechatPayOnline':
        //       this.payData = res.data.wechat_array;
        //       this.bankName = '微信'; 
        //       this.online_wechatU=res.data.online_wechatU;
        //       this.moneyMax = parseInt(res.data.moneylimit.wechatmax);
        //       this.moneyMin = parseInt(res.data.moneylimit.wechatmin);
        //       break;
        //     case 'tenPayOnline':
        //       this.payData = res.data.quickpay_array;
        //       this.bankName = '财付通'; 
        //       this.online_cftU=res.data.online_cftU;
        //       this.moneyMax = parseInt(res.data.moneylimit.cftpaymax);
        //       this.moneyMin = parseInt(res.data.moneylimit.cftpaymin);
        //     break;
        //   }
        // } 

      });
    },
    gobank(path){
       this.$router.push(path); 
    },
    submitM(){
      this.btnLoading = true;
      // console.log(this.shu)
      // console.log(this.moneyMax)
       
      if(this.shu<=0||this.shu==''){
        // this.$swal({
        //   text: '请输入充值金额', 
        //   type: "error",
        //   timer: 1200, 
        // });
        alert ('请输入充值金额')
        this.btnLoading = false;
        return 
      }
      /*else if (parseInt(this.shu) > this.moneyMax || this.shu < this.moneyMin){
        this.$swal({
          text: '存款金额范围是: ' + this.moneyMin + '~' +this.moneyMax + '元', 
          type: "error",
          timer: 1200, 
        });
        return false
      }*/
      else{
        let headers = {
          'Content-Type': 'application/json'
        }
        let params = {}
        if (sessionStorage.getItem('username')) {
           params.username = sessionStorage.getItem('username');
         } else {
          params.username = 'sim123';
         }

        if (this.payType === 'jdPayOnline') {  // 京东
          params.payType = 4;
          params.bankCode = 'JDPAY';
          params.amount = this.shu;
          // params.orderNo = `${new Date().getTime()}`;
          params.orderNo = '8612329';
        } 
        // this.$emit('child-step','step');
 
        this.$http.post('http://103.85.21.46:8080/onlinePay', JSON.stringify(params),{headers}).then(res => {
          this.btnLoading = false;
          console.log(res)
          // console.log(res.data.msg)
          if (res.data.msg === 'success') {
            console.log(res.data.data)
            // window.open(res.data.data) 
            /*this.$http.post(res.data.data, JSON.stringify(),{headers}).then(response => {
              console.log(response)
            });*/
          }
        });





        // let t = this.paramsL;

        // this.payUrl = `&money=${this.shu}`;
        // let payUrl = `${this.online_cftU[0]}${this.payUrl}`;
        // this.$refs.formPay.setAttribute("action", payUrl);
        // sessionStorage.setItem('payUrl', payUrl);
        // window.open(payUrl)

        // if(this.bankName=='网银'){
        //    let payUrl = `${this.online_bank[0]}${this.payUrl}`;
        //     this.$refs.formPay.setAttribute("action", payUrl);
        //      window.open(payUrl)
          
        //   sessionStorage.setItem('payUrl', payUrl);
        // }else if(this.bankName=='支付宝'){
        //     let payUrl = `${this.online_alipayU[0]}${this.payUrl}`;
        //      this.$refs.formPay.setAttribute("action", payUrl);
        //       sessionStorage.setItem('payUrl', payUrl);
        //       window.open(payUrl)
        // }else if(this.bankName=='微信'){
        //            let payUrl = `${this.online_wechatU[0]}${this.payUrl}`;
        //             this.$refs.formPay.setAttribute("action", payUrl);
        //           sessionStorage.setItem('payUrl', payUrl);
        //           window.open(payUrl)
            
             
        // }else if(this.bankName=='财付通'){          
        //            let payUrl = `${this.online_cftU[0]}${this.payUrl}`;
        //             this.$refs.formPay.setAttribute("action", payUrl);
        //           sessionStorage.setItem('payUrl', payUrl);
        //           window.open(payUrl)
        // }
       
       
       
        

       
      }
      /*let t = this.paramsL;
      this.payUrl = `${t}&money=${this.shu}`
      let payUrl = `${getUrl()}/user/payTheTransfer2?transfer=${this.payUrl}&PayID=${this.bankName}`
      this.$refs.formPay.setAttribute("action",payUrl);
      if(this.canSumbit==true&&this.canSubmitMax==true){
        this.$refs.formPay.submit();
      }*/
    }
  }
}
</script>

 
<style type="text/css" media="screen">
.bank{
    text-align: left;
}
.tian{
    font-size: 18px;
    width: 238px;
    height: 58px;
    line-height: 58px;
    margin: 0px auto;
    border: 1px solid #e6e7ec;
    border-radius: 5px;
    color: #43387c;
}
.head{
    border-bottom: 1px solid #e6e7ec;
}
.inputBox{
  position:relative;
}
.inputBox span:first-child{
  font-size: 26px;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 3px;
  top: 5px;
  color: #7b72c5;
  z-index: 7;
}
.inputBox input{
    text-align: left;
    padding: 0 30px;
    font-size: 20px;
    color: #7b72c5;
}
.inputBox span {
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  color: #e9e5e5;
  cursor: pointer;
}
.inputBox span:hover {
  color: #b0afaf;
}
.btn-number {
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 5px #ccc;
    height: 40px;
    border: 2px solid #fff;
    font-size: 16px;
    line-height: 40px;
    color: #666666;
    cursor: pointer;
}
.active1,
.btn-number:hover {
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 5px #ccc;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    border: 2px solid #ec6876;
    color: #ec6876;

}
.pay-title {
  text-align: left;
  color: #333;
  font-size: 14px;
  margin-top: 10px;
}
.btn-box {
  margin: 40px 0 20px 0;
}
.btn-box .btn-pink,
.btn-box .btn-blue {
  display: inline-block;
}
.inputArea {
  margin: 20px 0;
}
.inputBox .limit-tips {
  position: absolute; 
  right: -210px;
  top: 5px;
}
.inputBox .limit-tips i {
  color: red;
  margin: 0 2px;
  font-style: inherit;
  font-weight: bold;
}
</style>
