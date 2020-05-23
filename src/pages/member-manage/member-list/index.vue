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
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="注册日期"
                    min-width="180">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEchart(scope.$index, scope.row)">历史曲线</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
                LIST({"role":3,"page":this.currentPage})
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                       console.log(response)
                        this.total=response.total;
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