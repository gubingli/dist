<template>
    <div>
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
                    label="姓名"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="审核状态"
                    min-width="180">
                <template slot-scope="scope">
                    {{scope.row.audit_status==0?'未通过':(scope.row.audit_status==1?'待审核':(scope.row.audit_status=='2'?'已审核':'未审核'))}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="360">
                <template slot-scope="scope">
                    <!--0审核失败 1审核中 2审核通过-->
                    <el-button
                            v-if="scope.row.audit_status==1&&Role==0"
                            size="mini"
                            type="primary"
                            @click="handleAuth(scope.$index, scope.row)">通过审核</el-button>
                    <el-button
                            v-if="scope.row.audit_status==1&&Role==0"
                            size="mini"
                            type="danger"
                            @click="handleAuthRefuse(scope.$index, scope.row)">拒绝审核</el-button>
                    <el-button
                            v-if="(scope.row.audit_status==2&&Role==3)||Role!=3"
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <template v-if="scope.row.audit_status==2&&Role==3">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleForbid(scope.$index, scope.row)">禁止</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleForbid(scope.$index, scope.row)">一次查看</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleForbid(scope.$index, scope.row)">永久查看</el-button>
                    </template>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :pager-count="pageCount"
                @current-change="handleCurrentChange"
                style="margin-top: 30px;float: right;right: 10px;">
        </el-pagination>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { LIST,CHECK } from '@/api'
    export default {
        data() {
            return {
                total:0,
                pageSize:10,
                pageCount:7,
                currentPage:1,

                tableData: [
//                    {
//                    id:'1',
//                    name: '王小虎',
//                    state:'已审核',//审核状态
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
                LIST({"role":2,"page":this.currentPage})
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        console.log(response)
//                        this.total=response.totalNum;
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

            handleForbid(index, row) {
                console.log(index, row);
            },
            handleDetail(index, row) {
                this.$router.push('detail/'+row.id);
            },


            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },


            handleAuth(index, row){
                this.$confirm('确认通过审核？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.subAuth(row.id,2)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },
            handleAuthRefuse(index, row){
                this.$prompt('请输入拒绝原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入拒绝原因'
                }).then(({ value }) => {
                    console.log(value)
                    this.subAuth(row.id,0,value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            subAuth(user_id,status,reson){
                CHECK({user_id:user_id,audit_status:status,reason:reson})
                    .then(response => {
                        this.$message({
                            message: "操作成功！",
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
            },
        },
        mounted(){
            console.log(this.Role);
             this.getData();
        }
    }
</script>