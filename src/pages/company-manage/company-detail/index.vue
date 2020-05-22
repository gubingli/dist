<template>
  <DescriptionList title="退款申请" col="6" :content="data"> // col element-ui栅格栏布局同官网使用
    <Description term="取货单号">1000000000</Description> // 组件内使用固定标签
    <Description term="状态">已取货</Description>
    <Description term="销售单号">1234123421</Description>
    <Description term="子订单">3214321432</Description>
  </DescriptionList>
</template>
<script>
    import DescriptionList from "@/components/Description.vue"; // 引入组件
    export default {
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {},
        components: {
            DescriptionList
        },
        mounted:function(){

        }
    }
</script>
