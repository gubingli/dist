<template>
  <div class="login-model">
    <div class="">
      <div class="title-model">
        <p>Login in</p>
        <p>Get access to your account</p>
      </div>
      <div class="form-model">
          <el-form :model="ruleForm"   :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="top" >
            <el-form-item label="手机号" prop="phone" >
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="您的身份" prop="checkPass">
              <el-radio v-model="ruleForm.role" label="0">管理员</el-radio>
              <el-radio v-model="ruleForm.role" label="1">机构</el-radio>
              <el-radio v-model="ruleForm.role" label="2">医生</el-radio>
              <el-radio v-model="ruleForm.role" label="3">普通会员</el-radio>
            </el-form-item>
            <el-form-item label="验证码" prop="identifyCode" >
              <el-input  v-model="ruleForm.identifyCode" autocomplete="off" style="width: 50%;" ></el-input>
              <div   @click="changeCode" style="position: absolute;left: 238px;display: inline-block;">
                <Identify :identifyCode="identifyCode"></Identify>
              </div>
            </el-form-item>
            <p class="link-register" @click="linkToRegister">没有账号？请点击这里，进行注册</p>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">LOGIN</el-button>
            </el-form-item>
          </el-form>
        <div class="des-model">
          <p>Don't have account?</p>
          <p>SHOW UP NOW</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import Identify from '@/components/identify'
  import { LOGIN } from '@/api'
export default {
  name: 'Login',
    components:{
        Identify
    },
    mounted(){
        this.changeCode();
    },

  data () {
      var validatePhone=(rule,value,callback)=>{
          if (value === '') {
              callback(new Error('请输入手机号'));
          } else if (!(/^1\d{10}$/.test(value))) {
              callback(new Error('请输入正确的手机号!'));
          } else {
              callback();
          }
      };
      var validateIdentify = (rule, value, callback) => {
          console.log(value,this.identifyCode)
          if (value === '') {
              callback(new Error('请输入验证码'));
          } else if (value !== this.identifyCode) {
              callback(new Error('请输入正确的验证码!'));
          } else {
              callback();
          }
      }
    return {
        identifyCode:'',    //验证码的值
        identifyCodes:'1234567890' ,   //验证码的生成范围

        ruleForm: {
            phone: '',
            password: '',
            role:'0',
            identifyCode:''
        },
        rules: {
            phone: [
                {validator:validatePhone, trigger: 'blur'},
            ],
            password: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {min: 6,  message: '最小长度6位', trigger: 'blur'}
            ],
            identifyCode: [
                { validator: validateIdentify, trigger: 'blur' }
            ],
        }
    }
  },
    methods: {
        submitForm(formName) {
            let _that=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    LOGIN({"account":this.ruleForm.phone,"password":this.ruleForm.password,"role":this.ruleForm.role})
                        .then(response => {
                            this.$message({
                                message: "登录成功！",
                                type: "success",
                                offset:'100',
                                center: true
                            });
                            this.$store.commit('LOGIN_IN', {"token":response.access_token,"role":response.role,'id':response.user_id,"id_code":response.id_code});
                            let t=setTimeout(function(){
                                _that.$router.push('home')
                                clearTimeout(t);
                            },10)
                        })
                        .catch(error => {
                            console.log(error);
                            this.$message({
                                message: "操作失败！",
                                type: "error",
                                offset:'100',
                                center: true
                            });
                        });
                } else {
                    this.$message({
                        message: "请按照规则填写信息！",
                        type: 'error',
                        offset:'100',
                        center: true
                    });
                    return false;
                }
            });
        },
        linkToRegister(){
            this.$router.push('register')
        },

        // 点击验证码刷新验证码
        changeCode () {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
        randomNum (min, max) {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 随机生成验证码字符串
        makeCode (data, len) {
            for (let i = 0; i < len; i++) {
                this.identifyCode += data[this.randomNum(0, data.length - 1)]
            }
        }

    }
}
</script>

<style  lang="scss">
   .login-model{
     width: 100%;
     height: 100%;
     background: #F4F6F8;
     >div{
       width: 600px;
       margin: 0 auto;
       position: relative; /*脱离文档流*/
       top: 18%; /*偏移*/
       .title-model{
         p:nth-child(1){
           color: #2A8BFF;
           font-size: 24px;
         }
         p:nth-child(2){
           color: #646467;
           font-size: 18px;
           margin-top: 10px;
         }
       }
       .link-register{
         font-size: 14px;
         color: #2A8BFF;
         margin-top: 26px;
         cursor: pointer;
       }
       .form-model{
         width: 500px;
         height: 448px;
         background: #fff;
         padding: 20px;
         margin-top: 20px;
         position: relative;
         .el-form{
           width: 380px;
           height: 100%;
           position: relative;
         }
         .el-button--primary{
           width: 160px;
           border-radius: 20px;

         }
         .el-form-item{
           width: 100%;
           margin-bottom: 8px;
         }
         .el-form-item:last-child{
           position: absolute;
           bottom: -50px;
         }
         .el-form-item__label{
           padding: 0!important;
         }
         .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
           content: '';
         }
       }
       .des-model{
         position: absolute;
         top: 50%;
         margin-top: -100px;
         right: -160px;
         box-shadow: 0px 0px 14px #2A8BFF;

         width: 200px;
         height: 200px;
         background: #2A8BFF;
         color: #fff;
         padding-top: 70px;
         box-sizing: border-box;
         text-align: center;
         p:nth-child(1){
           font-size: 14px;
         }
         p:nth-child(2){
           margin-top: 16px;
           font-size: 16px;
           font-weight: bold;
         }
       }
     }


   }
</style>
