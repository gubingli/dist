<template>
    <div class="healData-box blood_pressure" >
        <h5>今日血压</h5>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="收缩压" prop="shousuoya" size="small">
                <el-input v-model="ruleForm.shousuoya" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="舒张压" prop="shuzhangya" size="small" >
                <el-input v-model="ruleForm.shuzhangya" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="心率" prop="xinlv" size="small" >
                <el-input v-model="ruleForm.xinlv" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="体重(kg)" prop="tizhong" size="small" >
                <el-input v-model="ruleForm.tizhong" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
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
                                  prop="pills_name">
                        <el-input v-model="item.pills_name"></el-input>
                    </el-form-item>
                    <el-form-item label="数量"  size="small"
                                  prop="pills_num" >
                        <el-input v-model="item.pills_num" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                    <i class="iconfont icon-del" @click="delPill(index)" v-if="pills.length>1" style="margin: 0 4px;"></i>
                    <i class="iconfont icon-add2" @click="addPill" v-if="index==(pills.length-1)" style="margin: 0 4px;"></i>
                </el-form>
            </div>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { ADDDATA,ADDDATA_LAST  } from '@/api'

    export default {
        name: "BP_ADD",
        props: {
            id:'',
            role:''
        },
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
                    {'pills_name':'','pills_num':''}
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
                    ],
                },

            }
        },
        methods: {
            lastData(){
                ADDDATA_LAST({"type":1,"user_id":this.id}).then(response => {
                    this.ruleForm.tizhong=response.tizhong||'';
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
                this.pills=[{'pills_name':'','pills_num':0}];
                this.$refs[formName].resetFields();
            },
        },
        created(){
            this.lastData();
        }
    }
</script>
<style lang="scss" >
     .healData-box{
                /*box-shadow: 0 0 4px #ccc;*/
                padding: 20px 20px 10px;
                margin: 20px 0;
                overflow: hidden;
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
</style>