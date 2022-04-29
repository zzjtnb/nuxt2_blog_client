<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
    <div class="rounded overflow-hidden shadow-md mx-2 my-2 card bg-white" v-for="(item,index) in videoList.rows" @click="goDetails(item.path)">

      <img class="w-full" :src="item.thumbnail">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{item.title}}</div>
        <div class="mt-2 text-sm text-gray-600 block-with-text">{{ item.description }}</div>
        <div class="text-gray-600 text-base">
          <span> <i class="far fa-clock fa-fw icon-date"></i>{{item.created}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, error }) {
    // let videoList = await app.$axios.get(`/api/v1/video/list?page=${params.id}&per_page=${app.store.state.common.query.per_page}`)
    // return { videoList: videoList.data }
    return await app.$axios
      .get(
        `/api/v1/video/list?page=${params.id}&per_page=${app.store.state.common.query.per_page}`,
      )
      .then((res) => {
        return { videoList: res.data };
      })
      .catch((e) => {
        error({ statusCode: e.status, message: e.message });
      });
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goDetails(id) {
      this.$router.push('/video/details/' + id);
    },
  },
  components: {},
};
</script>

<style scoped >
</style>