<template>
<div style="height:100%">
 
  <div class="bank">
            
    <!--<img src="../../../static/images/bank.png" style="width:1rem;height:1rem" alt=""/>
    <p>银行卡管理</p>-->
    <div><span>用户:</span><i>{{gameUsername}}</i></div>
    <div><span>余额:</span><i>￥{{gameUsermoney}}</i></div>
  </div>
  <!--<div class="js" v-show="check&&isBank">
    <p style="margin-left:0">{{resDate.bank_name}}</p>
    <p style="margin-left:0;color:#999999">{{resDate.bank_code}}</p>
    <a>
            <img src="../../../static/images/setting.png" alt="" @click.stop='tiaozhuan' style="width:1rem;height:1rem" />
        </a>
  </div>-->
  <div v-if="check&&!isBank" class="ban" style="text-align:center;" @click='tiaozhuan'>
    <a>
            <!-- <img src="../../../static/images/ch.png" alt="" /> -->
        </a>
    <span>添加/删除银行账户</span>
  </div>
  <!--订单状态  组件-->
  <div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab  value="all" title="充值" />
      <mu-tab  value="obligation" title="提现" />
      <mu-tab  value="paid" title="交易记录" />
    </mu-tabs>
    <div class="payTab" v-if="activeTab ==='all'">
      <div class="order_title">
        在线支付 Online Payment
      </div>
      <div class="ban" @click="gotoPayAddress(onlinePay)" v-if="BankisCunzai.length>0">
        <!-- <img src="../../../static/images/livepay.png" alt="" /> -->
        <p>网银在线充值</p>
      </div>
      <div class="ban" @click="gotoPayAddress(aliPay)" v-if="AliisCunzai.length>0">
        <!-- <img src="../../../static/images/bao.png" alt="" /> -->
        <p>支付宝在线充值</p>
      </div>
      <div class="ban" @click="gotoPayAddress(wechatPay)" v-if="WechatisCunzai.length>0">
        <!-- <img src="../../../static/images/weixin.png" alt="" /> -->
        <p>微信在线充值</p>
      </div>
      <div class="ban" @click="gotoPayAddress(CftPay)" v-if="CftisCunzai.length>0">
        <!-- <img src="../../../static/images/cft.png" alt="" /> -->
        <p>财付通在线充值</p>
      </div>
      <div class="order_title">
        线下支付 Offline Payment
      </div>
      <!--<div class="ban" @click="gotoPayAddress(handPay)">
        <img src="../../../static/images/hands.png" alt="" />
        <p>公司入款</p>
  
      </div>-->
        <div class="ban"  @click="gotoPayAddress(handPay,'bankpay_array')" v-if="lineBankisCunzai.length>0">
        <!-- <img src="../../../static/images/livepay.png" alt="" /> -->
        <p>银行转账</p>
      </div>
      <div class="ban"  @click="gotoPayAddress(handPay,'alipay_array')" v-if=" lineAliisCunzai.length>0">
        <!-- <img src="../../../static/images/bao.png" alt="" /> -->
        <p>支付宝转账</p>
      </div>
       <div class="ban"  @click="gotoPayAddress(handPayz,'wechat_array')" v-if="lineWechatisCunzai.length>0">
        <!-- <img src="../../../static/images/weixin.png" alt="" /> -->
        <p>微信转账</p>
      </div>
      <div class="ban"  @click="gotoPayAddress(handPayz,'cft_array')" v-if="lineCftisCunzai.length>0">
        <!-- <img src="../../../static/images/cft.png" alt="" /> -->
        <p>财付通转账</p>
      </div>
     
    </div>

    <div class="take_class" v-if="activeTab ==='obligation'">
      <div v-if="isBank" >
        <div class="js" @click='tiaozhuan'>
          <!-- <img src="../../../static/images/jsyh.png" style="width:1.5rem;float:left;position:relative;top:0.2rem;" alt="" /> -->
          <p>{{resDate.bank_name}}</p>
          <p>{{resDate.bank_code}}</p>
          <a >
                <!-- <img src="../../../static/images/28.png" alt="" /> -->
              </a>
        </div>
        <div class="js1">
          <p>提现金额<span>(账户余额{{resDate.money}})</span></p>
          <p style="font-size:0.9rem">
            <!-- <img src="../../../static/images/money1.png" style="width:0.9rem;position:relative;top:-0.1rem" alt="" /> -->
            <span>¥</span><input type="number" placeholder="金额" v-model="payMoney" min="100" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
          </p>
        </div>
        <div class="js1">
          <p>提款密码</p>
          <p>
            <input type="password" placeholder="请正确填写4位取款密码" v-model="paypassWd" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
          </p>
        </div>
        <div class="btn2">
          <button @click='chongzhi'>重置</button>
          <button class="color1" @click="submit2">确认</button>
        </div>
      </div>

      <div v-if="!isBank" @click='tiaozhuan()'  class="isBank_b">
          <span>
              请先添加银行卡
          </span>
      </div>
    </div>

    <div class="cun_qu_list" v-if="activeTab ==='paid'" ref="historyM">
      <div class="demo-infinite-container" style="border:none;">
        <mu-list>


          <template v-for="item in list">
                <div class="js2"  @click="isShowMoney1(item)">
                  <p style="font-size:0.65rem;">{{getLocalTime(item.addtime)}}</p>
                  <p style="color:#999999" class="">{{parseInt(item.type_code)?'出款':'入款'}}：{{item.money}}</p>
                  <a>
                    <!-- <img src="../../../static/images/28.png" alt=""/> -->
                  </a>
                  <span class="color_money">{{parseInt(item.status)?'已处理':'等待审核'}}</span>
                </div>
                <!-- <mu-list-item :title="item"/> -->
                <mu-divider/>
          </template>

        </mu-list>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
      </div>


    </div>
  </div>
  <!--遮罩层开始-->
  <div class="zzc" v-if="isShowMoney">
    <div class="white">
      <div>交易记录详情
        <span id="x">
                    <!-- <img src="../../../static/images/guanb.png" alt=""  @click = "qufan()" /> -->
                </span>
      </div>
      <p>交易单号：<span>{{singeMoney.order_code}}</span></p>
      <p>交易时间：<span>{{getLocalTime(singeMoney.addtime)}}</span></p>
      <p>交易方式：<span>{{parseInt(singeMoney.type_code)?'出款':'入款'}}</span></p>
      <p>交易状态：<span>{{parseInt(singeMoney.status)?(parseInt(singeMoney.is_clear)?"审核成功":"审核失败"):('等待审核')}}</span></p>
      <p>交易金额：<span>{{singeMoney.money}}</span></p>
      <p>操作原因：<span>{{singeMoney.context?singeMoney.context:"无"}}</span></p>

    </div>
  </div>
 <div v-show="isHao">
      <div class="modal_box_feedback">
         <div class="modal_div">
                <div class="modal_header color1">
                    <span>通知</span>
                    <i></i>
                </div>
                <div class="modal_foot">
                    <div ref="rscenter"></div>
                    <p>{{title}}</p>
                </div>  
        </div>
      </div>
    </div>

  <!--遮罩层结束-->
</div>
</template>

<script> 
export default {
  components: {
  },
  data() {

    return {
        is_gd_ali: is_gd_ali(),
        gameUsername:0,
        gameUsermoney:0,
      isChOrRu:0,
      bankmin:0,
      bankmin2:100,
      bankmax2:0,
      bankmax:0,
      singeMoney:{},
      AliisCunzai:0,
      WechatisCunzai:0,
      BankisCunzai:0,
      CftisCunzai:0,
      lineAliisCunzai:0,
      lineWechatisCunzai:0,
      lineBankisCunzai:0,
      lineCftisCunzai:0,
      isShowMoney:0,
      list:[],
      page:1,
      number:10,
      num: 10,
      loading: false,
      scroller: null,
      resDate: {},
      resDateBank: [],
      resDateAli: [],
      resDateWechat: [],
      resDateHand: {},
      paypassWd: "",
      payMoney: null,
      isBank: false,
      aliPayId: '',
      wechatPayId: "",
      onlinePayId: "",
      payId: "",
      onlinePay: 55,
      wechatPay: 66,
      CftPay:88,
      handPay: "handPay",
      aliPay: 77,
      activeTab: 'all',
      isHao: false,
      title: '',
      check: true
    }
  },
  mounted() {
    this.scroller = this.$refs.historyM;
  },
  　beforeCreate() {
    let params = {};
    let userOid = getOid();
    params.oid = userOid;
    this.$http.post(`${getUrl()}/getinfo/money`, JSON.stringify(params)).then(res => {
      if (res.data.msg == "4001") {
        // let timeStamp = res.data.next.timestap;
        this.$router.push({
          path: '/login'
        }) // 跳转到登陆
      } else {
          this.gameUsername =res.data.username;
            this.gameUsermoney = res.data.money;
        this.resDate = res.data;
        if (this.resDate.bank_code) {
          this.isBank = true;
        }
      }

    })
    this.$http.post(`${getUrl()}/user/payin`, JSON.stringify(params)).then(res => {
      if (res.data.msg == "4001") {
        // let timeStamp = res.data.next.timestap;
        this.$router.push({
          path: '/login'
        }) // 跳转到登陆
      } else {
        this.lineAliisCunzai =res.data.alipay_array;
          this.lineWechatisCunzai =res.data.wechat_array;
          this.lineBankisCunzai =res.data.bankpay_array;
          this.lineCftisCunzai =res.data.quickpay_array;
        this.resDateBank = res.data.online_bank;
        this.resDateAli = res.data.online_alipay;
        this.resDateWechat = res.data.online_wechat;
        this.BankisCunzai = res.data.online_bank;
        this.AliisCunzai = res.data.online_alipay;
        this.CftisCunzai = res.data.online_cft;
        this.WechatisCunzai = res.data.online_wechat;
        this.bankmin = Number(res.data.moneylimit.bankmin);
        this.bankmax = Number(res.data.moneylimit.bankmax);
      }

    })

  },
    created(){
      this.isChOrRu = this.$route.params.id.split(':')[1];
      if (Number(this.isChOrRu)) {
        this.handleTabChange("obligation")
      }
    let param = {};
    let userOid = getOid();
    param.oid = userOid;
    param.page = this.page;
    param.number = this.number;
    this.$http.post(`${getUrl()}/getinfo/record`, JSON.stringify(param)).then(res => {
      if (res.data.msg == "4001") {
        // let timeStamp = res.data.next.timestap;
        this.$router.push({
          path: '/login'
        }) // 跳转到登陆
      } else {
        this.list=res.data.res;
        this.zongshu =  res.data.allnmb;
      }
    })
  },
  methods: {

    chongzhi(){
      this.payMoney = null;
      this.paypassWd='';
    },

    qufan(){
      this.isShowMoney = !this.isShowMoney;
    },
    isShowMoney1(item){
      this.singeMoney = item;
      this.isShowMoney = !this.isShowMoney;
    },
    getLocalTime(nS) {
     let time=new Date(parseInt(nS) * 1000)
     let year=time.getFullYear();
     let month=time.getMonth()+1;
     let date=time.getDate();
     let time_split=time.toLocaleTimeString().split(":")
     let time_a=`${time_split[0]}:${time_split[1]}`
      return `${year}年${month}月${date}日${time_a}`
},
    loadMore() {
      if (this.page*10<=this.zongshu) {
        this.loading = true;
        this.page++;
        let param = {};
        let userOid = getOid();
        param.oid = userOid;
        param.page = this.page;
        param.number = this.number;
        this.$http.post(`${getUrl()}/getinfo/record`, JSON.stringify(param)).then(res => {

          if (res.data.msg == "4001") {
            // let timeStamp = res.data.next.timestap;
            this.$router.push({
              path: '/login'
            }) // 跳转到登陆
          } else {
            for (let i = 0; i < res.data.res.length; i++) {
              this.list.push(res.data.res[i]);
            }
            this.num +=10;
            this.loading = false;
          }

        })
      }
      else{
       
         return
      }


    },
    submit2() {
//      debugger
      if (this.payMoney<this.bankmin2||this.payMoney>this.gameUsermoney) {
     console.log(this.payMoney,this.gameUsermoney);
        this.payMoney<this.bankmin2?this.title = `取款金额不能少于${this.bankmin2}`: this.title = `取款金额不能大于${this.gameUsermoney}`
          this.isHao = true
          setTimeout(() => {
            this.isHao = false
            return
          },1200)
        } else if(this.payMoney>=100) {
        let params = {};
        let userOid = getOid();
        params.oid = userOid;
        params.money = this.payMoney;
        params.paypasswd = this.paypassWd;
        params.bankname = this.resDate.bank_name;
        params.bankaddress = this.resDate.bank_address;
        params.bankcode = this.resDate.bank_code;
        let postKind = this.$http;
        this.$http.post(`${getUrl()}/user/online_get`, JSON.stringify(params)).then(res => {
          if (res.data.msg == "4001") {
            // let timeStamp = res.data.next.timestap;
            this.$router.push({
              path: '/login'
            }) // 跳转到登陆
          } else {
            //xiaosi
            //  this.resDate = res.data;


            if (res.data.msg == 3003) {
              this.title = "缺失必填参数"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false

              }, 1200)
            } else if (res.data.msg == 2007) {
              this.title = "支付密码错误"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else if (res.data.msg == 5006) {
              this.title = "操作频繁，请稍后重试"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else if (res.data.msg == 2006) {
              //xiaosi
                if(this.is_gd_ali){
                            // this.$refs.rscenter.style.backgroundImage="url('../../../static/images/suuccen.png')"
                        }else{
                            // this.$refs.rscenter.style.backgroundImage="url('../../../static/images/gdsuuccen.png')"
                        }
              this.title = "取款信息提交成功"
              this.isHao = true;
              this.paypassWd = "",
                this.payMoney = null,
                setTimeout(() => {
                  this.isHao = false
                }, 1200);
            } else if (res.data.msg == 5004) {
              this.title = "金额不足"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else if (res.data.msg == 6003) {
              this.title = "金额数量少于最低限制100元"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            }else if (res.data.msg == 20061) {
              this.title = "余额不足，提款失败"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            } else {
              this.title = "取款信息提交失败"
              this.isHao = true
              setTimeout(() => {
                this.isHao = false
              }, 1200);
            }

          }

        })
      }


    },
//  juhe() {
//    // alert(this.check)
//    this.check = !this.check
//  },
    //       gotoAddress(k) {
    //       if (k = this.onlinePay&&this.resDate.length==0) {
    //       }
    //       else {
    //
    //             this.$router.push(k)
    //       }
    //
    //       },
    gotoPayAddress(kind,zf) {
        
        if(kind =="handPay"){
            let i = `/handPay:${zf}`;
//          this.$router.push(kind:i)
          this.$router.push({path:i})
          
        }

        else{ let i = `/pay:${kind}`;
         
          this.$router.push({path:i})}

    },
    tiaozhuan() {
      this.$router.push({
        path: '/hahaMoney'
      })
    },

    handleTabChange(val) {

      if (val =='paid') {
        let param = {};
        let userOid = getOid();
        param.oid = userOid;
        param.page = this.page;
        param.number = this.number;
        this.$http.post(`${getUrl()}/getinfo/record`, JSON.stringify(param)).then(res => {

          if (res.data.msg == "4001") {
            // let timeStamp = res.data.next.timestap;
            this.$router.push({
              path: '/login'
            }) // 跳转到登陆
          } else {
            this.list=res.data.res;
            this.zongshu =  Number(res.data.page.allnmb);
          }

        })
      }
    this.activeTab = val




    }
  }
} 
</script>

<style scoped>
.demo-infinite-container {
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
}
.mu-tabs {
    background: #fff;
}
 .mu-tabs   button {
    color: #000;
    font-size: 0.65rem;
    border-right: 1px solid #F4F4F4;
    margin-right: -1px;
    padding: 10px;
    height: 2.2rem;
    line-height: 1.8rem;
    min-height: 1rem; 
}

.atctive {
    display: none;
}
.bank {
    height: 2.5rem;
    background: #fff;
    box-shadow: 0 1px 5px 0 #E4E4E4;
    position: relative;
    z-index: 10;
    line-height: 2.5rem;
    padding-left: 1rem;
}
.ban {
    height: 2.5rem;
    background: #fff;
    position: relative;
    z-index: 10;
    line-height: 2.5rem;
    padding-left: 1rem;
    border-bottom: 1px solid #E4E4E4;
}
.js,
.js1,
.js2 {
    height: 3rem;
    background: #fff;
    line-height: 2rem;
    border-bottom: 1px solid #E4E4E4;
    padding: 0.5rem 1rem;
}

.js1 {
    margin-top: 0.5rem;
}
.js1 p {
    line-height: 1rem;
    font-size: 0.7rem;
    color: #C0C0C0;
    height: 1.3rem;
}
.js1 p:first-child {
    color: #545454;
}
.js1 p:first-child span {
    color: #ACACAC;
}
.js1 p:nth-child(2) input {
    width: 90%;
    border: none;
    outline: none;
    font-size: 0.64rem;
    position: relative;
    top: -0.2rem;
   /* padding-left: 10/20rem;*/
    color: #ACACAC;
}
.js1 p::-webkit-input-placeholder {
    color: #DADADA;
}
.js p,
.js2 p {
    line-height: 1rem;
    font-size: 0.7rem;
    color: #B8B8B8;
    width: 80%;
    height: 1.3rem;
    margin-left: 2rem;

}
.js2 p {
    margin-left: 0;
}
.js2 span {
    float: right;
    position: relative;
    top: -2.5rem;
    left: -1rem;
    color: #6C96E6;
    font-size: 0.6rem;
}
.js a,
.js2 a {
    text-decoration: none;
    img {
        float: right;
        margin-top: -2rem;
        width: 0.5rem;
    }
}
.bank p {
    display: inline-block;
    color: #777777;
    font-size: 0.7rem;
}
.bank {
    position: relative;
    margin-bottom: 0.3rem;
}
.bank div{
    width: 40%;
    display: inline-block;
}
.bank i{
    color: #196fde;
    margin-left: 0.2rem;
} 
.bank div:nth-child(1){
    text-align: left;
}
.bank div:nth-child(2){
    text-align: right;
    margin-left: 2rem;
}
 
 
.ban p {
    display: inline-block;
    color: #ACACAC;
    font-size: 0.6rem;
}
.ban a {
    text-decoration: none;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 100;
    border-radius: 50%;
    color: #2A92CB;
    position: relative;
    top: 0.1rem;
}
.js p:nth-child(1){
  margin-left:0!important;
}
.js p:nth-child(2){
  margin-left:0!important;
}
.ban span {
    color: #CDCDCD;
    font-size: 0.6rem;
}
.mu-tabs {
    box-shadow: 0 1px 20px -2px #aaa;
    position: relative;
    z-index: 100;
    border-bottom: 1px solid #DDDEE2;
}
.ban img {
    width: 0.8rem;
}
.order-list {
    margin-top: -0.6rem;
}
.tab1 > div {
    margin-top: 0.6rem;
    border-top: 1px solid #E4E4E4;
}
.mu-tab-active {
    background: #166ADE;
    color: #fff !important;
}
.btn2 {
    margin: 1.5rem auto;
    text-align: center;
}
.btn2 button {
    height: 2rem;
    line-height: 2rem;
    border-radius: 5px;
    outline: none;
    width: 7rem;
    border: none;
    font-size: 0.7rem;
}
.btn2 button:first-child {
    background: #B5B5B5;
    color: #E5E5E5;
}
.btn2 button:nth-child(2) {
    background: #0857D8;
    color: #F3FAFE;
}
span.mu-tab-link-highlight {
    display: none;
}
.zzc {
    position: absolute;
    z-index: 100;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);

}
.white {
    background: #fff;
    width: 14rem;
    border-radius: 5px;
    margin: 8rem auto;
}
.white div {
    padding: 0.5rem 0.8rem;
    font-size: 0.6rem;
    color: #333;
    border-bottom: 1px solid #DADADA;
}
.white div span {
        float: right;
        width: 1rem;
        margin-top: -0.2rem;
    } 
.white div   p {
    height: 1.8rem;
    line-height: 1.8rem;
    margin: auto 0.8rem;
    font-size: 0.6rem;
    color: #333;
    border-bottom: 1px solid #DADADA;
}
 .white div   p        span {
        float: right;
    } 
 

.cun_qu_list{
  height: 370/20rem;
  overflow-y: scroll;
}

.cun_qu_list_b{
  height: 440/20rem;
  overflow-y: scroll;
}

.isBank_b{
  display: flex;
  justify-content: center;
  padding: 20/20rem;
  font-size: 18/20rem;
}

.order_title{
  color: #8f8f8f;
  padding: 10/20rem 0/20rem 10/20rem 20/20rem;
}



</style>
