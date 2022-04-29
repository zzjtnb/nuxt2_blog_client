<template>
  <div class="blog-sort">
    <div class="flex justify-around items-center bg-white rounded  mb-2 py-2 shadow-lg">
      <nuxt-link to="/blog/1" class=" font-semibold text-teal-500"> <i class="fas fa-home"></i> 博客首页</nuxt-link>
      <nuxt-link to="/blog/tags" class=" font-semibold text-pink-500"> <i class="fas fa-tags"></i> 博客标签</nuxt-link>
    </div>
    <div class="bg-white rounded text-center mt-2 shadow-lg">
      <Sort :sortList='sortList' @getSort='getSortdetails' />
    </div>
    <div>
      <Main :blogList='blogList' @numChange='numChange' />
    </div>
  </div>
</template>

<script>
import Sort from '../common/sort';
import Main from '../common/main';
export default {
  head() {
    return {
      title: this.title,
      blogList: {},
    };
  },
  async asyncData({ app, params, error }) {
    let [sortList, blogList] = await Promise.all([
      app.$axios.get('/api/v1/blog/sortList'),
      app.$axios.$get(`/api/v1/blog/sort?page=${app.store.state.common.query.page}&per_page=${app.store.state.common.query.per_page}&sort=${encodeURIComponent(params.id)}`),
    ]);
    return {
      sortList: sortList.data,
      blogList: blogList,
    };
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
      this.$router.push('/blog/sort/' + sort);
    },
    getTagsdetails(tags) {
      this.$router.push('/blog/tags/' + tags);
    },
    numChange(num) {
      this.$axios(`/api/v1/blog/sort?page=${num}&per_page=${this.$store.state.common.query.per_page}&sort=${encodeURIComponent(this.$route.params.id)}`).then((res) => {
        this.blogList = res.data;
      });
    },
  },
  components: {
    Sort,
    Main,
  },
};
</script>

<style scoped >
.active {
  color: red;
}
</style>
