<template>
<div class="content moneyManage-page">
  <nav>
    <h3 class="title">{{title}}</h3>
    <div class="common-content">
     <!--  <div class="userSet clearfix">
        <div class="avatar f-l">
          <Avatar icon="person" />
          <img src="../../assets/images/common/icon/avatar-defalut-s.png">
        </div>
        <div class="user_info f-l">
          <p>会员账号：<span>{{username}}</span></p>
          <p>账户状态：<span>{{level}}</span>&nbsp;&nbsp;<span style="color:#3e80d4;">已启用</span></p>
          <p>当前余额：<span style="color:#eb6877;">￥{{banlance}}</span></p>
          <p>AG余额：<span style="color:#eb6877;">￥{{agbalance}}</span></p>
        </div>
      </div> -->

      <div class="moneyManage">
        <div class="userSetData">

          <Tabs v-model="activeName" @tab-click="handleClick">
              <span class="ico-nav-deposit"></span>
              <TabPane label="在线存款" style="font-size: 18px;">
                <div class="steps" v-if="xian" style="display: none;">
                  <el-steps :active="active" finish-status="success">
                    <el-step title="选择充值/转款"></el-step>
                    <el-step title="选择银行/金额"></el-step>
                    <el-step title="完成"></el-step>
                  </el-steps>
                  <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
                </div>
                <deposit v-if="isShowDeposit" v-on:child-payType="payTypeOrder"></deposit>
                <offline-pay v-if="isShowOfflinePay" :payType="payType"  v-on:child-step="childStep"></offline-pay>
                <online-pay v-if="isShowOnlinePay" :payType="payType"  v-on:child-step="childStep"></online-pay>
              </TabPane>

              <TabPane label="在线提款">
                <Withdraw v-on:child-money="money1"></Withdraw>
              </TabPane>

              <!-- <TabPane label="额度转换" icon="social-tux">
                <Transfer v-on:child-money="money1"  v-on:agSuccess="agSuccess"></Transfer>
              </TabPane> -->

               <TabPane label="银行卡管理">
                <bank-card></bank-card>
              </TabPane>

              <TabPane label="交易记录">
                <el-table
                  :data="recordData"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="order_code" 
                    label="订单号"
                    width="200">
                  </el-table-column>

                  <el-table-column
                    prop="username"
                    label="会员">
                  </el-table-column>

                  <el-table-column
                    prop="addtime"
                    width="150"
                    label="订单生成日期">
                  </el-table-column>

                  <el-table-column
                    prop="type_code"
                    label="存储类型">
                  </el-table-column>

                  <el-table-column
                    prop="bank_code"
                    label="支付方式">
                  </el-table-column>

                  <el-table-column
                    prop="money"
                    label="交易金额">
                  </el-table-column>

                  <el-table-column
                    prop="status"
                    label="处理状态">
                  </el-table-column>

                 <!--  <el-table-column
                    label="处理状态">
                      <template slot-scope="scope">
                        <div class="cp-status-info" v-if="scope.status === 0">待审</div>
                        <div class="cp-status-error" v-if="scope.status === 2">失败</div>
                        <div class="cp-status-success" v-if="scope.status === 1">成功</div>
                        <div class="cp-status-cancel" v-if="scope.status === 3">已取消</div>
                      </template>
                  </el-table-column> -->

                  <!-- <el-table-column
                    prop="is_clear"
                    label="处理结果">
                  </el-table-column> -->
                </el-table>

                <div class="page">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[15, 20, 25]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="allnumb">
                  </el-pagination>
                </div>
              </TabPane>

          </Tabs>

          <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> 
          </el-tabs> -->
        </div>
      </div>

    </div>
  </nav>
</div>
</template>


<script>
import {formatDate} from '../../assets/js/date.js';
import Deposit from './deposit';
import Transfer from './transfer';
import Withdraw from './withdraw';
import offlinePay from './pay_offline';
import onlinePay from './pay_online';
import bankCard from './addbank';
export default {
  data() {
    return {
      agbalance: '',
      activeNav:'deposit',
      active: 1,  // step
      title: '资金管理',
      username: "试玩账号",
      banlance: "0",
      level: "钻石vip",
      xian:true,
      activeName: 0,  // 默认显示
      recordData: [],
      allnumb: 2000, // 当前彩种所有开奖结果历史条数
      currentPage: 1, // 当前页码
      pagesize: 20, // 每页的数量
      currentPage1: 1,
      isShowDeposit: true,
      isShowOfflinePay: false,
      isShowOnlinePay: false,
      payType: ''
    }
  },
  components: {
    Deposit,
    Transfer,
    Withdraw,
    offlinePay,
    onlinePay,
    bankCard
  },
  created() {
    this.activeName = this.$route.params.id.split(':')[1];
    this.username = sessionStorage.im_username
    this.banlance = sessionStorage.im_money
    this.getRecodeData(1,30);
    this.getAgBalance ();    
  },
  methods: {
    getAgBalance () {
      let oid_info = sessionStorage.getItem('im_token');
      let params={};
      params.oid=oid_info;
      this.$http.post('/aginfo/getAgInfo', JSON.stringify(params)).then(res => {
        console.log(res.data.balance.agBalance)
        if (res.data.msg === 2006) {
          this.agbalance = res.data.balance.agBalance;
          this.banlance = res.data.balance.userBalance;
        }
        
      })
    },
    money1(i){
        if(i=='change'){
          this.active=3;
           let oid_info = sessionStorage.getItem('im_token');
           let params={};
            params.oid=oid_info;
            this.$http.post('/getinfo/money', JSON.stringify(params)).then(res => {
              console.log(res)
                  this.banlance=res.data.money;
                  console.log(this.banlance)
                  sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
            })
        }else if(i=='change1'){
            this.active=2;
        }
    },
    // next() {
    //   if (this.active++ > 2) this.active = 0;
    // },
    handleClick(tab, event) {
      this.xian=true;
      console.log(1);
      if(tab.name=='deposit'){
          this.active=0;
      }else if(tab.name=='withdraw'||tab.name=='transfer'){
                  this.active=1;
      }else if(tab.name=='record'){
         this.xian=false;
        this.getRecodeData(1,30);

      }
      if (tab.name === 'deposit') {
        this.isShowDeposit = true
        this.isShowOfflinePay = false
        this.isShowOnlinePay = false
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getRecodeData(1,val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getRecodeData(val,20)
    },
    getRecodeData(page,numb) {
      let oid_info = sessionStorage.getItem('im_token');
      let params={};
      params.oid = oid_info;
      params.page = page;
      params.number = numb;

      this.$http.post('/getinfo/record', JSON.stringify(params)).then(res => {
          this.recordData = res.data.res

          this.allnumb = parseInt(res.data.page.allnmb)
          this.currentPage = parseInt(res.data.page.page)
          this.numb = parseInt(res.data.page.number)

          for (var i = 0; i < this.recordData.length; i++) {
            // 时间转换
            this.recordData[i].addtime = formatDate(new Date(this.recordData[i].addtime * 1000), 'yyyy-MM-dd hh:mm');

            // console.log(this.recordData[i].bank_code);


            // 付款方式（0 网银，1 支付宝，2 微信，3 财付通，4 快捷支付）
            // if (this.recordData[i].pay_way == 0) {
            //   this.recordData[i].pay_way  = "网银"
            // } else if (this.recordData[i].pay_way == 1) {
            //   this.recordData[i].pay_way  = "支付宝"
            // } else if (this.recordData[i].pay_way == 2) {
            //   this.recordData[i].pay_way  = "微信"
            // } else if (this.recordData[i].pay_way == 3) {
            //   this.recordData[i].pay_way  = "财付通"
            // } else if (this.recordData[i].pay_way == 4) {
            //   this.recordData[i].pay_way  = "快捷支付"
            // } else {
            //   this.recordData[i].pay_way  = "未知"
            // }

            //0 存入，1 提出
            if (this.recordData[i].type_code == 0) {
              this.recordData[i].type_code  = "存入"
            } else if (this.recordData[i].type_code == 1) {
              this.recordData[i].type_code  = "提出"
            }else {
              this.recordData[i].type_code  = "未知"
            }

            if (this.recordData[i].bank_code == 'AG') {
              this.recordData[i].type_code = this.recordData[i].context
            }
             
            if (this.recordData[i].status == 1 && this.recordData[i].is_clear == 1) { // 成功
              this.recordData[i].status  = "成功"
            } else if (this.recordData[i].status == 1 && this.recordData[i].is_clear == 0) { // 失败
              this.recordData[i].status  = "失败"
            } else if ( status == 0) {  //  处理中
              this.recordData[i].status  = "处理中"
            } else {
              this.recordData[i].status  = "未知"
            }


            //处理状态（0 失败，1 成功）
            /*if (this.recordData[i].is_clear == 0) {
              this.recordData[i].is_clear  = "失败"
            } else if (this.recordData[i].is_clear == 1) {
              this.recordData[i].is_clear  = "成功"
            }else {
              this.recordData[i].is_clear  = "未知"
            }

             //状态（0 未处理，1 已处理）
            if (this.recordData[i].status == 0) {
              this.recordData[i].status  = "未处理"
            } else if (this.recordData[i].status == 1) {
              this.recordData[i].status  = "已处理"
            }else {
              this.recordData[i].status  = "未知"
            }*/

          }


        }).catch(function(){
      })
    },
    childStep(o){
        if(o=='step'){
            this.active=3;
        }else if(o=='step1'){
            this.active=2
        }
    },
    agSuccess (msg) { 
      if (msg === "agSuccess") {
        this.getAgBalance ();
      }
    },
    payTypeOrder (type) {
      console.log(type)
      // this.next();
      this.active=1;
      this.payType = type;
      if (type === 'unionPayOffline' || type === 'aliPayOffline' || type === 'wechatPayOffline' || type === 'jdPayOffline') {
        this.isShowDeposit = false
        this.isShowOfflinePay = true
      } else if (type === 'unionPayOnline' || type === 'aliPayOnline' || type === 'wechatPayOnline' || type === 'tenPayOnline' || type === 'jdPayOnline') {
        this.isShowDeposit = false
        this.isShowOfflinePay = false
        this.isShowOnlinePay = true
      }
    }
  },
  watch: {
    '$route' (to, from) {
        this.activeName = to.params.id.split(':')[1];// 对路由变化作出响应...
    }
  }

}
</script>


<style>
  .ivu-tabs-bar {
    background-color: #f1f1f1;
    border-radius: 10px;
    padding: 0 30px;
  }
  .ivu-tabs-nav .ivu-tabs-tab:before {
    width: 50px;
    height: 50px;
    content: '';
    display: block;
    background-repeat: no-repeat;
    margin-bottom: 5px;
  }
  .ivu-tabs-nav .ivu-tabs-tab:nth-child(2):before {
    background: url('../../assets/images/icon/ico-nav-deposit.png') center top;
  }
  .ivu-tabs-nav .ivu-tabs-tab:nth-child(3):before {
    background: url('../../assets/images/icon/ico-nav-withdraw.png') center top;
  }
  .ivu-tabs-nav .ivu-tabs-tab:nth-child(4):before {
    background: url('../../assets/images/icon/ico-nav-tranfer.png') center top;
    margin-left: 10px;
  }
  .ivu-tabs-nav .ivu-tabs-tab:nth-child(5):before {
    background: url('../../assets/images/icon/ico-nav-bankcard.png') center top;
  }
  .ivu-tabs-nav .ivu-tabs-tab:nth-child(5):before {
    background: url('../../assets/images/icon/ico-nav-record.png') center top;
  }
</style>