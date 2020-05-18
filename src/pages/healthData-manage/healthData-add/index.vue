<template>
    <div class="healData-add">
        <div class="btn-model">
            <el-button @click="changeModule(1)">今日血压</el-button>
            <el-button @click="changeModule(2)">今日血糖</el-button>
            <el-button @click="changeModule(3)">今日血脂</el-button>
            <el-button @click="changeModule(4)">今日体温</el-button>
            <el-button type="primary" @click="linkToEchart">历史曲线</el-button>
        </div>
        <div class="healData-model" >
            <div class="healData-box blood_pressure" v-if="showModule==1">
                <h5>今日血压</h5>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="收缩压" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="舒张压" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="心率" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="体重" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部位" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="操作人" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="测量时间" prop="name" size="mini">
                        <el-date-picker
                                v-model="ruleForm.datetime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="机器型号" prop="name" size="mini">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="name" size="mini">
                        <el-input type="textarea" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="healData-box blood_sugar" v-if="showModule==2">
                <h5>今日血糖</h5>
            </div>
            <div class="healData-box blood_lipids" v-if="showModule==3">
                <h5>今日血脂</h5>
            </div>
            <div class="healData-box body_temperature" v-if="showModule==4">
                <h5>今日体温</h5>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                showModule:1,
                ruleForm: {
                    name: '',
                    datetime:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                console.log(this)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
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
            }
            .el-form-item:last-child{
                display: block;
                text-align: right;
            }

        }
    }

</style>