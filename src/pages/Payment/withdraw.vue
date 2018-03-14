<template>
  <div>
  	  <div>
  	  	<el-container  v-if='!secc'>
		  <el-header class='head' style='height:130px;'>
		  
		  	<el-row type="flex" class="row-bg" justify="space-between">

			  <el-col :span="6"><!-- <div class="grid-content bg-purple bank">请选择或添加您的银行卡</div> --></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple bank"></div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple  ">
			  	  <!-- <div class='tia'  @click="xiug('/Payment/addbank')"><i class="el-icon-edit-outline"></i>修改银行卡账户信息</div> -->
			  </div></el-col>
			</el-row>
			<el-row v-if='!isBank'>
			  <el-col :span="24"><div class="grid-content bg-purple  ">
			  	  <div class='tian'  @click="xiug('/Payment/addbank')"><span class='el-icon-circle-plus-outline' ></span>添加您的新银行账户</div>
			  </div></el-col>
			</el-row>
			<el-row v-if='isBank'>
			  <el-col :span="2" style='height:40px'><div class="grid-content "></div></el-col>
			  <el-col :span="20" style='margin:20px 0;'><div class="grid-content hang clearfix">
			  		<div>
		  			     <img :src="findBankListUrl(banname)"  />
			  		</div>
			  		<div>
			  			{{banname}}
			  		</div>
			  		
			  		<div>{{str}}</div>
			  		<!-- <div>{{user_name}}</div> -->
			  </div></el-col>
			  <el-col :span="2" style='height:40px'><div class="grid-content "></div></el-col>
			</el-row>
		  </el-header>
		  <el-main >
		  		<el-row>
				  <el-col :span="24"><div class="grid-content bank">请输入提款金额</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="6"><div class="grid-content shuru ">
				  		<span>￥</span>
				  	    <div> 
                  <el-input v-model="shu" @input="chkInput(shu)"  onkeyup="this.value=this.value.replace(/\D/g,'')"></el-input>
				  	    </div>
				  	    <span class='el-icon-error' @click='resetMoney()'></span>
				  </div></el-col>
				  <el-col :span="6" style='margin-left:40px;'><div class="grid-content bank" style='color:#453880'>单笔下限<span style='color:#ea6271;'>100</span>;单笔上限<span style='color:#ea6271'>1,000,000,00</span></div></el-col>
				</el-row>
				
				<el-row :gutter="20" style='margin-top:20px;'>
				  <el-col :span="3" v-for='(item,index) in list'><div ref='xuan' class="grid-content tix"  @click="select(item,index)">{{item}}</div></el-col>
				</el-row>
				<el-row style='margin-top:20px;'>
				  <el-col :span="24"><div class="grid-content bank">请输入提款密码</div></el-col>
				</el-row>
				<el-row :gutter="20" >
				  <el-col :span="3" ><div ref='' class="grid-content ">
				  	<!-- <input type="password" name="" v-model='paypasswd'  max='4'  onkeyup="this.value=this.value.replace(/\D/g,'')"> -->
            <el-input type="password" v-model="paypasswd"></el-input>
				  </div></el-col>
				</el-row>
				<el-row style='margin-top:20px;'>
				  <el-col :span="24"><div class="grid-content ">
				  			<div class="conmit" > 
                  <Button type="error" size="large" @click.native="reset">重置</Button>
                  <Button type="primary"  size="large" :loading="btnLoading" icon="checkmark-round" @click.native="submit">
                    <span v-if="!btnLoading">提交</span>
                    <span v-else>提交中...</span>
                  </Button> 
				  			</div>

				  </div></el-col>
				</el-row>
		  </el-main>
		 
		</el-container>
  	  	 <el-main style='height:560px;background:#fff' v-if='secc'>
  	  	 	<el-row>
			  <el-col :span="4"  style='width:100%' ><div class="grid-content " style='margin:100px auto'>
			  		<img src="../../assets/images/common/tikuan.png" height="209" style='width:128px' alt="">
			  </div></el-col>
			</el-row>
  	  	 </el-main>
		
  	  </div>
  </div>
</template>
<script>
	// import Dialog from './dialog'
  export default {
    data () {
      return {
        btnLoading: false,
        radio: '0',
        selec:false,
        shu:'',
        nocard:false,
        isBank:false,
        paypasswd:'',
        banname:'',
        money:0,
        secc:false,
        bankcoed:'',
        user_name:'',
        bankaddress:'',
        banimg:'',
        str:null,
        bankList : [
        {
          bankName: '工商',
          url: 'bank_gs.png'
        },
        {
          bankName: '建设',
          url: 'bank_js.png'
        },
        {
          bankName: '农业',
          url: 'bank_ny.png'
        },
        {
          bankName: '邮政',
          url: 'bank_yz.png'
        },
        {
          bankName: '中国银行',
          url: 'bank_zgyh.png'
        },
        {
          bankName: '招商',
          url: 'bank_zs.png'
        },
        {
          bankName: '中信',
          url: 'bank_zx.png'
        },
        {
          bankName: '广发',
          url: 'bank_gf.png'
        },
        {
          bankName: '民生',
          url: 'bank_ms.png'
        },
        {
          bankName: '兴业',
          url: 'bank_xy.png'
        },
        {
          bankName: '华夏',
          url: 'bank_hx.png'
        },
        {
          bankName: '光大',
          url: 'bank_gd.png'
        },
        {
          bankName: '渤海',
          url: 'bank_bh.png'
        },
        {
          bankName: '北京农商',
          url: 'bank_ns.png'
        },
        {
          bankName: '上海',
          url: 'bank_sh.png'
        },
        {
          bankName: '浦发',
          url: 'bank_pf.png'
        },
        {
          bankName: '平安',
          url: 'bank_pa.png'
        },
        {
          bankName: '交通',
          url: 'bank_jt.png'
        },
        {
          bankName: 'OTHER',
          url: 'bank_default.png'
        }
      ],
        bankname:'',
        balance:sessionStorage.im_money,
        list:[100,200,500,1000,2000,3000,5000,10000]
      };
    },
    beforeCreate() {
    },
    created(){
    	let params = {};
    	let oid_info=sessionStorage.getItem('im_token');
    	params.oid = oid_info;
    	console.log(params)
    	this.$http.post(`/getinfo/money`, JSON.stringify(params)).then(res => {
                 console.log(res)
             sessionStorage.setItem('im_bankcode', JSON.stringify(res.data.bank_code))
             this.money=res.data.money;
            this.banname=res.data.bank_name;
            this.str =res.data.bank_code;
            this.bankcoed=res.data.bank_code
            // this.user_name=res.data.user_name.replace(/.(?=.)/g, '*');
            this.user_name=res.data.user_name;
            this.bankaddress=res.data.bank_address
            sessionStorage.setItem('im_bankcode', JSON.stringify(res.data.bank_code))
            var reg = /^(\d{4})(\d*)(\d{4})$/;;
	        this.str = this.str.replace(reg,function(a,b,c,d){
	               return b+ c.replace(/\d/g, "*") + d;
	        });

	        if (res.data.bank_code) {
	          this.isBank = true;

	        }
    	})
    },
    methods: {
    	 findBankListUrl(bank_name) {
             console.log(bank_name)
	      for(let i = 0; i < this.bankList.length; i++) {
             if (bank_name.indexOf(this.bankList[i].bankName)!=-1) {
             
                return require("../../assets/images/common/bank/" + this.bankList[i].url);
             }
	      }
        return require("../../assets/images/common/bank/bank_default.png");
	    	
	    },
	    xiug(path){
	    	 this.$router.push(path); 
	    },
	     setmoney(){
		      this.$emit('child-money', "change");
		  },
      select(item,index){
      	 this.$emit('child-money', "change1");
      	this.shu=item;
      	console.log(index)
      	this.$refs.xuan.map( item=>{
      			item.className='tix'
      	})
      	this.$refs.xuan[index].className='active1 '
      },
      reset(){
      	this.shu='';
        this.paypasswd = '';
      	this.$refs.xuan.map( item=>{
      			item.className='tix'
      	})
      },
      resetMoney () {
        this.shu='';
      },
       open3() {
        this.$prompt('请输入提款密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^\d{4}$/,
          inputErrorMessage: '提款密码格式不正确'
        }).then(({ value }) => {
          this.$swal({
            text: '你的邮箱是: ' + value, 
            type: "info",
            timer: 1200, 
          });
        }).catch(() => {    
          this.$swal({
            text: '取消输入', 
            type: "info",
            timer: 1200, 
          });
        });
      },
      submit(){

          this.btnLoading = true;
	      	if(this.shu<=0||this.shu==''){
              this.$swal({
                text: '请输入您的提款金额', 
                type: "error",
                timer: 1200, 
              });
	      	return 
	      	}else if(this.paypasswd==''){ 
                  this.$swal({
                    text: '请输入您的提款密码', 
                    type: "error",
                    timer: 1200, 
                  });
	      		return 	
	      	}
	      	else if(this.shu<100){ 
                  this.$swal({
                    text: '最低提款金额为100元', 
                    type: "error",
                    timer: 1200, 
                  });
	      		return 
	      	}
	      	else{

	      		let oid_info=sessionStorage.getItem('im_token');
		      	 let params={};
		      	 params.oid=oid_info;
		      	 params.paypasswd=this.paypasswd;
		      	 params.money=this.shu;
		      	 params.bankname=this.banname;
		      	 params.bankaddress=this.bankaddress
		      	 params.bankcode=this.bankcoed
		      	 console.log(params)
		      	 this.$http.post('/user/online_get',JSON.stringify(params)).then(res => {
		      	 	 console.log(res)
		      	 	 if(res.data.msg==4001){ 
                          this.$swal({
                            text: '用户登录失效,请您重新登陆尝试', 
                            type: "error",
                            timer: 1200, 
                          });
		      	 	 	 this.$router.push({
			                path: '/home'
			              })
		      	 	 }
		      	 	else if(res.data.msg==7001){
		      	 		this.$message(res.data.info); 
		      	 	} else if(res.data.msg==3003){ 
                      this.$swal({
                        text: '银行卡信息不正确', 
                        type: "error",
                        timer: 1200, 
                      });
		      	 	}
		      	 	else if(res.data.msg==5004){
                      this.$swal({
                        text: '余额不足', 
                        type: "error",
                        timer: 1200, 
                      });
		      	 	}
		      	 	else if(res.data.msg==2007){
                      this.$swal({
                        text: '提款密码错误', 
                        type: "error",
                        timer: 1200, 
                      });
		      	 	}
		      	 	else if(res.data.msg==2006){
                    
                            this.secc=true;
                            this.shu='';
                            this.paypasswd='';
                            setTimeout(()=>{
                                this.secc=false;
                            },2000)
                    
                            this.setmoney();
                             // location.reload()
                        // sessionStorage.setItem('im_money', JSON.stringify(this.balance)) 
                    } else if(res.data.msg==5006){
                        this.$swal({
                            text: '提款间隔时间' + res.data.withdrawal_interval +'分钟', 
                            type: "error",
                            timer: 1200, 
                          });
                    } else {
                        this.$swal({
                            text: '操作失败，请重试！', 
                            type: "error",
                            timer: 1200, 
                          });
                    }
		      	 })
	      	}
		 
      }

    }
  }
</script>
<style type="text/css" media="screen">
	.bank{
		text-align: left;
	}
	.hang{
		text-align: center;
		border: 1px solid #e6e7ec;
		font-size: 14px;
	}
	.hang div{
		float: left;
		height: 40px;
		line-height: 40px;
		margin-left: 20px;
		color: #453880;  
	}
	
	.hang div img{
		width: 32px;
		height: 32px;
		margin-top: 4px;			
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
	.tia{
		color: #43387c;
		text-align: right;
        cursor: pointer;
	}
    .tia .el-icon-edit-outline {
        margin-right: 5px;
        font-size: 16px;
    }
	.head{
		border-bottom: 1px solid #e6e7ec;
	}
	.shuru{
		position:relative;
	}
	.shuru span:first-child{
		font-size: 20px;
		width: 20px;
		height: 20px;
		position: absolute;
		left: 0;
		top:3px;
		color: #7b72c5;
	}
	.shuru input{
		text-align: left!important;
		padding-right: 16px;
    padding-left: 15px;
		font-size: 20px;
		color: #7b72c5;
	}
	.shuru span{
		font-size: 20px;
		position: absolute;
		right: -28px;
		top: 8px;
		color: #e5e4f2;
	}
	.tix{
		background: #fff;
		border-radius: 5px;
		box-shadow: 1px 2px 5px #ccc;
		height: 40px;
		border: 2px solid #fff;
		font-size: 16px;
		line-height: 40px;
		color: #666666;
		cursor:pointer;
	}
	.active1{
		background: #fff;
		border-radius: 5px;
		box-shadow: 1px 2px 5px #ccc;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
		border: 2px solid #ec6876;
		color: #ec6876;

	}
</style>
