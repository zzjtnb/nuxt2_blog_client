<template>
  <div class="blog-tags">
    <div class="flex justify-around items-center bg-white rounded  mb-2 py-2 shadow-lg">
      <nuxt-link to="/blog/1" class=" font-semibold text-teal-500"> <i class="fas fa-home"></i> 博客首页</nuxt-link>
      <nuxt-link to="/blog/sort" class=" font-semibold text-indigo-500"> <i class="fas fa-bookmark"></i> 博客分类</nuxt-link>
    </div>
    <div class="bg-white rounded text-center mt-2 shadow-lg">
      <Tags :tagsList='tagsList' @getTags='getTagsdetails' />
    </div>
    <div>
      <Main :blogList='blogList' @numChange='numChange' />
    </div>
  </div>
</template>

<script>
import Tags from '../common/tags';
import Main from '../common/main';
export default {
  head() {
    return {
      title: this.title,
      blogList: {},
    };
  },
  async asyncData({ app, params, error }) {
    let [tagsList, blogList] = await Promise.all([
      app.$axios.get('/api/v1/blog/tagsList'),
      app.$axios.$get(`/api/v1/blog/tags?page=${app.store.state.common.query.page}&per_page=${app.store.state.common.query.per_page}&tags=${encodeURIComponent(params.id)}`),
    ]);
    function getRepeatNum(array) {
      let obj = {};
      // let newArr = [].concat.apply([], arr)//只能将二维转一维
      let newArr = array.flat(); //es6的flat()方法将多维转一维
      for (let i = 0, l = newArr.length; i < l; i++) {
        let item = newArr[i].toLowerCase(); //转小写
        obj[item] = obj[item] + 1 || 1;
      }
      return obj;
    }
    let list = getRepeatNum(tagsList.data);
    return {
      tagsList: list,
      blogList: blogList,
    };
  },
  data() {
    return {
      title: '博客',
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
      this.$axios(`/api/v1/blog/tags?page=${num}&per_page=${this.$store.state.common.query.per_page}&tags=${encodeURIComponent(this.$route.params.id)}`).then((res) => {
        this.blogList = res.data;
      });
    },
  },
  components: {
    Tags,
    Main,
  },
};
</script>

<style scoped >
.active {
  color: red;
}
</style>
