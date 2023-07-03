<template>
  <van-sticky :offset-top="0">
    <div class="NavTop">
      <div>
        <van-icon name="arrow-left" style="margin-left: -20px" size="0.5rem" @click="$router.back()"/>
      </div>
      <div>
        {{ Text }}
      </div>
      <div>
        <van-icon
          name="question-o"
          style="margin-right: -20px"
          size="0.5rem"
          @click="show = true"
        />

      </div>
    </div>
  </van-sticky>
  <van-dialog v-model:show="show" confirmButtonColor="#5493e9" style="align-items: center;text-align: center;">
    <template #title>
      <div style="font-size: 18px;font-weight: 600;">
        说明
      </div>
    </template>
    <div style="margin-block: 20px;margin-inline: 35px;">
      数据均来源于可靠资料，详情请见帮助信息（数据统一单位：克/g）
    </div>
</van-dialog>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { showDialog } from 'vant';

export default {
  props: ["Text"],
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
  setup() {

    const shuoming = () => {};
    const show = ref(false);

    return {
      // item,
      // value,
      // switch1,
      // switch2,
      // options,
      // onConfirm,
      show
    };
  },
};
</script>
<style scoped lang="less">
.NavTop {
  height: 8vh;
  background-color: rgb(249, 251, 251);
  display: flex;
  width: 100%;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5vw;
    font-weight: 500;
    width: 100%;
    color: #425b6c;
  }
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>