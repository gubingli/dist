<template>
    <div>
        <DescriptionList title="会员信息"  col="12" :content="detail">
            <Description term="真实姓名">{{detail.true_name}}</Description>
            <Description term="性别">{{detail.gender==1?'男':'女'}}</Description>
            <Description term="民族" >{{detail.nation}}</Description>
            <Description term="身份证号码">{{detail.card_no}}</Description>
            <Description term="出生年月">{{detail.birthday_at}}</Description>
            <Description term="住址">{{detail.address}}</Description>
            <Description term="手机号">{{detail.phone}}</Description>
            <Description term="email">{{detail.email}}</Description>
            <Description term="微信号">{{detail.wechat}}</Description>
            <Description term="qq号">{{detail.qq}}</Description>
            <Description term="个人简介">{{detail.description}}</Description>
        </DescriptionList>
    </div>
</template>
<script>
    import { DETAIL} from '@/api'
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
                }
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
