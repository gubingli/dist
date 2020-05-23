<template>
    <!--机构名称、机构代码、法人姓名\营业执照复印件-->
    <el-form :model="ruleForm" :rules="rules" :disabled="(this.ruleForm.audit_status==1?true:false)" ref="ruleForm" label-width="100px"  class="demo-ruleForm" style="width: 50%;min-width:300px;">
        <el-form-item label="营业执照" prop="license_pic">
            <el-upload
                    ref="upload"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    list-type="picture"
                    :before-upload="onBeforeUploadImage"
                    :http-request="UploadImage"
                    :file-list="fileList"
                    :on-remove="handleRemove">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过1MB</div>
            </el-upload>
        </el-form-item>

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
    import { DETAIL,UPDATE,UPLOAD } from '@/api'
    import { mapState } from 'vuex'
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
                    license_pic:'',
                },
                fileList:[],
                license_pic_url:'',
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
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        methods: {
            onBeforeUploadImage(file) {
                const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
                const isLt1M = file.size / 1024 / 1024 < 1
                if (!isIMAGE) {
                    this.$message.error('上传文件只能是图片格式!')
                }
                if (!isLt1M) {
                    this.$message.error('上传文件大小不能超过 1MB!')
                }
                return isIMAGE && isLt1M
            },
            UploadImage(param){
                let formData = new FormData()
                formData.append('file', param.file)
                UPLOAD(formData).then(response => {
                    console.log('上传图片成功')
                    this.onSuccess(response);
                   param.onSuccess(response)  // 上传成功的图片会显示绿色的对勾
                    // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
                }).catch(response => {
                    this.$message({
                        message: "图片上传失败！",
                        type: "error",
                        offset:'100',
                        center: true
                    });
                    console.log('图片上传失败')
//                    param.onError()
                })
            },
            onSuccess(file){
                this.ruleForm.license_pic=file.url;
            },
            handleRemove(file, fileList) {
                this.ruleForm.license_pic='';
            },



            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(!this.ruleForm.license_pic){
                        this.$message({
                            message: "营业执照必填！",
                            type: 'error',
                            offset:'100',
                            center: true
                        });
                        return false;
                    }
                    if (valid&&this.ruleForm.license_pic) {
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
                    this.ruleForm=response?response:{};
                    if(response&&response.pic_name&&response.url_a){
                        this.fileList=[{name:response.pic_name,url:response.url_a}]
                    }
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