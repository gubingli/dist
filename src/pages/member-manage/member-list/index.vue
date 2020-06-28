<template>
    <div>
        <div v-if="Role!=2" class="add" @click="showAddModule" style="text-align: right;width: 100px;float: right;cursor: pointer;">
            <span class="iconfont icon-add" style="font-size: 18px"> <i>添加会员</i></span>
        </div>
        <div class="module-box" v-if="showFlag">
            <p style="">添加会员</p>
            <el-form :model="memForm" :rules="rules"  ref="memForm" label-width="70px"  class="demo-ruleForm" >
                <el-form-item label="姓名" prop="true_name">
                    <el-input v-model="memForm.true_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="account">
                    <el-input v-model="memForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="memForm.password"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="memForm.sort" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
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
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button
                            v-if="Role==2||Role==1"
                            size="mini"
                            type="danger"
                            @click="handleEchart(scope.$index, scope.row)">健康曲线</el-button>
                    <el-button
                            v-if="Role==2"
                            size="mini"
                            type="primary"
                            @click="handleMessage(scope.$index, scope.row)">
                        <div v-if="scope.row.is_read!=1" class="red-circle"></div>
                        发送信息

                    </el-button>
                </template>
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
    import { LIST ,ADD_MEMBER} from '@/api'
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
                    password:'',
                    sort:'',
                },
                rules: {
                    true_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, validator: validatePhone, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
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
                LIST({"role":3,"user_id":this.UserId,"page":this.currentPage,"read_role":this.Role})
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

            handleEchart(index, row) {
                console.log(index, row);
                this.$router.push('/healthData/echart?user_id='+row.user_id);
            },
            handleDetail(index, row) {
                this.$router.push('detail/'+row.id);
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },

            //查看留言
            handleMessage(index,row){
                this.$router.push('message/'+row.user_id);
            },

            //添加会员
            submitMemForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.memForm['user_id']=this.UserId;
                        ADD_MEMBER(this.memForm)
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
                                    this.cancelForm('memForm');
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
    .red-circle{
        width: 8px;
        height: 8px;
        background: red;
        border-radius: 50%;
        display: inline-block;
        margin-right: 4px;
    }
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