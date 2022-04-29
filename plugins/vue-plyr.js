import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'
const options = {
  plyr: {
    fullscreen: { enabled: true },
    tooltips: { controls: true, seek: true },
    i18n: {
      restart: '从头开始',
      rewind: 'Rewind {seektime} secs',
      play: '播放',
      pause: '暂停',
      fastForward: 'Forward {seektime} secs',
      seek: '工具栏',
      seekLabel: '{currentTime} of {duration}',
      played: '已播放',
      buffered: '已缓冲',
      currentTime: '当前时间',
      duration: '持续时间',
      volume: '音量',
      mute: '静音',
      unmute: '取消静音',
      enableCaptions: '启用字幕',
      disableCaptions: '禁用字幕',
      download: '下载',
      enterFullscreen: '进入全屏',
      exitFullscreen: '退出全屏',
      frameTitle: 'Player for {title}',
      captions: '字幕',
      settings: '设置',
      speed: '速度',
      normal: '正常',
      quality: '画质',
      loop: '循环',
      start: '开始',
      end: '结束',
      all: '所有',
      reset: '重播',
      disabled: '禁用',
      enabled: '启用',
      pip: '画中画',
      advertisement: '广告',
      qualityBadge: {
        2160: '4K',
        1440: 'HD',
        1080: 'HD',
        720: 'HD',
        576: 'SD',
        480: 'SD',
      },
    }
  },
  emit: ['ended']
}
// The second argument is optional and sets the default config values for every player.



if (typeof document !== 'undefined') {
  Vue.use(VuePlyr, options)
} else {
  console.log('NodeJs环境')
}
