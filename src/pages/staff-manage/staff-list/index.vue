<template>
    <div>
        <div class="add" @click="showAddModule" style="text-align: right;width: 100px;float: right;cursor: pointer;">
            <span class="iconfont icon-add" style="font-size: 18px"> <i>添加职员</i></span>
        </div>
        <div class="module-box" v-if="showFlag">
            <p style="">添加职员</p>
            <el-form :model="memForm" :rules="rules"  ref="memForm" label-width="70px"  class="demo-ruleForm" >
                <el-form-item label="姓名" prop="true_name">
                    <el-input v-model="memForm.true_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="account">
                    <el-input v-model="memForm.account"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" @click="submitMemForm('memForm')">提交</el-button>
                    <el-button  @click="cancelForm('memForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="账号"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="true_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="注册日期"
                    min-width="180">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :pager-count="pageCount"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { STAFF_LIST,ADD_STAFF} from '@/api'
    import { validatePhone} from '@/utils/validate'
    export default {
        data() {
            return {
                total:0,
                pageSize:10,
                pageCount:7,
                currentPage:1,

                showFlag:false,
                memForm:{
                    user_id:'',
                    true_name:'',
                    account:'',
                },
                rules: {
                    true_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, validator: validatePhone, trigger: 'blur'}
                    ],
                },

                tableData: [
//                    {
//                    id:'1',
//                    date: '2016-05-02',
//                    name: '王小虎',
//                    address: '上海市普陀区金沙江路 1518 弄'
//                }
                ]
            }
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        methods: {
            getData(){
                STAFF_LIST({"user_id":this.UserId,"page":this.currentPage})
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        this.total=response.total||0;
                        this.pageSize=response.per_page||0;
                        this.tableData=response.data;
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


            handleDetail(index, row) {
                this.$router.push('detail/'+row.id);
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },


            //添加会员
            submitMemForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.memForm['user_id']=this.UserId;
                        ADD_STAFF(this.memForm)
                            .then(response => {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                    offset:'100',
                                    center: true
                                });
                                let t=setTimeout(()=>{
                                    clearTimeout(t);
                                    this.showFlag=false;
                                    this.resetForm('memForm');
                                    this.currentPage =1;
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

            cancelForm(formName) {
                this.showFlag=false;
                this.$refs[formName].resetFields();
            },
            showAddModule(){
                this.showFlag=true;
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style lang="scss">
    .module-box{
        width:300px;
        position: absolute;
        top: 122px;right: 20px;
        z-index: 2;
        background: #fff;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0px 0 5px  #888888;
        p{
            padding-bottom: 8px;
            border-bottom: 1px solid #ccc;margin-bottom: 16px;
        }
    }
</style>