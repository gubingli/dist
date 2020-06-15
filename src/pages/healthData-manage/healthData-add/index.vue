<template>
    <div class="healData-add" style="min-width: 700px;">
        <ul class="tab-model">
            <li :class="{'active-tab':showModule=='BP_ADD'}" @click="changeModule('BP_ADD')">今日血压</li>
            <li :class="{'active-tab':showModule=='XT_ADD'}" @click="changeModule('XT_ADD')">今日血糖</li>
            <li :class="{'active-tab':showModule=='XZ_ADD'}" @click="changeModule('XZ_ADD')">今日血脂</li>
        </ul>
        <keep-alive>
            <div class="healData-model" :is="showModule" :id="UserId" :role="Role">

            </div>
        </keep-alive>
    </div>

</template>
<script>
    import { mapState } from 'vuex'
    import BP_ADD from '@/components/addData/bp-add'
    import XT_ADD from '@/components/addData/xt_add'
    import XZ_ADD from '@/components/addData/xz_add'
    export default {
        data() {
            return {
                showModule:'BP_ADD',

            }
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        components:{
            BP_ADD,
            XT_ADD,
            XZ_ADD
        },
        methods: {
            changeModule(type){
                this.showModule=type;
            },

        },
        created(){
            console.log(this.$route.params.id)
        }
    }
</script>
<style lang="scss">
    .tab-model{
        li{
            display: inline-block;
            width: 140px;
            height: 40px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 40px;
            cursor:pointer;
        }
        li.active-tab{
            background: #409EFF;
            color: #fff;
        }
    }


</style>