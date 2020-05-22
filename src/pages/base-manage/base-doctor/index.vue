<template>
   <!---->
    <!--`di_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,-->
    <!--`user_id` bigint(20) unsigned NOT NULL COMMENT '用户id',-->
    <!--`true_name` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户姓名',-->
    <!--`phone` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号码',-->
    <!--`description` text COLLATE utf8mb4_unicode_ci COMMENT '个人简介',-->
    <!--`pics` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '职业证书图片',-->
    <!--`nation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '民族',-->
    <!--`avatar` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',-->
    <!--`birthday_at` datetime DEFAULT NULL COMMENT '出生年月',-->
    <!--`card_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '身份证号码',-->
    <!--`address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',-->
    <!--`company_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司id',-->
    <!--`position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '职位',-->
    <!--`department` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '部门',-->
    <!--`email` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',-->
    <!--`qq` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'qq号码',-->
    <!--`wechat` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信号码',-->
    <!--`audit_status` tinyint(4) NOT NULL DEFAULT '2' COMMENT '审核状态 0审核失败 1审核中 2审核通过',-->
    <!--`reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '审核通过不通过的理由',-->
    <!--`pass_at` datetime DEFAULT NULL COMMENT '审核通过时间',-->
    <!--`created_at` timestamp NULL DEFAULT NULL,-->
    <!--`updated_at` timestamp NULL DEFAULT NULL,-->
    <!--PRIMARY KEY (`di_id`),-->
    <!--UNIQUE KEY `doctor_infos_user_id_unique` (`user_id`)-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm" style="width: 50%;min-width:300px;">
        <el-form-item label="真实姓名" prop="true_name">
            <el-input v-model="ruleForm.true_name"></el-input>
        </el-form-item>
        <el-form-item label="所在公司" prop="company_id">
            <el-input v-model="ruleForm.company_id"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="department">
            <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
            <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="card_no">
            <el-input v-model="ruleForm.card_no"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birthday_at">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday_at" ></el-date-picker>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
            <el-input v-model="ruleForm.nation"></el-input>
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
            <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
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
                    company_id: '',
                    department: '',
                    nation:'',
                    card_no:'',
                    birthday_at:'',
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
//                                    this.getData();
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