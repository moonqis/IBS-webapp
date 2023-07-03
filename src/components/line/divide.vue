<template>
  <div>
    <div class="musicList">
      <div class="musicList-top">
        <div class="title">今日推荐</div>
        <div class="more" @click="$router.push('/search')">
          更多 &nbsp;<van-icon name="arrow" />&nbsp;
        </div>
      </div>
      <div>
        <recommend style="margin-top: 20px;"></recommend>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import recommend from "@/components/line/recommend.vue";

export default {
  components: { recommend },

  setup() {
    const state = reactive({
      recommend: [
        {
          id: 1,
          pic: "",
          name: "1",
        },
        {
          id: 2,
          pic: "",
          name: "1",
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less" scoped>
.musicList {
  width: 7.5rem;
  padding: 0 0.4rem;

  .musicList-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 600;
    }
  }
}
.my-swipe .van-swipe-item {
  font-size: 20px;
  line-height: 100px;
  text-align: center;
}
</style>