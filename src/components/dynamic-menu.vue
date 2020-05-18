<template>
    <div class="menu-container">
        <template v-for="v in menuList">
            <template v-if="!v.meta.slideHide">
                <el-submenu :index="v.name" v-if="v.children&&v.children.length>0" :key="v.name">
                    <template slot="title">
                        <i class="iconfont" :class="v.meta.icon"></i>
                        <span>{{v.meta.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <my-nav :menuList="v.children"></my-nav>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v.name,v.meta.slideName)" v-else>
                    <i class="iconfont" :class="v.meta.icon"></i>
                    <span slot="title">{{v.meta.name}}</span>
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'my-nav',
    props: {
        menuList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        gotoRoute(name,meta_name) {
            this.$store.commit('permission/SET_CURRENT_MENU', meta_name)//current
            this.$router.push({ name })
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.menu-container {}
</style>
