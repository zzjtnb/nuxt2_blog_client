<template>
  <div class="blog">
    <div class="flex justify-around items-center bg-white rounded  mb-2 py-2 shadow-lg">
      <nuxt-link to="/blog/sort" class=" font-semibold text-indigo-500"> <i class="fas fa-bookmark"></i> 博客分类</nuxt-link>
      <nuxt-link to="/blog/tags" class=" font-semibold text-pink-500"> <i class="fas fa-tags"></i> 博客标签</nuxt-link>
    </div>
    <Main :blogList='blogList' />
  </div>
</template>

<script>
import Main from './common/main';
export default {
  name: 'blog-list',
  validate({ params, query }) {
    // return true; // 如果参数有效
    // return false; // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    // console.log();
    return !isNaN(params.id);
  },
  head() {
    return {
      title: this.title,
    };
  },
  async asyncData({ app, params, error }) {
    // let blogList = await app.$axios.get(
    //   `/api/v1/blog/list?page=${params.id}&per_page=${app.store.state.common.query.per_page}`,
    // );
    // return { blogList: blogList.data };
    return await app.$axios
      .get(
        `/api/v1/blog/list?page=${params.id}&per_page=${app.store.state.common.query.per_page}`,
      )
      .then((res) => {
        return { blogList: res.data };
      })
      .catch((e) => {
        error({ statusCode: e.status, message: e.message });
      });
  },
  data() {
    return {
      title: '博客',
      blogList: {},
    };
  },
  created() {},
  mounted() {},
  methods: {
    go(id) {
      this.$router.push('/blog/details/' + id);
    },
    getSortdetails(sort) {
      this.$router.push({ path: '/blog/sort', query: { id: sort } });
    },
    getTagsdetails(tags) {
      this.$router.push({ path: '/blog/tags', query: { id: tags } });
    },
  },
  components: {
    Main,
  },
  //transition:"动画名"
  // transition: 'blog',
};
</script>

<style scoped >
.active {
  color: red;
}
</style>
