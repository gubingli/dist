<template>
    <div>
      <DescriptionList title="医生信息"  col="12" :content="detail">
          <Description term="真实姓名">{{detail.true_name}}</Description>
          <Description term="手机号">{{detail.phone}}</Description>
          <!--<Description term="职业证书" type="img">{{detail.url_a}}</Description>-->
          <!--<Description term="照片" type="img">{{detail.avatar_url_a}}</Description>-->
          <Description term="所在公司">{{detail.company_name}}</Description>
          <Description term="所在部门">{{detail.department}}</Description>
          <Description term="职位">{{detail.position}}</Description>
          <Description term="医生资格证号">{{detail.certificate_no}}</Description>
          <Description term="毕业院校">{{detail.school}}</Description>
          <Description term="开始工作时间">{{detail.start_time}}</Description>
          <Description term="民族">{{detail.nation}}</Description>
          <Description term="身份证号码">{{detail.card_no}}</Description>
          <Description term="出生年月">{{detail.birthday_at}}</Description>
          <Description term="email">{{detail.email}}</Description>
          <Description term="微信号">{{detail.wechat}}</Description>
          <Description term="qq号">{{detail.qq}}</Description>
          <Description term="个人简介">{{detail.description}}</Description>
      </DescriptionList>
        <el-row :gutter="20">
            <el-col  :span="12" >
                <div class="term">职业证书</div>
                <div  class="detail">
                    <viewer :images="imgs">
                        <img v-for="src in imgs" :src="src.url" :key="src.title">
                    </viewer>
                </div>
            </el-col>
            <el-col  :span="12" >
                <div class="term">照片</div>
                <div  class="detail">
                    <viewer :images="imgs_avatar">
                        <img v-for="src in imgs_avatar" :src="src.url" :key="src.title">
                    </viewer>
                </div>
            </el-col>
        </el-row>
        <div style="margin-top: 40px;text-align: center">
            <el-button
                    v-if="detail.audit_status==1&&Role==0"
                    size="mini"
                    type="primary"
                    @click="handleAuth()">通过审核</el-button>
            <el-button
                    v-if="detail.audit_status==1&&Role==0"
                    size="mini"
                    type="danger"
                    @click="handleAuthRefuse()">拒绝审核</el-button>
        </div>

    </div>
</template>
<script>
    import { DETAIL,UPDATE,CHECK } from '@/api'
    import { mapState } from 'vuex'
    import DescriptionList from "@/components/Description.vue"; // 引入组件
    export default {
        data() {
            return {
                id:'',
              detail:{
                    true_name: '',
                    company_name: '',
                    department: '',
                    nation:'',
                    card_no:'',
                    birthday_at:'',
                    phone:'',
                    email:'',
                    wechat:'',
                    qq:'',
                    description:'',
                    pics:'',
                    avatar:'',
                  url_a:'',
                  avatar_url_a:''
              },
                imgs:[],
                imgs_avatar:[],
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
                DETAIL(this.id)
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        console.log(response)
                        this.detail=response?response:{};
                        if(response){
                            this.imgs=[{
                                url: response.url_a,
                                title: '营业执照'
                            }];
                            this.imgs_avatar=[{
                                url: response.avatar_url_a,
                                title: '照片'
                            }]
                        }
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
            handleAuth(){
                this.$confirm('确认通过审核？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.subAuth(this.id,2)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },
            handleAuthRefuse(){
                this.$prompt('请输入拒绝原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入拒绝原因'
                }).then(({ value }) => {
                    console.log(value)
                    this.subAuth(this.id,0,value)
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
        components: {
            DescriptionList
        },
        mounted: function() {
            this.id = this.$route.params.id;
            this.getData();
        },
    }
</script>
<style lang="scss" scoped>
    .term {
        color: rgba(0,0,0,.85);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        padding-bottom: 16px;
        margin-right: 8px;
        white-space: nowrap;
        display: table-cell;
        &:after {
            content: ":";
            margin: 0 8px 0 2px;
            position: relative;
            top: -0.5px;
        }
    }
    .detail {
        font-size: 14px;
        line-height: 1.5;
        width: 100%;
        padding-bottom: 16px;
        color: rgba(0, 0, 0, 0.65);
        display: table-cell;
        img{
            width:100px;
            vertical-align: top;
        }
    }
</style>