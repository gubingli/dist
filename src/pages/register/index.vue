<template>
  <div class="register-model">
    <div class="">
      <div class="title-model">
        <p>注册</p>
        <p>Get access to your account</p>
      </div>

      <div class="form-model">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm" label-position="top">
          <el-form-item label="账号" prop="user">
            <el-input v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="您的身份" prop="checkPass">
            <el-radio v-model="ruleForm.role" label="1">机构</el-radio>
            <el-radio v-model="ruleForm.role" label="2">医生</el-radio>
            <el-radio v-model="ruleForm.role" label="3">普通会员</el-radio>
          </el-form-item>
          <p class="link-register" @click="linkToLogin">已有账号？请直接进行登录</p>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
    import {register} from '@/api'
export default {
  name: 'Login',
  data () {
      var validatePass2 = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      }
    return {
        labelPos:'top',
        ruleForm: {
            user: '',
            pass: '',
            checkPass:'',
            role:'1'
        },
        rules: {
            user: [
                {required: true, message: '请输入账号', trigger: 'blur'},
                {min: 11, max: 11, message: '请输入正确账号', trigger: 'blur'}
            ],
            pass: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {min: 6,  message: '最小长度6位', trigger: 'blur'}
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
        }
    }
  },
    methods: {
        submitForm(formName) {
            let _that=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    register({"name":this.ruleForm.name,"pass":this.ruleForm.pass})
                    .then(response => {
                            this.$message({
                                message: "注册成功！",
                                type: "success",
                                center: true
                            });
                            let t=setTimeout(function(){
                                _that.$router.push('login')
                                clearTimeout(t);
                            },100)
                        })
                        .catch(error => {});
                } else {
                    this.$message({
                        message: "请输入正确的信息！",
                        type: 'error',
                        center: true
                    });
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        linkToLogin(){
            this.$router.push('login')
        }
    }
}
</script>

<style lang="scss">
   .register-model{
     width: 100%;
     height: 100%;
     background: #F4F6F8;
     >div{
       width: 600px;
       margin: 0 auto;
       position: relative; /*脱离文档流*/
       top: 12%; /*偏移*/
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
         margin-top: 20px;
         cursor: pointer;
       }
       .form-model{
         width: 500px;
         height: 450px;
         background: #fff;
         padding: 20px;
         margin-top: 20px;
         position: relative;
         .el-form{
           width: 300px;
           height: 100%;
           position: relative;
         }
         .el-button--primary{
           width: 160px;
           border-radius: 20px;
         }
         .el-form-item{
           margin-bottom: 8px;
         }
         .el-form-item:last-child{
           position: absolute;
           bottom: -50px;
         }
         .el-form-item__label{
           padding: 0;
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
