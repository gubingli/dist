<template>
  <div>
    <DescriptionList title="公司信息"  col="24" :content="detail">
      <Description term="营业执照">{{detail.company_name}}</Description>
      <Description term="机构代码">{{detail.license_number}}</Description>
      <Description term="法人姓名">{{detail.contact_name}}</Description>
      <Description term="联系电话">{{detail.phone}}</Description>
      <Description term="机构地址">{{detail.address}}</Description>
      <Description term="机构简介">{{detail.description}}</Description>
    </DescriptionList>
    <el-row :gutter="20">
      <el-col  :span="24" >
        <div class="term">营业执照</div>
        <div  class="detail">
          <viewer :images="imgs">
            <img v-for="src in imgs" :src="src.url" :key="src.title">
          </viewer>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 40px;">
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
                    company_name: '',
                    license_number: '',
                    contact_name: '',
                    phone: '',
                    address: '',
                    description: '',
                    url_a:'',
                },
                imgs: [
                    {
                        url: '',
                        title: '营业执照'
                    }
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
                DETAIL(this.id)
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        this.detail=response?response:{};
                        if(response){
                            this.imgs=[{
                                url: response.url_a,
                                title: '营业执照'
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
