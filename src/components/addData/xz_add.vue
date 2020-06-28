<template>

    <div class="healData-box blood_pressure" >
        <h5>今日血糖</h5>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px">
            <el-form-item label="总胆固醇(mmol/L)" prop="danguchun" size="small">
                <el-input v-model="ruleForm.danguchun" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="甘油三酯（mmol/L）" prop="ganyousanzhi" size="small">
                <el-input v-model="ruleForm.ganyousanzhi" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="高密度脂蛋白(mmol/L)" prop="g_zhidanbai" size="small">
                <el-input v-model="ruleForm.g_zhidanbai" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="低密度脂蛋白(mmol/L)" prop="d_zhidanbai" size="small">
                <el-input v-model="ruleForm.d_zhidanbai" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="测量时间" prop="measure_at" size="small"  >
                <el-date-picker
                        v-model="ruleForm.measure_at"
                        type="datetime"
                        placeholder="选择日期时间" value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="测量人" prop="operator" size="small">
                <el-input v-model="ruleForm.operator" ></el-input>
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
                                  prop="pills_name">
                        <el-input v-model="item.pills_name"></el-input>
                    </el-form-item>
                    <el-form-item label="数量"  size="small"
                                  prop="pills_num">
                        <el-input v-model="item.pills_num"></el-input>
                    </el-form-item>
                    <i class="iconfont icon-del" @click="delPill(index,2)" v-if="pills.length>1" style="margin: 0 4px;"></i>
                    <i class="iconfont icon-add2" @click="addPill(2)" v-if="index==(pills.length-1)" style="margin: 0 4px;"></i>
                </el-form>
            </div>
            <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    import { ADDDATA_XZ,ADDDATA_LAST } from '@/api'
    export default {
        props: {
            id:'',
            role:''
        },
        data() {
            return {
                ruleForm:{
                   danguchun:'',
                   ganyousanzhi:'',
                   g_zhidanbai:'',
                   d_zhidanbai:'',
                    measure_at:'',
                    operator:'',
                    yiqi_model:'',
                    description:''
                },
                pills:[
                    {'pills_name':'','pills_num':''}
                ],
                rules: {
                    danguchun: [
                        {required: true, message: '请输入胆固醇', trigger: 'blur'},
                    ],
                    ganyousanzhi: [
                        {required: true, message: '请输入甘油三酯', trigger: 'blur'}
                    ],
                    g_zhidanbai: [
                        {required: true, message: '请输入高密度脂蛋白', trigger: 'blur'}
                    ],
                    d_zhidanbai: [
                        {required: true, message: '请输入低密度脂蛋白', trigger: 'blur'}
                    ],
                    measure_at:[
                        {required: true, message: '请输入测量时间', trigger: 'blur'},
                    ]
                }

            }
        },

        methods: {
            lastData(){
                ADDDATA_LAST({"type":3,"user_id":this.id}).then(response => {

                    this.ruleForm.operator=response.operator||'';
                    this.ruleForm.yiqi_model=response.yiqi_model||'';
                    this.pills=response.medications.length!=0?response.medications:this.pills;
                })
                    .catch(error => {
                        console.log(error);
                        this.$message({
                            message: "拉去上次数据失败！",
                            type: "error",
                            offset:'100',
                            center: true
                        });
                    });
            },
            delPill(index){
                    this.pills.splice(index,1)

            },
            addPill(){
                    this.pills.push({'pills_name': '', 'pills_num': ''});

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.user_id=this.id;
                        let sub_obj={
                            data:this.ruleForm,
                            pills:this.pills
                        }
                        ADDDATA_XZ(sub_obj)
                            .then(response => {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
                                let t=setTimeout(()=>{
                                    clearTimeout(t);
                                    this.resetForm('ruleForm');
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
                this.pills=[{'pills_name':'','pills_num':''}];
                this.$refs[formName].resetFields();
            },
        },
        created(){
            this.lastData();
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
                /*box-shadow: 0 0 4px #ccc;*/
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