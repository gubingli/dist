<template>
    <div>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table
                ref="filterTable"
                :data="tableData"
                stripe
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
                    prop="school"
                    label="毕业院校">
            </el-table-column>
            <el-table-column
                    prop="company_name"
                    label="所在医院">
            </el-table-column>
            <el-table-column
                    prop="certificate_no"
                    label="医生资格证号"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="start_time"
                    label="工作时间">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="审核状态">
                <template slot-scope="scope">
                    {{scope.row.audit_status==0?'未通过':(scope.row.audit_status==1?'待审核':(scope.row.audit_status=='2'?'已审核':'未审核'))}}
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="380"
                             :filters="Role==0?[{ text: '未审核', value: '1' }, { text: '已审核', value: '0,2' }]:[{ text: '授权', value: '1' }, { text: '未授权', value: '0' }]"
                             :filter-method="filterTag"
                             filter-placement="bottom-end">
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
                            v-if="scope.row.is_impower==1"
                            size="mini"
                            type="danger"
                            @click="handleForbid(scope.$index, scope.row)">禁止</el-button>
                        <el-button
                                v-if="scope.row.is_impower==0"
                            size="mini"
                            type="danger"
                            @click="handleImpower(1,scope.$index, scope.row)">一次查看</el-button>
                        <el-button
                                v-if="scope.row.is_impower==0"
                            size="mini"
                            type="danger"
                            @click="handleImpower(0,scope.$index, scope.row)">永久查看</el-button>
<!--                        v-if="scope.row.is_message==1"-->
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleMessage(scope.$index, scope.row)">
                            <div v-if="scope.row.is_read!=1" class="red-circle"></div>
                            {{scope.row.is_message==1?'查看信息':'发送信息'}}

                        </el-button>
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
    import { LIST,CHECK,IMPOWER } from '@/api'
    export default {
        data() {
            return {
                total:0,
                pageSize:10,
                pageCount:7,
                currentPage:1,

                tableData: [],


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
                let param={
                    "role":2,"page":this.currentPage,"user_id":this.UserId,"read_role":this.Role
                }

                LIST(param)
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        this.total=response.total;
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

            //可查看数据
            handleImpower(num,index, row){
                let text=(num==0?'永久查看':'一次性查看');
                this.$confirm('确认该医生可'+text+'你的数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.subImpower(row,num)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            subImpower(row,num){//user_id  d_user_id im_status  1 number 0
                let param={
                    data:{user_id:Number(this.UserId),d_user_id:row.user_id,im_status:1,number:num}
                };
                IMPOWER(param)
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
            handleForbid(index,row) {
                this.$confirm('确认禁止该医生查看你的数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.forbidImpower(row)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            forbidImpower(row){
                console.log(row.user_id);
                console.log(row.id);

                IMPOWER({ data:{user_id:Number(this.UserId),d_user_id:row.user_id,im_status:0}})
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


            //审核
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

            //查看留言
            handleMessage(index,row){
                this.$router.push('message/'+row.user_id);
            },


            //详情
            handleDetail(index, row) {
                this.$router.push('detail/'+row.user_id);
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },


            //筛选
            filterTag(value, row) {
                if(this.Role==0){
                    let audit_arr=value.split(',');
                    return audit_arr.indexOf(row.audit_status.toString())>-1?true:false
                }else{
                    return row.is_impower == value;
                }
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
        },
        mounted(){
            console.log(this.Role);
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
</style>