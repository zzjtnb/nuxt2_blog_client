<template>
  <div class="flex justify-around items-center bg-white rounded  my-2 py-2 shadow-lg">
    <nuxt-link to="/blog/1" class=" font-semibold text-teal-500"> <i class="fas fa-home"></i> 博客首页</nuxt-link>
    <nuxt-link to="/blog/sort" class=" font-semibold text-indigo-500"> <i class="fas fa-bookmark"></i> 博客分类</nuxt-link>
    <nuxt-link to="/blog/tags" class=" font-semibold text-pink-500"> <i class="fas fa-tags"></i> 博客标签</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },
  components: {

  },
}
</script>

<style scoped >
</style>