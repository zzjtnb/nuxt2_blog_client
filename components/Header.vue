<template>
  <div class="sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 md:container md:mx-auto md:justify-start">
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <div class="mr-4 site-logo">
        <img src="/images/header/logo-light.png" class="w-10 h-10" />
      </div>
      <div class="sm:hidden">
        <button @click="isOpen = !isOpen" type="button" class="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
          <i class="fas fa-bars" v-if="!isOpen"></i>
          <i class="fas fa-times" v-if="isOpen"></i>
          <!-- <i class="fas fa-bars"></i> -->
        </button>
      </div>
    </div>
    <nav :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:p-0 md:flex items-center container mx-auto flex-no-wrap">
      <ul class="flex md:flex-auto font-semibold text-xl  kaiti">
        <li class="mx-2">
          <nuxt-link to="/" @click.native="isOpen = false">首页</nuxt-link>
        </li>
        <li class="mx-2">
          <nuxt-link to="/blog/1" @click.native="isOpen = false">博客</nuxt-link>
        </li>
        <li class="mx-2">
          <nuxt-link to="/english" @click.native="isOpen = false">英语</nuxt-link>
        </li>
        <li class="mx-2">
          <nuxt-link to="/music" @click.native="isOpen = false">音乐</nuxt-link>
        </li>
        <li class="mx-2">
          <nuxt-link to="/video/1" @click.native="isOpen = false">视频</nuxt-link>
        </li>
      </ul>
      <ul class="flex font-semibold text-xl  kaiti">
        <li class="mr-2">
          <div class="relative">
            <div class="flex items-center" @click="DropdownOpen">
              <button class="relative z-10 block focus:outline-none font-bold" :class="{'text-white':this.$route.path.match('user')}">用户</button>
              <i class="fas fa-angle-down text-xs"></i>
            </div>
            <button v-if="isDropdownOpen" @click="isDropdownOpen = false" tabindex="-1" class="fixed inset-0 h-full bg-black opacity-50 cursor-default"></button>
            <div v-if="isDropdownOpen" class="absolute mt-2 py-2 w-20 text-center bg-white rounded-lg shadow-xl z-10">
              <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" to="/user/login" @click.native="DropdownOpen">登录</nuxt-link>
              <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" to="/user/register" @click.native="DropdownOpen">注册</nuxt-link>
              <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" to="/" @click.native="DropdownOpen">注销</nuxt-link>
            </div>
          </div>
        </li>
        <li class="mx-2  opacity-50 cursor-not-allowed">语言</li>
        <li class="mx-2 font-sans font-normal text-base ">
          <Search />
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
import Search from './Search';
export default {
  data() {
    return {
      menu: ['首页', '博客', '音乐', '视频'],
      isOpen: false,
      isDropdownOpen: false,
    };
  },
  mounted() {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isDropdownOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  },
  methods: {
    DropdownOpen() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  components: {
    Search,
  },
};
</script>

<style scoped >
/**logo扫光效果CSS**/
.site-logo {
  position: relative;
  overflow: hidden;
}

.site-logo:before {
  /**根据logo外div样式名称修改before前名称**/
  content: '';
  position: absolute;
  left: -665px; /**第一个数字参数控制扫光速度，数字越大越慢**/
  top: -460px;
  width: 200px;
  height: 0.2rem; /**光标的宽度，可根据实际调整**/
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: searchLights 1s ease-in 1s infinite;
  -o-animation: searchLights 1s ease-in 1s infinite;
  animation: searchLights 1s ease-in 1s infinite; /**第一个数字参数控制扫光速度，数字越大越慢**/
}
@-webkit-keyframes searchLights {
  0% {
    left: -100px;
    top: 0;
  }
  to {
    left: 120px;
    top: 100px;
  }
}
@-o-keyframes searchLights {
  0% {
    left: -100px;
    top: 0;
  }
  to {
    left: 120px;
    top: 100px;
  }
}
@-moz-keyframes searchLights {
  0% {
    left: -100px;
    top: 0;
  }
  to {
    left: 120px;
    top: 100px;
  }
}
@keyframes searchLights {
  0% {
    left: -100px;
    top: 0;
  }
  to {
    left: 120px;
    top: 100px;
  }
}
</style>