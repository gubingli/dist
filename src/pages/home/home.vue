<template>
  <div id="home">

    {{msg}}
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      msg:'欢迎来到健康管理中心'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #home{
    text-align: center;
    font-size: 34px;
    margin-top: 70px;
    text-shadow: 5px 5px 5px rgb(77, 188, 255);
  }
</style>
