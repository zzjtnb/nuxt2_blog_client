<template>
  <div>
    <div class="text-xl font-semibold mb-2 ">
      <i class="fas fa-bookmark"></i> 博客分类
    </div>
    <ul class="flex justify-center flex-wrap pb-6">
      <li v-for="item in sortList" @click="getSort(item.sort)" class="m-2 ">
        <span class="p-1 rounded-lg " :style="{ background:  'hsla('+ Math.floor(Math.random()*360) +',90%,90%,1)'}"> {{item.sort}}
          <span class="text-red-500 "> {{item.count}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  props: ["sortList"],
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getSort(sort) {
      this.$emit('getSort', sort)
    }
  },
  components: {

  },
}
</script>

<style scoped >
</style>