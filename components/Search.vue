<template>
  <div>
    <input type="search" placeholder="输入关键字" class="searchInput" v-model="searchValue" @keyup.stop.passive="searchData" />
    <!-- {{searchList}} -->
    <div class="flex flex-wrap" v-if="this.searchList.length>0">
      <ul class="list-group">
        <li class="list-group-item bg-servquick " v-for="item in searchList" @click="goDetails(item.path)">
          <div class="">
            <h6 class="font-bold text-teal-400">{{item.title}}</h6>
          </div>
          <p class="block-with-text">
            {{item.content}}
          </p>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import utils from '../utils/util';
export default {
  data() {
    return {
      searchList: [],
      searchValue: '',
    };
  },
  watch: {
    searchValue: function (newVal, oldVal) {
      if (this.searchValue == '') {
        this.searchList = [];
      }
    },
  },
  mounted() {},
  methods: {
    getData() {
      this.$axios('/api/v1/blog/search', { params: { page: this.$store.state.common.query.page, per_page: this.$store.state.common.query.per_page, value: this.searchValue } }).then((res) => {
        this.searchList = res.data.rows;
      });
    },
    searchData(event) {
      if (event.target.value == '') return;
      this.searchValue = event.target.value;
      utils.debounce(this.getData, 1000);
    },
    goDetails(path) {
      if (path == this.$route.path) {
        this.searchValue = '';
      } else {
        this.$router.push(`/blog/details/${path}`);
        this.searchValue = '';
      }
    },
  },
  components: {},
};
</script>

<style scoped >
.searchInput {
  color: #fff;
  outline-style: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #fff;
  box-shadow: none;
  background-image: none;
  background-color: transparent;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding-left: 0.5rem;
  width: 8rem;
}

input[type='search']:focus:not([readonly]) {
  box-shadow: 0 0 0 0 #8ff442;
  border-bottom: 1px solid #8ff442;
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: url('/images/x.png') no-repeat;
  background-size: contain;
}

input::placeholder {
  color: #ffffffb0;
  font-size: 0.95rem;
  font-family: 'Ma Shan Zheng', cursive;
}
/**data */
.bg-servquick {
  background: #485563;
  background: linear-gradient(90deg, #29323c, #485563);
}

li:last-child {
  border: none;
}
.list-group-item {
  border: none;
  border-bottom: 2px dashed #51606b;
}
.list-group {
  position: absolute;
  height: 40rem;
  width: 20rem;
  margin-top: 0.5rem;
  z-index: 989;
  cursor: default;
  overflow: auto;
  right: 2rem;
}
@media (max-width: 768px) {
  .list-group {
    position: absolute;
    height: 40rem;
    width: 100%;
    margin-top: 0.5rem;
    z-index: 989;
    cursor: default;
    overflow: auto;
    right: 0;
  }
}
@media (min-width: 1024px) {
  .list-group {
    position: absolute;
    right: 6rem;
    height: 40rem;
    width: 40rem;
    margin-top: 0.5rem;
    z-index: 989;
    cursor: default;
    overflow: auto;
  }
}
/* 滚动条 */
.list-group::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}

.list-group::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.list-group::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* background-image: linear-gradient(to top, #30cfd0 0%, #ff9800 80%); */
  background-image: linear-gradient(180deg, #fa8bff 0%, #2bd2ff 52%, #5ce466 90%);
}

.list-group::-webkit-scrollbar-thumb:hover {
  height: 50px;
  background-color: #82b1ff;
  border-radius: 4px;
}
</style>