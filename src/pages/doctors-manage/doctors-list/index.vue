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
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="审核状态">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleForbid(scope.$index, scope.row)">禁止</el-button>
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
    export default {
        data() {
            return {
                total:0,
                pageSize:10,
                pageCount:7,
                currentPage:1,


                tableData: [{
                    id:'1',
                    name: '王小虎',
                    state:'已审核',//审核状态
                },{
                    id:'2',
                    name: '王小虎',
                    state:'未审核',//审核状态
                },{
                    id:'3',
                    name: '王小虎',
                    state:'待审核',//审核状态
                }]
            }
        },
        methods: {
            getData(){
                this.$http.get("/member/list",{"page":this.currentPage})
                    .then(response => {
                        this.total=response.totalNum;

                        this.tableData=response.data;
                    })
                    .catch(error => {});
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
            // this.getData();
        }
    }
</script>