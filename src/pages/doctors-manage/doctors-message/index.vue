
<template>
    <div>
        <ul class="mes" >
            <!--:key="item.created_at"-->
            <template v-for="item in mesList" >
                <li class="time">{{item.created_at}}</li>
                <li class="home-mes"  v-if="item.true_name">
                    <div class="mes-name">
<!--                        <img src="@/assets/img/1-1.jpg" alt="">-->
                        <h5 >{{item.true_name}}</h5>
                    </div>
                    <p class="mes-detail">{{item.description}}</p>
                </li>
                <li class="other-mes"  v-if="item.d_true_name">
                    <p class="mes-detail">{{item.description}}</p>
                    <div class="mes-name">
<!--                        <img src="@/assets/img/1-1 (4).jpg" alt="">-->
                        <h5 >{{item.d_true_name}}</h5>
                    </div>
                </li>
            </template>
        </ul>
        <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 80%;margin: 0 auto;margin-top:30px;">
            <el-form-item label="" prop="desc" >
                <el-input type="textarea" v-model="ruleForm.desc" ></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="primary" @click="handleMessage('ruleForm')">发送</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { MESSAGE,MESSAGEADD } from '@/api'
    export default {
        data() {
            return {
                id:'',
                mesList:[
                    {
                        d_true_name:'11',
                        description:'1111111111111111111111111111111111111111',
                        created_at:'2020-20-20 12:22:30',
                    },
                    {
                        true_name:'22',
                        description:'222222',
                        created_at:'2020-20-20 12:22:30',
                    },
                    {
                        d_true_name:'11',
                        description:'11111',
                        created_at:'2020-20-20 12:22:30',
                    },
                    {
                        true_name:'22',
                        description:'222222',
                        created_at:'2020-20-20 12:22:30',
                    },
                    {
                        d_true_name:'11',
                        description:'11111',
                        created_at:'2020-20-20 12:22:30',
                    },
                    {
                        true_name:'22',
                        description:'222222',
                        created_at:'2020-20-20 12:22:30',
                    }
                ],
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        { required: true, message: '请填写内容', trigger: 'blur' }
                    ]
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
                let param={
                    "role":2,"page":this.currentPage
                }
                if(this.Role==3){
                    param.huiyuan=1 ;
                    param.user_id=this.UserId;
                    param.read_role=2;
                };
                MESSAGE({user_id:this.UserId,d_user_id:this.id})
                    .then(response => {
                        this.$message({
                            message: "获取成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });

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
            handleMessage(){
                let param={
                    user_id:this.UserId,
                    d_user_id:this.id,
                    description:this.ruleForm.desc
                }
                MESSAGEADD({data:param})
                    .then(response => {
                        this.$message({
                            message: "操作成功！",
                            type: "success",
                            offset:'100',
                            center: true
                        });
                        let t=setTimeout(()=>{
                            clearTimeout(t);
                            this.mesList.push(
                            {
                                true_name:'dd',
                                description:this.ruleForm.desc,
                                created_at:'2020-20-20 12:22:30',
                            }
                            );
                            this.ruleForm.desc='';
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
            }
        },
        mounted(){
            this.id=this.$route.params.id;
//            this.getData();
        }
    }
</script>
<style lang="scss" scoped>
    .mes{
        width: 80%;
        margin: 0 auto;
        li{
            margin: 10px 0;
        }
        .time{
            width: 200px;
            height: 30px;
            background: #cccccc;
            border-radius: 4px;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            margin: 0 auto;
        }
        .mes-name{
            display: inline-block;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            h5{
                width: 60px;
                text-align: center;
                font-size: 16px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
            }
        }
        .mes-detail{
            display: inline-block;
            max-width: 60%;
            padding: 5px 10px;
            line-height: 30px;
            vertical-align: top;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 10px;
            word-wrap: break-word;
        }
        .home-mes{
            text-align: left;
        }
        .other-mes{
            text-align: right;
            .mes-detail{
                background: #409EFF;
                color: #fff;
            }
        }
    }
   
</style>