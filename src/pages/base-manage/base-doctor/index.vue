<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="(this.ruleForm.audit_status==1?true:false)" label-width="100px"  class="demo-ruleForm" style="width: 50%;min-width:300px;">
        <el-form-item label="真实姓名" prop="true_name">
            <el-input v-model="ruleForm.true_name"></el-input>
        </el-form-item>
        <el-form-item label="职业证书" prop="pics">
            <my-upload @uploaded="uploadedPics" @setFileList="setFileListPics" listType="picture" :size="1024" :fileList="fileList_pics"></my-upload>
        </el-form-item>
        <el-form-item label="照片" prop="avatar">
            <my-upload @uploaded="uploadedAvatar" @setFileList="setFileListAvatar" listType="picture" :size="1024" :fileList="fileList_avatar"></my-upload>
        </el-form-item>
        <el-form-item label="所在公司" prop="company_name">
            <el-input v-model="ruleForm.company_name"></el-input>
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
            <el-date-picker type="date"  placeholder="选择日期" v-model="ruleForm.birthday_at" value-format="yyyy-MM-dd"></el-date-picker>
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
            <el-button v-if="this.ruleForm.audit_status=='1'" type="primary">审核中</el-button>
            <el-button v-if="this.ruleForm.audit_status!='1'" type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
            <el-button  v-if="this.ruleForm.audit_status!='1'"  @click="resetForm('ruleForm')">重置</el-button>
            <div class="el-form-item__error">
                {{this.ruleForm.audit_status==0?'审核失败'+(this.ruleForm.reason?('，拒绝原因：'+this.ruleForm.reason):''):(this.ruleForm.audit_status==1?'待审核':this.ruleForm.audit_status==2?'审核成功':'未提交审核')}}
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import { DETAIL,UPDATE } from '@/api'
    import { mapState } from 'vuex'
    import  myUpload  from '@/components/upload'
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
                    company_name: '',
                    department: '',
                    position:'',
                    nation:'',
                    card_no:'',
                    birthday_at:'',
                    phone:'',
                    email:'',
                    wechat:'',
                    qq:'',
                    description:'',
                    pics:'',
                    avatar:''
                },
                fileList_avatar:[],
                fileList_pics:[],
                rules: {
                    true_name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    card_no: [
                        { required: true,validator: validateCardNo, trigger: 'blur' }
                    ],
                    avatar:[
                        { required: true, message: '请上传照片' }
                    ],
                    pics:[
                        { required: true, message: '请上传职业证书' }
                    ]
                }
            };
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        components:{
            myUpload
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let sub_obj={
                            "true_name": this.ruleForm.true_name,
                            "company_name": this.ruleForm.company_name,
                            'department': this.ruleForm.department,
                            'position':this.ruleForm.position,
                            'nation':this.ruleForm.nation,
                            'card_no':this.ruleForm.card_no,
                            'birthday_at':this.ruleForm.birthday_at,
                            'phone':this.ruleForm.phone,
                            'email':this.ruleForm.email,
                            'wechat':this.ruleForm.wechat,
                            'qq':this.ruleForm.qq,
                            'description':this.ruleForm.description,
                            'pics':this.ruleForm.pics,
                            'avatar':this.ruleForm.avatar,
                            'user_id':this.UserId
                        };
                        UPDATE(sub_obj)
                            .then(response => {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
                                let t=setTimeout(()=>{
                                    this.getData();
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
                            this.fileList_pics=[{name:response.pic_name,url:response.url_a}]
                        }
                        if(response&&response.avatar_name&&response.avatar_url_a){
                            this.fileList_avatar=[{name:response.avatar_name,url:response.avatar_url_a}]
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
            },

            //上传图片
            uploadedPics (value){
                this.ruleForm.pics=value;
            },
            setFileListPics(value){
                this.fileList_pics=value;
            },
            uploadedAvatar (value){
                this.ruleForm.avatar=value;
            },
            setFileListAvatar(value){
                this.fileList_avatar=value;
            },

        },
        created(){

        },
        mounted(){
            this.getData();
        }
    }
</script>