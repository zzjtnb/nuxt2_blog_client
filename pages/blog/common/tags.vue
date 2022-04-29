<template>

  <div class="pb-12">
    <div class="text-xl font-semibold mb-2 ">
      <i class="fas fa-tags"></i> 博客标签
    </div>

    <ul class="flex justify-center flex-wrap ">
      <li v-for="(item,index) in tagsList" @click="getTags(index)" class=" m-2">
        <span class="rounded-lg p-1" :style="{ background:  'hsla('+ Math.floor(Math.random()*360) +',90%,90%,1)'}"> {{index}}
          <span class="text-red-500 "> {{item}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["tagsList"],
  data() {
    return {}
  },
  created() {

  },
  mounted() { },
  methods: {
    getTags(tags) {
      this.$emit('getTags', tags)
    }
  },
  components: {

  },
}
</script>

<style scoped >
</style>