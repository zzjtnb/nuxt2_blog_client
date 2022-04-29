import Vue from 'vue';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
if (typeof document !== 'undefined') {
  // console.log('broswer环境')
  Vue.use(mavonEditor);
} else {
  // console.log('NodeJs环境')
}
