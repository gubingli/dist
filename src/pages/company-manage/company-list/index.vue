<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="cid"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="账号"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="company_name"
                    label="机构名称"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    label="审核状态">
                <template slot-scope="scope">
                    {{scope.row.audit_status==0?'未通过':(scope.row.audit_status==1?'待审核':(scope.row.audit_status=='2'?'已审核':'未审核'))}}
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="360">
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.audit_status==1"
                            size="mini"
                            type="primary"
                            @click="handleAuth(scope.$index, scope.row)">通过审核</el-button>
                    <el-button
                            v-if="scope.row.audit_status==1"
                            size="mini"
                            type="danger"
                            @click="handleAuthRefuse(scope.$index, scope.row)">拒绝审核</el-button>
                    <el-button
                            v-if="scope.row.audit_status==1||scope.row.audit_status==2||scope.row.audit_status==0"
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--v-if="(item.audit_status==1)"-->
        <!--v-if="(item.audit_status!='')"-->
        <!--<template>-->
            <!--<el-table :data="tableData" style="width: 100%">-->
                <!--<el-table-column-->
                        <!--:prop="item.porp"-->
                        <!--:label="item.label"-->
                        <!--width="180"-->
                        <!--v-for="item in data"-->
                        <!--:key="item.key"-->
                <!--&gt;</el-table-column>-->
            <!--</el-table>-->
        <!--</template>-->
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
    import { LIST,CHECK } from '@/api'
    export default {
        data() {

            return {
                total:0,
                pageSize:10,
                pageCount:7,
                currentPage:1,


                tableData: [
                    {cid:'1',account:'222',company_name:'11',audit_status:1}
                ]
            }
        },
        methods: {
            getData(){
                LIST({"role":1,"page":this.currentPage})
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        this.tableData=response.data;
//                        this.total=response.data.length;
                    })
                    .catch(error => {
                        console.log(2222)
                        console.log(error);
                        this.$message({
                            message: "操作失败！",
                            type: "error",
                            offset:'100',
                            center: true
                        });
                    });
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
            handleDetail(index, row) {
                this.$router.push('detail/'+row.id);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            }
        },
        mounted(){
             this.getData();
        }
    }
</script>