<template>
    <div id="base-member">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="100px"  class="demo-ruleForm" >
            <h6>基本信息</h6>
            <el-form-item label="真实姓名" prop="true_name">
                <el-input v-model="ruleForm.true_name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio v-model="ruleForm.gender" label=1>男</el-radio>
                <el-radio v-model="ruleForm.gender" label=2>女</el-radio>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
                <el-input v-model="ruleForm.nation"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="card_no">
                <el-input v-model="ruleForm.card_no"></el-input>
            </el-form-item>
            <el-form-item label="出生年月" prop="birthday_at">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday_at" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item id="address" label="住址" prop="address" style="width:100%;">
                <v-distpicker @selected='selected'  :province="ruleForm.province" :city="ruleForm.city" :area="ruleForm.area" style="display:inline-block;"></v-distpicker>
                <el-input v-model="ruleForm.address" style="display: inline-block;width: 40%;"></el-input>
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
            <el-form-item style="display: block;">
                <el-button type="primary" @click="submitForm('ruleForm')">提交数据</el-button>
                <el-button  @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-form :model="form"   ref="form" :inline="true" label-width="100px"  class="demo-ruleForm" >
            <h6>健康状况</h6>
            <el-form-item label="家族病史" prop="bingshi">
                <el-select v-model="form.bingshi" multiple placeholder="请选择">
                    <el-option label="高血压" value="高血压"></el-option>
                    <el-option label="高血糖" value="高血糖"></el-option>
                    <el-option label="高血脂" value="高血脂"></el-option>
                    <el-option label="无" value="无"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主要疾病" prop="jibing">
                <el-select v-model="form.jibing" multiple placeholder="请选择">
                    <el-option label="高血压" value="高血压"></el-option>
                    <el-option label="高血糖" value="高血糖"></el-option>
                    <el-option label="高血脂" value="高血脂"></el-option>
                    <el-option label="肝病" value="肝病"></el-option>
                    <el-option label="肾病" value="肾病"></el-option>
                    <el-option label="心脑血管病" value="心脑血管病"></el-option>
                    <el-option label="无" value="无"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="药物过敏" prop="guominyao">
                <el-input v-model="form.guominyao"></el-input>
            </el-form-item>
            <el-form-item label="高血压" prop="gaoxueya">
                <el-select v-model="form.gaoxueya" placeholder="请选择">
                    <el-option label="有" value="有"></el-option>
                    <el-option label="无" value="无"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="糖尿病" prop="tangniaobing">
                <el-select v-model="form.tangniaobing" placeholder="请选择">
                    <el-option label="有" value="有"></el-option>
                    <el-option label="无" value="无"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="慢性病" prop="manxingbing">
                <el-select v-model="form.manxingbing" multiple placeholder="请选择">
                    <el-option label="高血压" value="高血压"></el-option>
                    <el-option label="高血糖" value="高血糖"></el-option>
                    <el-option label="高血脂" value="高血脂"></el-option>
                    <el-option label="肝病" value="肝病"></el-option>
                    <el-option label="肾病" value="肾病"></el-option>
                    <el-option label="心脑血管病" value="心脑血管病"></el-option>
                    <el-option label="无" value="无"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="精神病史" prop="jingshenbing">
                <el-select v-model="form.jingshenbing" placeholder="请选择">
                    <el-option label="有" value="有"></el-option>
                    <el-option label="无" value="无"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="免疫情况" prop="mianyi">
                <el-select v-model="form.mianyi" placeholder="请选择">
                    <el-option label="按程序接种" value="按程序接种"></el-option>
                    <el-option label="不详" value="不详"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所需服务" prop="fuwu">
                <el-select v-model="form.fuwu" multiple placeholder="请选择">
                    <el-option label="健康咨询" value="健康咨询"></el-option>
                    <el-option label="上门医疗" value="上门医疗"></el-option>
                    <el-option label="定期体检" value="定期体检"></el-option>
                    <el-option label="康复指导" value="康复指导"></el-option>
                </el-select>
            </el-form-item>
            <h6>个人行为</h6>
            <el-form-item label="性格" prop="xingge">
                <el-select v-model="form.xingge" placeholder="请选择">
                    <el-option label="活泼开朗" value="活泼开朗"></el-option>
                    <el-option label="忧郁寡欢" value="忧郁寡欢"></el-option>
                    <el-option label="心情压抑" value="心情压抑"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="吸烟史" prop="xiyan">
                <el-select v-model="form.xiyan" placeholder="请选择">
                    <el-option label="不吸烟" value="不吸烟"></el-option>
                    <el-option label="吸烟" value="吸烟"></el-option>
                    <el-option label="戒烟" value="戒烟"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="饮酒史" prop="yinjiu">
                <el-select v-model="form.yinjiu" placeholder="请选择">
                    <el-option label="饮酒" value="饮酒"></el-option>
                    <el-option label="很少饮酒" value="很少饮酒"></el-option>
                    <el-option label="不饮酒" value="不饮酒"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="睡眠状况" prop="shuimian">
                <el-select v-model="form.shuimian" placeholder="请选择">
                    <el-option label="好" value="好"></el-option>
                    <el-option label="一般" value="一般"></el-option>
                    <el-option label="差" value="差"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="锻炼项目" prop="duanlian">
                <el-select v-model="form.duanlian" multiple placeholder="请选择">
                    <el-option label="球类" value="球类"></el-option>
                    <el-option label="跑步" value="跑步"></el-option>
                    <el-option label="散步" value="散步"></el-option>
                    <el-option label="太极拳" value="太极拳"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="饮食习惯" prop="yinshi">
                <el-select v-model="form.yinshi" multiple placeholder="请选择">
                    <el-option label="高脂" value="高脂"></el-option>
                    <el-option label="高盐" value="高盐"></el-option>
                    <el-option label="少纤维" value="少纤维"></el-option>
                    <el-option label="辛辣" value="辛辣"></el-option>
                    <el-option label="素食" value="素食"></el-option>
                    <el-option label="清淡" value="清淡"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兴趣爱好" prop="xingqu">
                <el-input v-model="form.xingqu"></el-input>
            </el-form-item>
            <el-form-item label="是否残疾" prop="shifouchanji">
                <el-select v-model="form.shifouchanji" placeholder="请选择">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 身体不适处理方式" prop="chulifangshi">
                <el-select v-model="form.chulifangshi" placeholder="请选择">
                    <el-option label="去医院就诊" value="去医院就诊"></el-option>
                    <el-option label="自行服药" value="自行服药"></el-option>
                    <el-option label="在家休息" value="在家休息"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="display: block;">
                <el-button type="primary" @click="submitForm2('form')">提交数据</el-button>
                <el-button  @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import { DETAIL,UPDATE,UPDATA,UPDATA_DETAIL  } from '@/api'
    import VDistpicker from 'v-distpicker';
    export default {
        components:{
            VDistpicker,
        },
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
                    gender:'',
                    nation:'',
                    card_no:'',
                    birthday_at:'',
                    //省市区
                    province: '',
                    city: '',
                    area: '',
                    address:'',
                    phone:'',
                    email:'',
                    wechat:'',
                    qq:'',
                    description:'',

                },
                form:{
                    bingshi:[],
                    jibing:[],
                    guominyao:'',
                    gaoxueya:'',
                    tangniaobing:'',
                    manxingbing:[],
                    jingshenbing:'',
                    mianyi:'',
                    fuwu:[],
                    xingge:'',
                    xiyan:'',
                    yinjiu:'',
                    shuimian:'',
                    duanlian:[],
                    yinshi:[],
                    xingqu:'',
                    shifouchanji:'',
                    chulifangshi:'',
                },
                rules: {
                    true_name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    gender:[
                        { required: true, message: '请选性别' }
                    ],
                    card_no: [
                        { required: true,validator: validateCardNo, trigger: 'blur' }
                    ],

                },

            };
        },
        // props: ['ips'],
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
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.user_id=Number(this.$store.state.UserId);
                        UPDATA(this.form)
                            .then(response => {
                                this.$message({
                                    message: "提交健康数据成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
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
                this.$refs['ruleForm'].resetFields();
                this.$refs['form'].resetFields();
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
                        if(response){
                            this.ruleForm=response?response:this.ruleForm;
                            this.ruleForm.gender=response.gender.toString();
                        }

                    })
                UPDATA_DETAIL(this.$store.state.UserId)
                    .then(response => {
                        this.$message({
                            message: "获取健康数据成功！",
                            type: "success",
                            offset:'160',
                            center: true
                        });
                        if(Object.keys(response).length != 0){
                            this.form=response?response:this.form;
                            if(this.form){
                                this.$delete(this.form,'created_at');
                                this.$delete(this.form,'updated_at');
                            }
                        }

                    })
                    .catch(error => {
                        console.log(error);
                        this.$message({
                            message: "获取失败！",
                            type: "error",
                            offset:'100',
                            center: true
                        });
                    });
            },
            selected(data){
                this.ruleForm.province=data.province.value;
                this.ruleForm.city=data.city.value;
                this.ruleForm.area=data.area.value;
            },
        },
        created(){

        },
        mounted(){
            this.getData();
        }
    }
</script>
<style lang="scss">
    #base-member{
        .el-form-item{
            width: 330px;
        }
        #address{
            .el-form-item__content{
                min-width: 800px;
            }
        }

    }

</style>