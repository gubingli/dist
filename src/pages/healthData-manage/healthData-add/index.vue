<template>
    <div class="healData-add" style="min-width: 700px;">
        <ul class="tab-model">
            <li :class="{'active-tab':showModule==1}" @click="changeModule(1)">今日血压</li>
            <li :class="{'active-tab':showModule==2}" @click="changeModule(2)">今日血糖</li>
            <li :class="{'active-tab':showModule==3}" @click="changeModule(3)">今日血脂</li>
            <li :class="{'active-tab':showModule==4}" @click="changeModule(4)">今日体温</li>
        </ul>
        <div class="healData-model" >
            <div class="healData-box blood_pressure" v-if="showModule==1">
                <h5>今日血压</h5>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="收缩压" prop="shousuoya" size="small">
                        <el-input v-model="ruleForm.shousuoya" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="舒张压" prop="shuzhangya" size="small" >
                        <el-input v-model="ruleForm.shuzhangya"></el-input>
                    </el-form-item>
                    <el-form-item label="心率" prop="xinlv" size="small" >
                        <el-input v-model="ruleForm.xinlv"></el-input>
                    </el-form-item>
                    <el-form-item label="体重" prop="tizhong" size="small" >
                        <el-input v-model="ruleForm.tizhong"></el-input>
                    </el-form-item>
                    <el-form-item label="部位" prop="buwei_type" size="small" >
                        <el-select v-model="ruleForm.buwei_type" placeholder="请选择">
                            <el-option
                                    v-for="item in buwei_types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作人" prop="operator" size="small" >
                        <el-input v-model="ruleForm.operator"></el-input>
                    </el-form-item>
                    <el-form-item label="测量时间" prop="measure_at" size="small"  >
                        <el-date-picker
                                v-model="ruleForm.measure_at"
                                type="datetime"
                                placeholder="选择日期时间" value-format="yyyy-MM-dd hh:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="机器型号" prop="yiqi_model" size="small" >
                        <el-input v-model="ruleForm.yiqi_model"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="description" size="small"  style="width: 600px;">
                        <el-input type="textarea" v-model="ruleForm.description"></el-input>
                    </el-form-item>
                    <div>
                        <h5>今日用药</h5>
                        <el-form :model="item" v-for="(item,index) in pills" :key="index" >
                            <el-form-item label="药品名称"  size="small"
                                          prop="pills_name"
                                          :rules="{required: true, message: '药品不能为空', trigger: 'blur'}"
                            >
                                <el-input v-model="item.pills_name"></el-input>
                            </el-form-item>
                            <el-form-item label="数量"  size="small"
                                          prop="pills_num"
                                          :rules="{required: true, message: '请输入正确的数量', trigger: 'blur'}"
                            >
                                <el-input v-model="item.pills_num"></el-input>
                            </el-form-item>
                            <i class="iconfont icon-del" @click="delPill(index)" v-if="pills.length>1" style="margin: 0 4px;"></i>
                            <i class="iconfont icon-add2" @click="addPill" v-if="index==(pills.length-1)" style="margin: 0 4px;"></i>
                        </el-form>
                    </div>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="healData-box blood_sugar" v-if="showModule==2">
                <h5>今日血糖</h5>
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                    <el-form-item label="时间" prop="jieduan_type" size="small" >
                        <el-select v-model="ruleForm2.jieduan_type" placeholder="请选择">
                            <el-option
                                    :label="早餐前"
                                    :value="1">
                            </el-option>
                            <el-option
                                    :label="早餐后"
                                    :value="2">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="随机血糖" prop="xuetang" size="small">
                        <el-input v-model="ruleForm2.xuetang" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="糖化血红蛋白" prop="hongdanbai" size="small">
                        <el-input v-model="ruleForm2.hongdanbai" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                    <div>
                        <h5>今日用药</h5>
                        <el-form :model="item" v-for="(item,index) in pills2" :key="index" >
                            <el-form-item label="药品名称"  size="small"
                                          prop="pills_name"
                                          :rules="{required: true, message: '药品不能为空', trigger: 'blur'}"
                            >
                                <el-input v-model="item.pills_name"></el-input>
                            </el-form-item>
                            <el-form-item label="数量"  size="small"
                                          prop="pills_num"
                                          :rules="{required: true, message: '请输入正确的数量', trigger: 'blur'}"
                            >
                                <el-input v-model="item.pills_num"></el-input>
                            </el-form-item>
                            <i class="iconfont icon-del" @click="delPill(index,2)" v-if="pills2.length>1" style="margin: 0 4px;"></i>
                            <i class="iconfont icon-add2" @click="addPill(2)" v-if="index==(pills2.length-1)" style="margin: 0 4px;"></i>
                        </el-form>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm2('ruleForm2')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
<!--            <div class="healData-box blood_lipids" v-if="showModule==3">-->
<!--                <h5>今日血脂</h5>-->
<!--            </div>-->
<!--            <div class="healData-box body_temperature" v-if="showModule==4">-->
<!--                <h5>今日体温</h5>-->
<!--            </div>-->
        </div>
    </div>

</template>
<script>
    import { ADDDATA ,ADDDATA_XT } from '@/api'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                showModule:1,
                ruleForm: {
                    shuzhangya: '',
                    shousuoya:'',
                    xinlv:'',
                    tizhong:'',
                    buwei_type:'',
                    measure_at:'',
                    operator:'',
                    yiqi_model:'',
                    description:'',
                    user_id:'',
                },
                pills:[
                    {'pills_name':'','pills_num':0}
                ],
                buwei_types:[
                    {'value':1,'label':'左上臂'},
                    {'value':2,'label':'左手腕'},
                    {'value':3,'label':'右上臂'},
                    {'value':4,'label':'右手腕'},
                ],
                rules: {
                    shuzhangya: [
                        {required: true, message: '请输入舒张压', trigger: 'blur'},
                    ],
                    shousuoya: [
                        {required: true, message: '请输入收缩压', trigger: 'blur'},
                    ],
                    xinlv: [
                        {required: true, message: '请输入心率', trigger: 'blur'},
                    ],
                    tizhong: [
                        {required: true, message: '请输入体重', trigger: 'blur'},
                    ],
                    buwei_type: [
                        {required: true, message: '请选择测量部位', trigger: 'change'}
                    ],
                    measure_at:[
                        {required: true, message: '请输入测量时间', trigger: 'blur'},
                    ]
                },

                ruleForm2:{
                    jieduan_type:1,
                    xuetang:'',
                    hongdanbai:''
                },
                pills2:[
                    {'pills_name':'','pills_num':0}
                ],
                rules2: {}

            }
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        methods: {
            delPill(index,model=1){
                if(model==1){
                    this.pills.splice(index,1)
                }else if(model==2){
                    this.pills2.splice(index,1)
                }

            },
            addPill(model=1){
                if(model==1) {
                    this.pills.push({'pills_name': '', 'pills_num': 0});
                }else if(model==2){
                    this.pills2.push({'pills_name': '', 'pills_num': 0});
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.user_id=this.UserId;
                        let sub_obj={
                            data:this.ruleForm,
                            pills:this.pills
                        }
                        ADDDATA(sub_obj)
                            .then(response => {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
                                let t=setTimeout(()=>{
                                    clearTimeout(t);
                                    this.ruleForm= {
                                        shuzhangya: '',
                                            shousuoya:'',
                                            xinlv:'',
                                            tizhong:'',
                                            buwei_type:'',
                                            measure_at:'',
                                            operator:'',
                                            yiqi_model:'',
                                            description:'',
                                            user_id:'',
                                    };
                                     this.pills=[
                                        {'pills_name':'','pills_num':0}
                                    ];
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm2.user_id=this.UserId;
                        let sub_obj={
                            data:this.ruleForm2,
                            pills:this.pills
                        }
                        ADDDATA_XT (sub_obj)
                            .then(response => {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
                                let t=setTimeout(()=>{
                                    clearTimeout(t);
                                    this.ruleForm2= {
                                        jieduan_type:1,
                                        xuetang:'',
                                        hongdanbai:''
                                    };
                                    this.pills2=[
                                        {'pills_name':'','pills_num':0}
                                    ];
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                if(formName=='ruleForm'){
                    this.pills=[{'pills_name':'','pills_num':0}];
                }
                this.$refs[formName].resetFields();
            },
            changeModule(type){
                this.showModule=type;
                console.log(type)
                if(type=='1'){
                    this.ruleForm= {
                        name: '',
                        datetime:''
                    };
                }else if(type=='2'){
                    console.log(2222)
                }
            },
            linkToEchart(){
                this.$router.push('echart/1');
            }
        },
        created(){
            console.log(this.$route.params.id)
        }
    }
</script>
<style lang="scss">
    .tab-model{
        li{
            display: inline-block;
            width: 140px;
            height: 40px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 40px;
            cursor:pointer;
        }
        li.active-tab{
            background: #409EFF;
            color: #fff;
        }
    }
    .healData-add{
        .healData-model{
            >div{
                box-shadow: 0 0 4px #ccc;
                padding: 20px 20px 10px;
                margin: 20px 0;
                overflow: hidden;
            }
            h5{
                color: #606266;
                margin: 10px 0;
            }
            .el-form-item{
                display: inline-block;
                width: 300px;
            }
            .el-form-item:last-child{
                display: block;
                text-align: right;
            }

        }
    }

</style>