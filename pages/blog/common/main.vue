<template>
  <div class="blog-main">
    <div class="flex justify-center">
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        <div class="rounded overflow-hidden shadow-md mx-2 my-2 card bg-white" v-for="(item,index) in blogList.rows" @click="goDetails(item.path)">
          <div class="relative hover-img">
            <img class="" :src="item.img|| 'https://picsum.photos/536/354'">
            <span class="z-10 absolute left-0 bottom-1/2 m-auto w-full text-center text-white font-bold text-xl">{{item.title}}</span>
          </div>
          <div class="px-6 py-4">
            <!-- <div class="font-bold text-xl mb-2">{{item.title}}</div> -->
            <div class="text-gray-700 text-base block-with-text">
              {{item.content}}
            </div>
            <div class="flex justify-between text-gray-700 ">
              <span> <i class="far fa-clock fa-fw icon-date"></i>{{item.created}}</span>
              <span> <i class="fas fa-bookmark fa-fw icon-category"></i>{{item.sort}} </span>
            </div>
          </div>
          <div class="px-6 pt-4 pb-2 border-t-2">
            <span class="bg-color inline-block  rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2" v-for="item in item.tags">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
    <Pagination :page-index="Number(this.$route.params.id)||1" :total="blogList.count" :page-size="$store.state.common.query.per_page" @change="pageChange" v-if="Math.ceil(blogList.count / Number($store.state.common.query.per_page))>1"></Pagination>
  </div>
</template>

<script>
export default {
  validate({ params, query, error }) {
    // return true; // 如果参数有效
    return false; // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
  },
  props: ['blogList'],
  asyncData({ app, params, error }) {
    let { data } = app.$axios.get('/api/v1/blog/sortList');
    return {
      blogList: data.data,
    };
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goDetails(id) {
      this.$router.push('/blog/details/' + id);
    },
    //从page组件传递过来的当前page
    pageChange(page) {
      if (this.$route.name === 'blog-id') return this.$router.push({ name: this.$route.name, params: { id: page } });
      // this.$router.push({ name: this.$route.name, params: { id: page } });
      // this.$store.dispatch('common/setQuerySet', page);
      this.$emit('numChange', page);
    },
  },
  components: {},
};
</script>

<style scoped >
.active {
  color: red;
}
.bg-color {
  background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}
.relative img {
  width: 100%;
  height: 17rem;
}
.shadow-md {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card {
  transition: box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    -webkit-transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translate(0, 0);
}
.card:hover {
  box-shadow: 10px 6px 16px -5px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}
.hover-img:before,
.hover-img:after {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  z-index: 1;
  opacity: 0.5;
  transform: scaleY(1);
}
.hover-img:hover:before,
.hover-img:hover:after {
  transform: scale(1);
  opacity: 0;
  transition: all 0.3s ease;
}
</style>
