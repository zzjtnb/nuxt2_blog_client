import Vue from 'vue'
import Ads from 'vue-google-adsense'
Vue.use(require('vue-script2'));
if (typeof document !== 'undefined') {
  Vue.use(Ads.Adsense);
  Vue.use(Ads.InArticleAdsense);
  Vue.use(Ads.InFeedAdsense);
  Vue.use(Ads.AutoAdsense, { adClient: 'ca-pub-xxx' })
} else {
  console.log('NodeJs环境')
}
