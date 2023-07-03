<template>
  
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import Api from "@/api/Api";
import store from "@/store";
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    const onLoad = () => {
      // 异步更新数据
      // for (let i = 0; i < 15; i++) {
      //   state.list.push(state.list.length + 1);
      // }
      // console.log(state.list);
      // // 加载状态结束
      // state.loading = false;
      // setTimeout(() => {
      //   // 数据全部加载完成
      //   if (state.list.length >= 40) {
      //     state.finished = true;
      //   }
      // }, 500);
    };
    onMounted(() => {
      console.log(store.state.index);

      Api.getonesort(store.state.index)
        .then((data) => {
          Object.assign(state.list, data.rows);
          console.log(state.list, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(state),
      onLoad,
    };
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
