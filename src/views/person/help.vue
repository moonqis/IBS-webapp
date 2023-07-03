<template>
  <div>
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <showtop Text="帮助"></showtop>
    <van-collapse v-model="activeNames" style="margin-top: 2vh" :border=true>
      <van-collapse-item name="1" >
        <template #title>
          <div><van-icon name="question-o" /> 感谢使用</div>
        </template>
        感谢使用IBS食物管理系统，这里是一些说明信息
      </van-collapse-item>
      <van-collapse-item name="2" >
        <template #title>
          <div><van-icon name="question-o" /> 搭建初衷</div>
        </template>
        软件为用户【IBS（肠易激综合征）患者】整理提供了大量食物的FODMAP指数，旨在为用户可以有一个更好的饮食指标
      </van-collapse-item>
      <van-collapse-item name="3" >
        <template #title>
          <div><van-icon name="question-o" /> 数据来源</div>
        </template>
        本系统数据信息均来自均来自已公开发布的国内外论文（期刊文章、连续出版物、专著、论文集等）与莫纳什大学公开的FODMAP食物相关数据，并根据一定条件进行筛选整理
      </van-collapse-item>
      <van-collapse-item name="3" >
        <template #title>
          <div><van-icon name="question-o" /> 问题反馈</div>
        </template>
        用户可以在“我要反馈”中提交相关的建议或者意见（如：对交互性的建议；食物数据的准确性等），我们会尽快处理
      </van-collapse-item>
    </van-collapse>
    <div style="height: 100px"></div>

  </div>
</template>
  
  <script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { showToast } from "vant";
import topNav from "@/components/line/topNav.vue";
import showtop from "@/components/line/showtop.vue";

export default {
  name: "HomeView",
  components: {
    topNav,
    showtop,
  },
  setup() {
    const activeNames = ref(["1","2","3","4"]);
    return { activeNames };
  },
};
</script>
  
  <style lang="less" scoped>
</style>