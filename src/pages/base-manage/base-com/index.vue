<template>
    <!--机构名称、机构代码、法人姓名\营业执照复印件-->
    <el-form :model="ruleForm" :rules="rules" :disabled="(this.ruleForm.audit_status==1?true:false)" ref="ruleForm" label-width="100px"  class="demo-ruleForm" style="width: 50%;min-width:300px;">
        <el-form-item label="机构名称" prop="company_name">
            <el-input v-model="ruleForm.company_name"></el-input>
        </el-form-item>
        <el-form-item label="机构代码" prop="license_number">
            <el-input v-model="ruleForm.license_number"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名" prop="contact_name">
            <el-input v-model="ruleForm.contact_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="机构简介" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="this.ruleForm.audit_status=='1'" type="primary">审核中</el-button>
            <el-button v-if="this.ruleForm.audit_status!='1'" type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
            <el-button v-if="this.ruleForm.audit_status!='1'" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { DETAIL,UPDATE } from '@/api'
    export default {
        data() {
            return {
                ruleForm: {
                    company_name: '',
                    license_number: '',
                    contact_name: '',
                    phone: '',
                    address: '',
                    description: '',
                },
                rules: {
                    company_name: [
                        { required: true, message: '请输入机构名称', trigger: 'blur' }
                    ],
                    license_number: [
                        { required: true, message: '请输入机构代码', trigger: 'blur' }
                    ],
                    contact_name: [
                        { required: true, message: '请输入法人姓名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    address:[
                        { required: true, message: '请输入手机号', trigger: 'blur' }
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
                                console.log(response)
//                                let t=setTimeout(function(){
//
//                                    clearTimeout(t);
//                                },400)
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
            console.log(this.$route.params.id)
        },
        mounted(){
             this.getData();
        }
    }
</script>