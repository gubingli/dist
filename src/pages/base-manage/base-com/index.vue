<template>
    <!--机构名称、机构代码、法人姓名\营业执照复印件-->
    <el-form :model="ruleForm" :rules="rules" :disabled="(this.ruleForm.audit_status==1?true:false)" ref="ruleForm" label-width="100px"  class="demo-ruleForm" style="width: 70%;min-width:300px;">
        <el-form-item label="营业执照" prop="license_pic">
            <my-upload @uploaded="uploadedHandle" @setFileList="setFileList" listType="picture" :size="1024" :fileList="fileList"></my-upload>

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
        <el-form-item label="机构地址" prop="address"  style="width:100%;">
            <v-distpicker @selected='selected'  :province="ruleForm.province" :city="ruleForm.city" :area="ruleForm.area" style="display:inline-block;"></v-distpicker>
            <el-input v-model="ruleForm.address" style="display: inline-block;width: 40%;"></el-input>
        </el-form-item>
        <el-form-item label="机构简介" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="this.ruleForm.audit_status=='1'" type="primary">审核中</el-button>
            <el-button v-if="this.ruleForm.audit_status!='1'" type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
            <el-button v-if="this.ruleForm.audit_status!='1'" @click="resetForm('ruleForm')">重置</el-button>
            <div class="el-form-item__error">
                {{this.ruleForm.audit_status==0?'审核失败'+(this.ruleForm.reason?('，拒绝原因：'+this.ruleForm.reason):''):(this.ruleForm.audit_status==1?'待审核':this.ruleForm.audit_status==2?'审核成功':'未提交审核')}}
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import { DETAIL,UPDATE,UPLOAD } from '@/api'
    import { mapState } from 'vuex'
    import  myUpload  from '@/components/upload'
    import VDistpicker from 'v-distpicker';
    export default {
        data() {
            console.log(this);
            var validateAddress=(rule,value,callback)=>{
                console.log(this.ruleForm.province,this.ruleForm.city,this.ruleForm.area);
                if (value==''||this.ruleForm.province=="省"||this.ruleForm.city=="市"||this.ruleForm.area=="区") {
                    callback(new Error('请输入地址'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    company_name: '',
                    license_number: '',
                    contact_name: '',
                    phone: '',
                    //省市区
                    province: '',
                    city: '',
                    area: '',
                    address: '',
                    description: '',
                    license_pic:'',
                },
                fileList:[],
                rules: {
                    license_pic:[
                        { required: true, message: '请上传营业执照' }
                    ],
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
                        { required: true,message: '请输入地址', trigger: 'blur' }
                    ]
                }
            };
        },
        components:{
            myUpload,
            VDistpicker,
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
//                    if(!this.ruleForm.license_pic){
//                        this.$message({
//                            message: "营业执照必填！",
//                            type: 'error',
//                            offset:'100',
//                            center: true
//                        });
//                        return false;
//                    }
                    if (valid&&this.ruleForm.license_pic) {
                        let sub_obj={
                            'company_name':this.ruleForm.company_name,
                            'license_number':this.ruleForm.license_number,
                            'contact_name':this.ruleForm.contact_name,
                            'phone':this.ruleForm.phone,
                            'province': this.ruleForm.province,
                            'city': this.ruleForm.city,
                            'area': this.ruleForm.area,
                            'address':this.ruleForm.address,
                            'description':this.ruleForm.description,
                            'license_pic':this.ruleForm.license_pic,
                            'user_id':this.$store.state.UserId,
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
                                    clearTimeout(t);
                                    this.getData();
                                },1000)
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
                this.fileList=[];
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
            },

            //上传图片
            uploadedHandle (value){
                this.ruleForm.license_pic=value;
            },
            setFileList(value){
                this.fileList=value;
            },
            selected(data){
                this.ruleForm.province=data.province.value;
                this.ruleForm.city=data.city.value;
                this.ruleForm.area=data.area.value;
            },
        },
        created(){
            console.log(this.$route.params.id)
        },
        mounted(){
             this.getData();
        }
    }
</script>