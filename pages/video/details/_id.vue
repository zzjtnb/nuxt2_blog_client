<template>
  <div class="video-details">
    <div>
      <video-player v-if="data.source=='bilibili'" :source="data.source" :vid-id="data.vidID" :cid-id="data.cidID" />
      <video-player v-if="data.source=='youtube'" :source="data.source" vid-id="GHMjD0Lp5DY" />
      <video-player v-if="data.source=='web'" :source="data.source" videoURL='xxx.mp4' :thumbnail='data.thumbnail' />
    </div>
    <client-only>
      <mavon-editor id="editor" v-model="data.description" :boxShadow="false" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" codeStyle="agate" style="z-index:0" />
    </client-only>
  </div>
</template>

<script>
import Video from '../../../components/Video';
export default {
  async asyncData({ app, params, query, store, route, error }) {
    const { data } = await app.$axios.get(`/api/v1/video/details?path=${params.id}`);
    return { data: data };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    'video-player': Video,
  },
};
</script>

<style scoped lang='scss'>
#editor {
  ::v-deep .v-show-content {
    font-family: 'Ma Shan Zheng', cursive;
    font-size: 1.5rem;
    font-weight: bolder;
  }
}
</style>