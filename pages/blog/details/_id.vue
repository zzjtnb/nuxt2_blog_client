<template>
  <div class="blog-details">
    <div class="flex justify-around items-center bg-white rounded  mb-2 py-2 shadow-lg">
      <nuxt-link to="/blog/1" class=" font-semibold text-teal-500"> <i class="fas fa-home"></i> 博客首页</nuxt-link>
      <nuxt-link to="/blog/sort" class=" font-semibold text-indigo-500"> <i class="fas fa-bookmark"></i> 博客分类</nuxt-link>
      <nuxt-link to="/blog/tags" class=" font-semibold text-pink-500"> <i class="fas fa-tags"></i> 博客标签</nuxt-link>
    </div>
    <div class="card-header text-center">
      <p class=" font-bold text-xl mb-2 ">{{data.title}}</p>
      <div></div>
      <ul class="flex justify-center flex-wrap">
        <li class="mx-4"> <i class="far fa-calendar-alt text-blue-400"></i> <span>发布日期:{{data.created}}</span></li>
        <li class="mx-4" v-if="data.updated"> <i class="far fa-calendar-check text-blue-400"></i> <span>更新日期:{{data.updated}}</span></li>
        <li class="mx-4"> <i class="fas fa-book text-blue-400"></i><span>博客字数:{{ this.ruleOne(data.content.replace(/<[^>]+>/ig, ''))}}</span> </li>
        <li class="mx-4">
          <i class="far fa-clock text-blue-400"></i>
          <span>预计阅读时长: {{ this.ruleOne(data.content.replace(/<[^>]+>/ig, '')) |readTime }}分钟</span>
        </li>
        <li class="mx-4">
          <i class="fas fa-tags text-blue-400"></i>
          <span>分类: {{data.sort }}</span>
        </li>
        <li class="mx-4">
          <i class="fas fa-bookmark text-blue-400"></i>
          <span>标签: </span>
          <span v-for="item in data.tags" class="sm:p-0 rounded-lg md:p-1 m-2" :style="{ background:  'hsla('+ Math.floor(Math.random()*360) +',90%,90%,1)'}">{{item}}</span>
        </li>
      </ul>
    </div>
    <client-only>
      <mavon-editor v-model="data.content" :boxShadow="false" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" codeStyle="agate" style="z-index:0" />
    </client-only>
  </div>
</template>

<script>
// 自行导入样式
import 'mavon-editor/dist/css/index.css';
export default {
  async asyncData({ app, params, query, store, route, error }) {
    const { data } = await app.$axios.get(`/api/v1/blog/details?path=${params.id}`);
    return { data: data };
  },
  head() {
    return {
      title: this.data.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.data.content.substring(0, 200),
        },
      ],
    };
  },

  data() {
    return {};
  },
  filters: {
    readTime: function (value) {
      if (!value) return '';
      // var readTXT = document.querySelector('.article').innerText.length;
      let readTime = value / 400; //计算阅读时间(一般，人的阅读速度是300-500字/分钟 ，所以就取了个400，这个值可以根据自己的实际需求来更改)
      let mathReadTime = Math.round(readTime); //四舍五入
      if (mathReadTime > 1) {
        // console.log('预计阅读时长：' + readTime + '分钟');
        return mathReadTime;
      } else {
        // console.log('预计阅读时长：1分钟');
        return 1;
      }
    },
  },
  mounted() {},
  methods: {
    ruleOne(value) {
      var chinese = 0;
      var english = 0;
      if (value.match(/[\u4e00-\u9fa5]/g) != null) {
        chinese = value.match(/[\u4e00-\u9fa5]/g).length;
      }
      if (value.match(/[a-zA-z0-9]/g) != null) {
        english = value.match(/[a-zA-z0-9]/g).length;
      }
      var valueLength = chinese * 2 + english;
      return valueLength;
    },
  },
  components: {},
};
</script>

<style scoped >
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #fbfbfb;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>