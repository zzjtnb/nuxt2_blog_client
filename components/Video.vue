<template>
  <div>
    <div v-if="type === 'video' && source === 'bilibili'" style="position: relative; padding: 30% 45%;">
      <iframe :src="bilibiliURL" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"> </iframe>
    </div>
    <div class="video-player">
      <vue-plyr v-if="type === 'video' && source === 'youtube'">
        <div class="plyr__video-embed">
          <iframe :src="youtubeURL" allowfullscreen allowtransparency allow="autoplay">
          </iframe>
        </div>
      </vue-plyr>
      <vue-plyr v-if="type === 'video' && source === 'vimeo'">
        <div class="plyr__video-embed">
          <iframe :src="vimeoURL" allowfullscreen allowtransparency allow="autoplay">
          </iframe>
        </div>
      </vue-plyr>
      <vue-plyr v-if="type === 'video' && source === 'web'">
        <video :poster="thumbnail" :src="videoURL" tooltips>
          <source v-for="(url, index) in videoSizeURLS" :key="url" :src="url" :type="videoType" :size="videoSourceSizes[index]">
          <!-- <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
        </video>
      </vue-plyr>
      <vue-plyr v-if="type === 'audio' && source === 'web'">
        <source v-if="mp3URL" :src="mp3URL" type="audio/mp3" />
        <source v-if="oggURL" :src="oggURL" type="audio/ogg" />
      </vue-plyr>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    plyr: {
      fullscreen: {
        enabled: true,
      },
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    emit: ['embed'],
    type: {
      type: String,
      default: 'video', // 'audio' or 'video'
      required: false,
    },
    source: {
      type: String,
      default: 'web', // 'youtube', 'web', or 'vimeo'
      required: false,
    },
    vidId: {
      type: String,
      required: false, // GHMjD0Lp5DY
    },
    cidId: {
      type: String,
      required: false, // GHMjD0Lp5DY
    },
    mp3URL: {
      type: String,
      required: false, // https://example.com/audio.mp3
    },
    oggURL: {
      type: String,
      required: false, // https://example.com/audio.ogg
    },
    videoURL: {
      type: String,
      required: false, // https://example.com/video.mp4
    },
    thumbnail: {
      type: String,
      required: false, // poster.png
    },
    videoType: {
      type: String,
      required: false,
      default: 'video/mp4',
    },
    videoSourceSizes: {
      type: Array, // [720, 1080]
      required: false,
    },
    videoSizeURLS: {
      type: Array, // [video-720p.mp4, video-1080p.mp4]
      required: false,
    },
    videoCaptions: {
      type: Object, // {[name: 'English', lang: 'en', src: 'captions-en.vtt'], [name: 'Spanish', lang: 'es', src: 'captions-es.vtt']}
      required: false,
    },
  },
  data() {
    return {};
  },

  computed: {
    bilibiliURL() {
      return `//player.bilibili.com/player.html?bvid=${this.vidId}&cid=${this.cidId}&page=1&as_wide=1&high_quality=1&danmaku=0" `;
    },
    vimeoURL() {
      return `https://player.vimeo.com/video/${this.vidId}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`;
    },
    youtubeURL() {
      return `https://www.youtube.com/embed/${this.vidId}?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`;
    },
    // player() {
    //   return this.$refs.plyr.player
    // },
  },

  mounted() {
    // this.player.on('event', () => console.log('event fired'))
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang='scss'>
@import url('vue-plyr/dist/vue-plyr.css');
</style>