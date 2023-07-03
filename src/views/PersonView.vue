<template>
  <div style="background-color: white;">
    <showtop Text="我的"></showtop>
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <div class="me" style="height: auto; width: 100%">
      <div style="height: auto; display: flex">
        <van-image
          round
          width="1.8rem"
          height="1.8rem"
          :src="user.picurl"
          style="margin: 30px"
          
        />
        <div style="display: flex; flex-direction: column; margin-top: 5vh">
          <div style="align-items: center; margin-top: 40px;margin-left: 10px;">
            <span style="font-size: 17px; color: aliceblue">{{
              user.make_name
            }}</span>
            <!-- <van-icon
              name="edit"
              size="20px"
              style="margin-bottom: -3px; margin-left: 10px"
              color="aliceblue"
              @click="$router.push('/person_change')"
            /> -->
          </div>
        </div>
      </div>
      <div style="margin-inline: 20px; text-align: center; color: aliceblue">
        <van-row gutter="20">
          <van-col span="8">
            <van-icon
              name="contact"
              size="30px"
              @click="$router.push('/person_detail')"
            />
          </van-col>
          <van-col span="8">
            <van-icon
              name="like-o"
              size="30px"
              @click="$router.push('/collect')"
            /> </van-col
          ><van-col span="8">
            <van-icon
              name="chat-o"
              size="30px"
              @click="$router.push('/message')"
            />
          </van-col>
        </van-row>
        <van-row gutter="20">
          <van-col span="8">
            <span style="font-size: 14px; margin-top: 5px">资料</span> </van-col
          ><van-col span="8">
            <span style="font-size: 14px; margin-top: 5px">收藏</span> </van-col
          ><van-col span="8">
            <span style="font-size: 14px; margin-top: 5px">消息</span>
          </van-col>
        </van-row>
      </div>
      <div style="height: 20px"></div>
    </div>
    <div>
      <van-cell is-link to="person_detail" size="large">
        <template #title>
          <span style="font-size: 15px">我的资料</span>
        </template>
      </van-cell>
      <van-cell is-link to="collect" size="large">
        <template #title>
          <span style="font-size: 15px">我的收藏</span>
        </template>
      </van-cell>
      <van-cell is-link to="message" size="large">
        <template #title>
          <span style="font-size: 15px">我的消息</span>
        </template>
      </van-cell>
      <van-cell is-link to="feed" size="large">
        <template #title>
          <span style="font-size: 15px">我要反馈</span>
        </template>
      </van-cell>
      <van-cell is-link to="help" size="large">
        <template #title>
          <span style="font-size: 15px">帮助信息</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" @click="poplogin()">
        <template #title>
          <span style="font-size: 15px">退出登录</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" value="v1.01">
        <template #title>
          <span style="font-size: 15px">当前版本</span>
        </template>
      </van-cell>
    </div>
    <div style="height: 100px;"/>
  </div>
</template>
<script>
import Showtop from "@/components/line/showtop.vue";
import TopNav from "@/components/line/topNav.vue";
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store/index.js";
import Api from "@/api/Api";

export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      nc: "hjj",
      sj: "111111111111",
      dz: "学生",
      xb: "男",
      qm: "这个人很懒，什么都没写",
      ah: [{ 0: "睡觉" }],
      user: {},
    });
    const change = () => {
      router.push("/makep");
    };
    onMounted(() => {
      // state.nc = store.state.nc;
      // state.sj = store.state.sj;
      // state.dz = store.state.dz;
      // state.xb = store.state.xb;
      // state.ah = store.state.ah;
      // state.qm = store.state.qm;
      // console.log(state.ah);
      var user = JSON.parse(localStorage.getItem("user"));
      Api.getoneuser(user[0].name)
        .then((data) => {
          Object.assign(state.user, data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const poplogin = () => {
      localStorage.removeItem("user");
      location.reload();
      router.push("/");
    };
    return {
      ...toRefs(state),
      change,
      poplogin,
    };
  },

  components: {
    TopNav,
    Showtop,
  },
};
</script>
 
<style >
.me {
  background: url("@/assets/beijing.png");
  background-size: cover;
}
.zong {
  margin: 0 auto;
  padding-left: 20px;
}
.zong > li {
  margin-top: 20px;
}
.n-layout-header,
.n-layout-footer {
  padding: 24px;
}
.t1 {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin: auto;
}
</style>