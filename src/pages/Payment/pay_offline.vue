<template>
  <div class="payment">
    <h4>
      <i :class="`ico ${bankName==='微信'?'ico-my-wechat': bankName==='支付宝' ? 'ico-my-alipay' : bankName=== 'QQ' ? 'ico-my-qq' : 'ico-my-bank' }`"></i>
      <span>{{bankName}}</span>线下支付详情
    </h4>
    <div>
        <table class="bank-offline-table">
          <tr>
            <th colspan="2" class="title-table">收款方资料</th>
          </tr>
          <tr>
            <th>银行</th>
            <td>{{ bankAddress }}</td>
          </tr>
          <tr>
            <th>开户名</th>
            <td>{{ bankUser }}</td>
          </tr>
          <tr>
            <th>银行账号</th>
            <td>{{ bankAccount }}</td>
          </tr>
          <tr v-if="codeSrc!= ''">
            <th>二维码</th>
            <td><img :src="codeSrc"></td>
          </tr>
        </table>

        <div class="tips">
          <p class="tips-title">温馨提示：</p>  
          一、请在金额转出之后务必填写网页下方的汇款信息表格，以便我们财务人员能及时为您确认添加金额到您的会员账户。 <br>
          二、本公司最低存款金额为{{bankmin}}元。<br>
          此存款信息只是您汇款详情的提交，并非代表存款，您需要自己通过ATM或网银转帐到本公司提供的账户后，填写提交此信息，待工作人员审核充值！<br>
        </div>

        <table class="bank-offline-table userTable">
          <tr>
            <th colspan="2" class="title-table">付款方信息</th>
          </tr>

          <tr>
            <th>用户姓名</th>
            <td><el-input v-model="realname" :minlength="2" :maxlength="6" placeholder="请输入中文姓名"></el-input></td>
          </tr>

          <tr>
            <th>存款金额</th>
            <td>
              <el-input v-model="amount" type="text" :placeholder="`金额范围:${bankmin}~${bankmax}元`"></el-input>
            </td>
          </tr>

          <tr>
            <th>汇款日期</th>
            <td class="dateSelect">
              <el-date-picker
                v-model="orderDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-time-select
                v-model="orderTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="选择时间">
              </el-time-select>
            </td>
          </tr>

          <tr>
            <th>订单号后四位</th>
            <td><el-input v-model="orderNo" :minlength="4" :maxlength="4" placeholder="订单号后四位"></el-input></td>
          </tr>

          <tr>
            <th></th>
            <td class="btnBox"> 
              <Button type="error" size="large" @click.native="reset">重置</Button>
              <Button type="primary"  size="large" :loading="btnLoading" icon="checkmark-round" @click.native="submit">
                <span v-if="!btnLoading">提交</span>
                <span v-else>提交中...</span>
              </Button>
            </td> 
          </tr>
        </table>

        <div class="tips">
          <p class="tips-title">汇款信息提交说明：</p>  
          (1).请按表格填写准确的汇款转账信息,确认提交后相关财务人员会即时为您查询入款情况。 <br>
          (2).请您在转账金额后面加个尾数,例如:转账金额 1000.66 或 1000.88 等,以便相关财务人员更快确认您的转账金额并充值。 <br>
          (3).如有任何疑问,您可以联系在线客服,在线客服为您提供365天×24小时不间断的友善和专业客户咨询服务。<br>
        </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      bankName: '',
      bankAccount: '',
      bankAddress: '',
      bankUser: '',
      bankId: '',
      realname: '',
      amount: '',
      orderNo: '',
      orderDate: '',
      orderTime: '',
      way: '银行',
      codeSrc: '',
      payReason: '',
      bankmax: '49999',
      bankmin: '0',
      payData: [],
      typeName: 'bankpay_array',
      btnLoading: false
    };
  },
  props: {
    payType: {
      type: String
    }
  },
  created () {
    this.getOfflinePayData();
  },
  methods: { 
    submit () {
      this.btnLoading = true;
       let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/; 
      if (this.realname === '' || this.realname.length < 2 || !reg.test(this.realname)) {
        this.$swal({
          text: "请填写中文用户名", 
          type: "error",
          timer: 1200, 
        });
        this.btnLoading = false;
        return false
      }
      if (!this.amount) {
        this.$swal({
          text: "请正确填写存款金额", 
          type: "error",
          timer: 1200, 
        });
        this.btnLoading = false;
        return false
      }
      if (parseInt(this.amount) > this.bankmax || this.amount < this.bankmin){
        this.$swal({
          text: '存款金额范围是: ' + this.bankmin + '~' +this.bankmax + '元', 
          type: "error",
          timer: 1200, 
        });
        this.btnLoading = false;
        return false
      }
      if (!this.orderDate || !this.orderTime) {
        this.$swal({
          text: "请完整填写汇款日期", 
          type: "error",
          timer: 1200, 
        });
        return false
        this.btnLoading = false;
      }
      if (this.orderNo.length != 4){
        this.$swal({
          text: '订单号是4位字符', 
          type: "error",
          timer: 1200, 
        });
        this.btnLoading = false;
        return false
      }
 
      let params = {}; 
      let oid_info=sessionStorage.getItem('im_token');
      params.oid = oid_info;
      params.realname =  this.realname;
      params.amount   =  this.amount;
      params.orderNo  =  this.orderNo;
      params.bank_id  =  this.bankId;
      params.typeName =  this.typeName;
      params.payReason =  this.payReason;
      params.date =  this.orderDate;
      params.bankName =  this.bankName;
      params.way = this.way;

      console.log(params);

      // this.$http.post('/user/offline_pay', JSON.stringify(params)).then(res => {
      //   // console.log(res.data);
      //   if (res.data.msg == "4001") {
      //     this.$router.push({  //  1未登陆
      //       path: '/home'
      //     }) // 跳转到登陆
      //   } else { 
      //     if (res.data.msg == 5007) {
      //       this.$swal({
      //         text: '正在审核中！', 
      //         type: "info",
      //         timer: 1200, 
      //       });
      //     } else if (res.data.msg == 2006) {
      //       this.$swal({
      //         text: '订单提交成功！', 
      //         type: "success",
      //         timer: 1200, 
      //       });
      //     } else if (res.data.msg == 5006) {
      //       this.$swal({
      //         text: '操作繁忙，请稍后再试！', 
      //         type: "error",
      //         timer: 1200, 
      //       });
      //     } else if (res.data.msg == 4001) {
      //       this.$router.push({
      //         path: '/home'
      //       }) // 跳转到登陆
      //     } else if (res.data.msg == 3003) {
      //       this.$swal({
      //         text: '缺失必填参数,请重试！', 
      //         type: "error",
      //         timer: 1200, 
      //       });
      //     }
      //    this.btnLoading = false;
      //     this.reset ();
      //   }
      // }) 
    },
    reset () {
      this.realname = "";
      this.amount = "";
      this.orderNo = "";
      this.orderTime = "";
      this.orderDate = "";
    },
    getOfflinePayData() {
      let params = {}; 
      let oid_info=sessionStorage.getItem('im_token');
      params.oid = oid_info;
      // this.$http.post('/user/payin', JSON.stringify(params)).then(res => {
      //   // console.log(res.data.wechat_array[0].bank_addres)
      //   if (res.data.msg == "4001") {
      //     this.$router.push({
      //       path: '/home'
      //     })
      //   } else {
      //     switch(this.payType){
      //       case 'unionPayOffline':
      //         this.payData = res.data.bankpay_array;
      //         break;
      //       case 'aliPayOffline':
      //         this.payData = res.data.alipay_array;
      //         this.codeSrc = res.data.alipay_array[0].bank_image_url;
      //         break;
      //       case 'wechatPayOffline':
      //         this.payData = res.data.wechat_array;
      //         this.codeSrc = res.data.wechat_array[0].bank_image_url;
      //         break;
      //       case 'tenPayOffline':
      //         this.payData = res.data.quickpay_array;
      //       break;
      //     }

      //     this.bankAddress = this.payData[0].bank_addres; 
      //     this.bankAccount = this.payData[0].bank_account; 
      //     this.bankName = this.payData[0].bank_name; 
      //     this.bankUser = this.payData[0].bank_user; 
      //     this.bankId = this.payData[0].id;
      //     this.bankmax = parseInt(res.data.moneylimit.bankmax);
      //     this.bankmin = parseInt(res.data.moneylimit.bankmin);
      //   }
      // })
    }
  }
}
</script>

<style>
  .payment {
    background-color: #fff;
  } 
  .bank-offline-table { 
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
  }
  .bank-offline-table td,
  .bank-offline-table th {  
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 15px;
  } 
  .bank-offline-table .title-table {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-top: none;
    border-bottom: 1px solid #ddd;
    background-color: #f8f9fb;
    color: #333;
    font-size: 16px;
  }
  .bank-offline-table tr:nth-child(odd) {
    background-color: #f8f9fb;
  }
  .userTable tr:nth-child(odd) {
    background-color: #fff;
  }
  .userTable .el-input__inner {
    width: 260px;
    height: 35px;
  }
  .dateSelect .el-input__inner {
    width: 146px; 
  } 
  .dateSelect .el-date-editor.el-input, 
  .dateSelect .el-date-editor.el-input__inner {
    width: 106px; 
  }
  .dateSelect .el-input__inner,
  .dateSelect .el-date-editor.el-input, 
  .dateSelect .el-date-editor.el-input__inner {
    width: 128px; 
  }
  .dateSelect .el-input--suffix .el-input__inner {
    padding-right: 17px;
  }
  .userTable td,
  .userTable th {
    padding: 3px 15px;
  }
  .bank-offline-table th {
    width: 15%;
    color: #666;
  }
  .btnBox {    
    /*width: 100%;*/
    /*text-align: center!important;*/
    padding: 20px 15px!important;
  }
  .btnBox button {
    border: none;
  }
  
</style>
