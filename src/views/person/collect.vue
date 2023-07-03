<template>
  <div>
    <showtop Text="我的收藏"></showtop>
    <div class="me" style="height: auto; width: 100%">
      <div style="height: auto; display: flex">
        <van-image
          round
          width="1.8rem"
          height="1.8rem"
          :src="user.picurl"
          style="margin-inline: 30px;margin-top: 15px;"
        />
        <div style="display: flex; flex-direction: column; margin-top: 5vh">
          <div style="align-items: center; margin-top: 15px; margin-left: 10px">
            <span style="font-size: 17px; color: aliceblue">{{
              user.make_name
            }}</span>
          </div>
        </div>
      </div>

      <div style="height: 15px"></div>
    </div>
    <div>
      <div
        style="
          display: flex;
          width: 7.5rem;
          padding: 0 0.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 1rem;
        "
      >
        <div style="font-size: 0.4rem; font-weight: 600; margin-top: 20px">
          我的收藏
        </div>
        <div
          v-if="list.length == 0"
          style="
            width: 100%;
            align-items: center;
            text-align: center;
            margin-top: 50px;
            color: darkgray;
          "
        >
          <div>暂无收藏</div>
        </div>

        <div v-else style="margin-left: 5px">
          <van-list
            v-model="loading"
            :finished="finished"
            loading-text="加载中，请稍等"
            finished-text="没有更多了"
            @load="onLoad"
            error-text="加载错误了"
            :immediate-check="true"
          >
            <van-form v-for="list in list" :key="list.id" v-lazy="list">
              <van-swipe-cell>
                <div style="display: flex; margin-top: 15px">
                  <img :src="list.picurl" style="width: 60px; margin: 5px" />
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      margin-left: 5px;
                    "
                  >
                    <span
                      class="van-ellipsis"
                      style="
                        font-size: 16px;
                        font-weight: 500;
                        margin-top: 2px;
                        max-width: 3rem;
                      "
                    >
                      {{ list.name }}
                    </span>
                    <span
                    class="van-ellipsis"
                    style="
                      font-size: 12px;
                      margin-top: 3px;
                      width: 3.5rem;
                      color: rgba(0, 0, 0, 0.5);
                      "
                    >
                      {{ list.english_name }}
                    </span>
                    <div
                      style="
                        display: flex;
                        margin-top: 2px;
                        align-items: center;
                      "
                    >
                      <div
                      v-if="list.detail_weight1 != '' && list.detail_weight1 != null"
                        style="display: flex; align-items: center; width: 60px;font-size: 13px;"
                      >
                        <div
                          v-if="list.detail_resource1 == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource1 == '轻微超量'"
                          style="
                            background-color: rgb(255, 170, 0);
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource1 == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.detail_weight1 }}g
                      </div>
                      <div v-else style="height: 12px"></div>
                      <div
                      v-if="list.detail_weight2 != '' && list.detail_weight2 != null"
                        style="display: flex; align-items: center; width: 60px;font-size: 13px;"
                      >
                        <div
                          v-if="list.detail_resource2 == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource2 == '轻微超量'"
                          style="
                            background-color: rgb(255, 170, 0);
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource2 == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.detail_weight2 }}g
                      </div>
                      <div v-else style="height: 12px"></div>
                      <div
                      v-if="list.detail_weight3 != '' && list.detail_weight3 != null"
                        style="display: flex; align-items: center; width: 60px;font-size: 13px;"
                      >
                        <div
                          v-if="list.detail_resource3 == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource3 == '轻微超量'"
                          style="
                            background-color: rgb(255, 170, 0);
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource3 == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.detail_weight3 }}g
                      </div>
                      <div v-else style="height: 12px"></div>
                    </div>
                  </div>
                </div>
                <template #right>
                  <van-button
                    style="float: right; height: 100%"
                    square
                    type="danger"
                    :text="buttontext"
                    @click="addcollect(list.id.toString())"
                  />
                </template>
              </van-swipe-cell>
            </van-form>
          </van-list>
          <div style="height: 100px"></div>

        </div>
      </div>
    </div>
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
      list: [],
      loading: false,
      finished: false,
      user: {
        food_c: [],
      },
      buttontext: "删除",
    });
    onMounted(() => {
      var user = JSON.parse(localStorage.getItem("user"));
      Api.getoneuser(user[0].name)
        .then((data) => {
          Object.assign(state.user, data[0]);
          state.user.food_c = data[0].food_collect.split(",");
          for (var i = 0; i < data[0].food_collect.split(",").length; i++) {
            if (data[0].food_collect.split(",")[i] != "")
              Api.getonefood(data[0].food_collect.split(",")[i])
                .then((data) => {
                  state.list.push(data);
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const onLoad = () => {};
    const opencell = (val) => {
      state.buttontext = "删除";
    };
    const addcollect = (val) => {
      console.log(val);
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id == val) {
          //目前主键和想要删除的主键对比
          state.list.splice(i, 1);
        }
      }
      state.user.food_c.splice(state.user.food_c.indexOf(val), 1);
      setTimeout(() => {
        state.user.food_collect = state.user.food_c.join(",");
        console.log(state.user);

        Api.updateuser(state.user)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
      }, 100);
    };
    return {
      ...toRefs(state),
      onLoad,
      opencell,
      addcollect,
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