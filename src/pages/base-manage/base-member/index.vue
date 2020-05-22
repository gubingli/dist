<template>

    <!--`avatar` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',-->
    <!--`company_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司id',-->

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm" style="width: 50%;min-width:300px;">
        <el-form-item label="真实姓名" prop="true_name">
            <el-input v-model="ruleForm.true_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-radio v-model="ruleForm.gender" label="1">男</el-radio>
            <el-radio v-model="ruleForm.gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
            <el-input v-model="ruleForm.nation"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="card_no">
            <el-input v-model="ruleForm.card_no"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birthday_at">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday_at" ></el-date-picker>
        </el-form-item>
        <el-form-item label="住址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat">
            <el-input v-model="ruleForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="qq号" prop="qq">
            <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { DETAIL,UPDATE } from '@/api'
    export default {
        data() {
            var validateCardNo=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('请输入身份证'));
                } else if (!(/^(\d{18,18}|\d{15,15}|\d{17,17}x)/.test(value))) {
                    callback(new Error('请输入正确的身份证!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    true_name: '',
                    gender:'1',
                    nation:'',
                    card_no:'',
                    birthday_at:'',
                    address:'',
                    phone:'',
                    email:'',
                    wechat:'',
                    qq:'',
                    description:''
                },
                rules: {
                    true_name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    card_no: [
                        { validator: validateCardNo, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                console.log(this)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.user_id=this.$store.state.UserId;
                        UPDATE(this.ruleForm)
                            .then(response => {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
//                                let t=setTimeout(function(){
//
//                                    clearTimeout(t);
//                                },10)
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getData(){
                DETAIL(this.$store.state.UserId)
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        this.ruleForm=response;
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
            }
        },
        created(){

        },
        mounted(){
            this.getData();
        }
    }
</script>