<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <sidebarNav  class="sidebar"/>
        <mainContent/>
    </div>
</template>

<script>
import sidebarNav from './component/sidebar-nav'
import mainContent from './component/main-content/index'
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])//扩展运算符...mapState,意思是把vuex的state数据映射到计算属性里面,映射后的名字为isSidebarNavCollapse,所以上面直接用this.city,就不用写this.$store.state.city这个长串了
    },
    components: {
        sidebarNav,
        mainContent
    },
    methods:{

    },
}

</script>

<style lang="scss" scoped>

</style>
