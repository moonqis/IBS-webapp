<template>
  <div style="background-color: #fafafa">
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <showtop Text="消息"></showtop>
    <div v-for="index in message" :key="index.id">
      <div v-if="index.title != '' && index.title != null">
        <van-cell-group inset style="margin: 20px" border>
          <van-cell clickable @click="Getone(index)">
            <template #title>
              <div class="van-ellipsis" style="width: 150px">
                {{ index.title }}
              </div>
            </template>
            <template #value>
              {{ index.Date }}
            </template>
            <template #label>
              <div class="van-multi-ellipsis--l3" style="width: 160%">
                {{ index.state }}
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-else>
        <div style="visibility: hidden"></div>
      </div>
    </div>
    <van-dialog v-model:show="show">
      <template #title>
        <van-notice-bar
          color="#111111"
          background="#ffffff"
          delay="3"
          style="margin-inline: 10px"
        >
          {{ getone.title }}
        </van-notice-bar>
      </template>
      <div
        style="
          max-height: 50vh;
          margin-right: 12px;
          margin-left: 18px;
          font-size: 14px;
          color: #666666;
          display: flex;
          flex-direction: column;
        "
      >
        <p style="margin-left: 50%">{{ getone.Date }}</p>
        <div style="overflow-y: auto">{{ getone.state }}</div>
        <div style="height: 15px"></div>
      </div>
    </van-dialog>
    <div style="height: 150px"></div>
  </div>
</template>
  
  <script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { showToast } from "vant";
import topNav from "@/components/line/topNav.vue";
import showtop from "@/components/line/showtop.vue";
import Api from "@/api/Api";

export default {
  name: "HomeView",
  components: {
    topNav,
    showtop,
  },
  setup() {
    const state = reactive({
      message: [],
      getone: {},
    });
    const show = ref(false);

    onMounted(() => {
      function sortKey(array, key) {
        return array.sort(function (a, b) {
          var x = a[key];
          var y = b[key];
          return x > y ? -1 : x < y ? 1 : 0;
        });
      }
      Api.findallnotice()
        .then((data) => {
          Object.assign(state.message, sortKey(data, "Date"));
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const Getone = (e) => {
      console.log(state.message);

      console.log(e);
      state.getone = e;
      show.value = true;
    };
    return {
      ...toRefs(state),
      Getone,
      show,
    };
  },
};
</script>
  
  <style lang="less" scoped>
</style>