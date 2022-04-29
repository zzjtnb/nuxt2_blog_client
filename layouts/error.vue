<template>
  <div class="container">
    <h1 v-if="error.statusCode">{{error.message}}</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  //接受错误信息error:{statusCode,message}
  props: ['error'],
  // layout: 'blog', // 你可以为错误页面指定自定义的布局
};
</script>

<style scoped>
.container {
  font-family: sans-serif;
  padding-top: 10%;
  text-align: center;
}
h1 {
  font-size: 20px;
}
</style>