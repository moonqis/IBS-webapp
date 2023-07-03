<template>
  <div class="iconList">
    <div class="iconItem" @click="$router.push('/')">
      <img :src="icon2" class="icon1" />

      <span>首页</span>
    </div>
    <div class="iconItem" @click="$router.push('/food')">
      <img :src="icon4" class="icon1" />

      <span>分类</span>
    </div>

    <div class="iconItem" @click="$router.push('/search')">
      <img :src="icon3" class="icon1" />

      <span>搜索</span>
    </div>
    <div class="iconItem" @click="$router.push('/person')">
      <img :src="icon1" class="icon1" />

      <span>我的</span>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      icon1: require("@/assets/icon/wode-.png"),
      icon2: require("@/assets/icon/shouye-.png"),
      icon3: require("@/assets/icon/sousuo.png"),
      icon4: require("@/assets/icon/fenlei-.png"),
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less" scoped>
.iconList {
  z-index: 999;
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 7.5rem;
  display: flex;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  padding-top: 0.2rem;
  height: 1.5rem;
  justify-content: space-between; //两边布局 向两边靠
  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon1 {
      width: 0.7rem;
    }
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
    span {
      font-size: 0.2rem;
    }
  }
}
</style>