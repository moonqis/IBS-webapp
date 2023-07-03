<template>
  <div style="background-color: white;">
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div>
        <img :src="logo" style="width: 150px; height: 50px" />

        <van-icon
          name="chat-o"
          size="35px"
          style="float: right; margin-top: 10px; margin-right: 30px"
          @click="$router.push('/message')"
        >
        </van-icon>
        <!-- <h2 style="font-size: 0.4rem; margin-inline: 0.2rem; margin-block: 12px">
      IBS健康管理
    </h2> -->
      </div>
      <div class="home">
        <van-swipe :autoplay="3000" style="margin: 10px">
          <van-swipe-item v-for="index in images" :key="index" style="">
            <van-image width="100%" height="4rem" fit="cover" :src="index" />
          </van-swipe-item>
        </van-swipe>

        <!-- <divide style="max-width: 100%"></divide> -->
        <!-- <icon-list></icon-list> -->
        <div>
          <div
            style="
              display: flex;
              width: 7.5rem;
              padding: 0 0.4rem;
              display: flex;
              justify-content: space-between;
              height: 1rem;
              align-items: center;
            "
          >
            <div style="font-size: 0.4rem; font-weight: 600">种类一览</div>
            <div style="float: right">
              <div class="look_all" @click="is_show = !is_show">
                <p style="font-size: 0.3rem">{{ words }}</p>
                <van-icon
                  name="arrow-down"
                  class="nlook_img"
                  :class="is_show ? 'up_img' : 'nlook_img'"
                  alt
                />
              </div>
            </div>
          </div>
          <!-- <div class="fenjiexian"><span class="midText"></span></div> -->
          <div class="richTxt" :class="is_show ? 'new_detail' : 'work_detail'">
            <icon-list></icon-list>
          </div>
        </div>
        <van-row type="flex" justify="space-around" style="margin-top: 0.7rem">
          <van-col span="0" />

          <van-col span="7" style="">
            <div
              style="display: flex; flex-wrap: wrap; width: 2rem; height: 2rem"
              @click="$router.push('/food')"
            >
              <van-icon name="cluster-o" color="#1989fa" size="1.5rem" />
              <span style="margin-left: 6px">食物分类</span>
            </div></van-col
          >
          <van-col span="2">
            <div
              style="width: 1px; height: 2rem; background-color: #888888"
            ></div>
          </van-col>
          <van-col span="8" style="">
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                width: 2rem;
                height: 2rem;
                text-align: center;
              "
              @click="$router.push('/search_detail')"
            >
              <van-icon name="search" color="#1989fa" size="1.5rem" />
              <span style="margin-left: 6px">食物搜索</span>
            </div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" style="margin-top: 0.7rem">
          <van-col span="0" />

          <van-col span="7" style="">
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                width: 2rem;
                height: 2rem;
                text-align: center;
              "
              @click="$router.push('/feed')"
            >
              <van-icon name="comment-circle-o" color="#1989fa" size="1.5rem" />
              <span style="margin-left: 6px">信息反馈</span>
            </div></van-col
          >
          <van-col span="2">
            <div
              style="width: 1px; height: 2rem; background-color: #888888"
            ></div>
          </van-col>
          <van-col span="8" style="">
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                width: 2rem;
                height: 2rem;
                text-align: center;
              "
              @click="$router.push('/help')"
            >
              <van-icon name="question-o" color="#1989fa" size="1.5rem" />
              <span style="margin-left: 6px">相关信息</span>
            </div>
          </van-col>
        </van-row>
        <div style="height: 100px"></div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { showToast } from "vant";

// @ is an alias to /src
import topNav from "@/components/line/topNav.vue";
import iconList from "@/components/line/iconList.vue";
import Divide from "@/components/line/divide.vue";

export default {
  name: "HomeView",
  components: {
    topNav,
    iconList,
    Divide,
  },
  setup() {
    const images = [
      require("@/assets/img/index1.jpg"),
      require("@/assets/img/index2.jpg"),
      require("@/assets/img/index3.jpg"),

    ];
    const logo = require("@/assets/logo-ibs.png");
    const loading = ref(false);
    const onRefresh = () => {
      setTimeout(() => {
        // showToast('刷新成功');
        loading.value = false;
      }, 1000);
    };
    return { images, logo, loading, onRefresh };
  },
  computed: {
    words() {
      if (this.is_show === false) {
        return "查看全部";
      } else if (this.is_show === true) {
        return "收起全部";
      } else if (this.is_show === "") {
        return null;
      } else {
        return null;
      }
    },
  },
  data() {
    return {
      is_show: true,
    };
  },
};
</script>

<style lang="less" scoped>
.fenjiexian {
  position: relative;
  margin: 0 auto;
  width: 100%;
  background-color: #d4d4d4;
  text-align: center;
  color: rgba(101, 101, 101, 1);
  margin-bottom: 0.2rem;
}
.midText {
  height: 0.1rem;
  position: absolute;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}

.new_detail {
  font-size: 16px;
  padding: 0 10px;
  height: 100%;
  transition: height 2s linear;
}
.work_detail {
  width: 100%;
  overflow: hidden; /**隐藏超出的内容**/
  padding: 0 10px;
  height: 1.7rem;
}

.look_all {
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 14px;
  color: #000;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  border-radius: 5px;
  background: #fff;
  justify-content: space-between;
  // margin-left: 3rem;
}
.look_all .nlook_img {
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-top: 6px;
  transition-duration: 500ms;
}
.look_all .up_img {
  transform: rotate(180deg);
  transition-duration: 500ms;
  margin-bottom: 10px;
  margin-left: -1px;
}
</style>