<template>
    <div>
        <ul class="xuaya-tab xuaya_tab">
            <li v-bind:class="{ active: module=='BP_SHOW'}" @click="changeModule('BP_SHOW')">血压折线图</li>
            <li v-bind:class="{ active: module=='XT_SHOW'}" @click="changeModule('XT_SHOW')">血糖折线图</li>
            <li v-bind:class="{ active: module=='XZ_SHOW'}" @click="changeModule('XZ_SHOW')">血脂折线图</li>
        </ul>
        <keep-alive>
            <div class="healData-model" :is="module" :id="user_id?user_id:UserId" :role="Role">

            </div>
        </keep-alive>
    </div>

</template>

<script>
    import { mapState } from 'vuex'
    import BP_SHOW from '@/components/showData/bp-show'
    import XT_SHOW from '@/components/showData/xt-show'
    import XZ_SHOW from '@/components/showData/xz-show'
    export default {
        data() {
            return {
                user_id:'',
                module:'BP_SHOW',
                fileDate:[],
            }
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        methods: {

            changeModule(type){
                this.module=type;
            },
        },
        components: {
            BP_SHOW,
            XT_SHOW,
            XZ_SHOW
        },
        created(){
            console.log(this.$route.params.id)
            console.log('u',this.$route.query.user_id)
            if(this.$route.query.user_id){
                this.user_id=this.$route.query.user_id;
            }
        },
        mounted(){

        }
    }
</script>
<style lang="scss">
    .xuaya-tab{
        li{
            display: inline-block;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 6px;
            cursor:pointer;
        }
        li.active{
            background: rgb(77, 188, 255);
            color: #fff;
        }
    }

</style>