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
  name: 'NotFound',
  data () {
    return {
      msg:'404-页面找不到了'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .error-forbidden{
    color: #2A8BFF;
    font-size: 80px;
    text-align: center;
    margin-top: 160px;
    text-shadow: 5px 5px 5px #ccc;
    .link-to{
      color: #ccc;
      font-size: 24px;
    }
  }
</style>
