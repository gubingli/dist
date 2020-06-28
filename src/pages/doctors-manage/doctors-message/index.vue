
<template>
    <div>
        <ul class="mes" >
            <!--:key="item.created_at"-->
            <template v-for="item in mesList" >
                <li class="time">{{item.created_at}}</li>
                <li class="home-mes"  v-if="item.speaker==UserId">
                    <div class="mes-name">
                        <img v-if="item.d_avatar" :src='item.d_avatar' alt="">
                        <img v-else src="@/assets/img/member_avatar.png" alt="">
                        <h5 >{{Role==3?item.true_name:item.d_true_name}}</h5>
                    </div>
                    <p class="mes-detail">{{item.description}}</p>
                </li>
                <li class="other-mes"  v-if="item.speaker!=UserId">
                    <p class="mes-detail">{{item.description}}</p>
                    <div class="mes-name">
                        <img v-if="item.d_avatar" :src='item.d_avatar' alt="">
                        <img v-else src="@/assets/img/member_avatar.png" alt="">
                        <h5 >{{Role==3?item.d_true_name:item.true_name}}</h5>
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
    import { Format } from '@/utils/formdate.js'
    export default {
        data() {
            return {
                id:'',
                mesList:[

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
                MESSAGE({user_id:(this.Role==3?this.UserId:this.id),d_user_id:(this.Role==2?this.UserId:this.id),role:this.Role})
                    .then(response => {
                        this.mesList=response

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
                    user_id:(this.Role==3?this.UserId:this.id),
                    d_user_id:(this.Role==2?this.UserId:this.id),
                    description:this.ruleForm.desc,
                    speaker:this.UserId,
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
                            console.log(this.mesList)
                            this.mesList.push(
                            {
                                true_name:'',
                                description:this.ruleForm.desc,
                                created_at:Format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                                speaker:this.UserId
                            });
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
           this.getData();
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