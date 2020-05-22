<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="审核状态">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <!--0审核失败 1审核中 2审核通过-->
                    <el-button
                            v-if="scope.row.status==2&&this.Role==0"
                            size="mini"
                            @click="handleAuth(scope.$index, scope.row)">审核</el-button>
                    <el-button
                            v-if="(scope.row.status==2&&this.Role==3)||this.Role!=3"
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <template v-if="scope.row.status==2&&this.Role==3">
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
    import { LIST } from '@/api'
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
            }
        },
        mounted(){
             this.getData();
        }
    }
</script>