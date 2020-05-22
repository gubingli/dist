<template>
  <div class="error-forbidden">
    {{msg}}
    <p>
      <router-link :to="{name: 'home'}" class="link-to">回到首页>></router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Forbidden',
  data () {
    return {
      msg:'403页面-无权限'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .error-forbidden{
    color: #2A8BFF;
    font-size: 36px;
    text-align: center;
    .link-to{
      color: #ccc;
      font-size: 24px;
    }
  }
</style>
