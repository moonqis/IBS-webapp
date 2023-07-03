<template>
  <div style="background-color: white">
    <top-nav style="position: fixed; bottom: 0px"></top-nav>

    <showtop Text="食物列表"></showtop>
    <!-- 菜单左右联动 -->
    <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
    <van-sticky offset-top="7.9vh">
      <van-dropdown-menu active-color="#5493e9" style="z-index: 999">
        <van-dropdown-item
          v-model="value2"
          :options="option2"
          @change="change1"
          style="z-index: 999"
        />
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          @change="change"
          style="z-index: 999"
        />
      </van-dropdown-menu>
    </van-sticky>

    <div class="menu_detail">
      <!-- 左侧菜单 -->
      <van-sticky offset-top="15.5vh" style="z-index: 9">
        <div class="menu_list" style="z-index: 9">
          <van-sidebar v-model="tabValue" @change="onChange" style="z-index: 9">
            <van-sidebar-item
              :title="menuList[0].name"
              @click="handleMenulist(menuList[0].name)"
            />
            <van-sidebar-item
              :title="menuList[1].name"
              @click="handleMenulist(menuList[1].name)"
            />
            <van-sidebar-item
              :title="menuList[2].name"
              @click="handleMenulist(menuList[2].name)"
            />
            <van-sidebar-item
              :title="menuList[3].name"
              @click="handleMenulist(menuList[3].name)"
            />
            <van-sidebar-item
              :title="menuList[4].name"
              @click="handleMenulist(menuList[4].name)"
            />
            <van-sidebar-item
              :title="menuList[5].name"
              @click="handleMenulist(menuList[5].name)"
            />
            <van-sidebar-item
              :title="menuList[6].name"
              @click="handleMenulist(menuList[6].name)"
            />
            <van-sidebar-item
              :title="menuList[7].name"
              @click="handleMenulist(menuList[7].name)"
            />
            <van-sidebar-item
              :title="menuList[8].name"
              @click="handleMenulist(menuList[8].name)"
            />
            <van-sidebar-item
              :title="menuList[9].name"
              @click="handleMenulist(menuList[9].name)"
            />
            <van-sidebar-item
              :title="menuList[10].name"
              @click="handleMenulist(menuList[10].name)"
            />
            <van-sidebar-item
              :title="menuList[11].name"
              @click="handleMenulist(menuList[11].name)"
            />

            <div
              style="
                height: 100px;
                background-color: var(--van-sidebar-background-color);
              "
            ></div>
          </van-sidebar>
        </div>
      </van-sticky>
      <!-- 右侧菜单 -->
      <div style="margin-left: 5px">
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
            <van-swipe-cell @open="opencell(list.id.toString())">
              <div style="display: flex; margin-top: 15px">
                <div>
                  <van-icon
                  v-if="!user.food_c.includes(list.id.toString())"
                    style="
                      position: absolute;
                      top: 35px;
                      left: 38px;
                      margin: 10px;
                      color: rgb(247, 33, 4);
                    "
                    name="like-o"
                    @click="addcollect1(list.id.toString())"
                  />
                  <van-icon
                  v-else
                    style="
                      position: absolute;
                      top: 35px;
                      left: 38px;
                      margin: 10px;
                      color: rgb(247, 33, 4);
                    "
                    name="like"
                    @click="deletecollect1(list.id.toString())"
                  />
                </div>
                <img :src="list.picurl" style="width: 60px;height: 54px; margin: 5px" />
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
                    style="display: flex; margin-top: 2px; align-items: center"
                  >
                    <div
                      v-if="
                        list.detail_weight1 != '' && list.detail_weight1 != null
                      "
                      style="
                        display: flex;
                        align-items: center;
                        width: 55px;
                        font-size: 13px;
                      "
                    >
                      <div
                        v-if="list.detail_resource1 == '健康'"
                        style="
                          background-color: lightgreen;
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      <div
                        v-else-if="list.detail_resource1 == '轻微超量'"
                        style="
                          background-color: rgb(255, 170, 0);
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      <div
                        v-else-if="list.detail_resource1 == '严重超量'"
                        style="
                          background-color: red;
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      {{ list.detail_weight1 }}g
                    </div>
                    <div v-else style="height: 12px"></div>
                    <div
                      v-if="
                        list.detail_weight2 != '' && list.detail_weight3 != null
                      "
                      style="
                        display: flex;
                        align-items: center;
                        width: 55px;
                        font-size: 13px;
                      "
                    >
                      <div
                        v-if="list.detail_resource2 == '健康'"
                        style="
                          background-color: lightgreen;
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      <div
                        v-else-if="list.detail_resource2 == '轻微超量'"
                        style="
                          background-color: rgb(255, 170, 0);
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      <div
                        v-else-if="list.detail_resource2 == '严重超量'"
                        style="
                          background-color: red;
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      {{ list.detail_weight2 }}g
                    </div>
                    <div v-else style="height: 12px"></div>
                    <div
                      v-if="
                        list.detail_weight3 != '' && list.detail_weight3 != null
                      "
                      style="
                        display: flex;
                        align-items: center;
                        width: 55px;
                        font-size: 13px;
                      "
                    >
                      <div
                        v-if="list.detail_resource3 == '健康'"
                        style="
                          background-color: lightgreen;
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      <div
                        v-else-if="list.detail_resource3 == '轻微超量'"
                        style="
                          background-color: rgb(255, 170, 0);
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      <div
                        v-else-if="list.detail_resource3 == '严重超量'"
                        style="
                          background-color: red;
                          width: 12px;
                          height: 12px;
                          border-radius: 6px;
                          margin-right: 5px;
                        "
                      ></div>
                      {{ list.detail_weight3 }}g
                    </div>
                    <div v-else style="height: 12px"></div>
                  </div>
                </div>
                <div style="display: inline-block; float: right">
                  <div
                    v-if="list.addlist.includes('严重超量')"
                    style="
                      background-color: red;
                      width: 24px;
                      height: 24px;
                      border-radius: 12px;
                      margin-right: 10px;
                      margin-top: 10px;
                    "
                  ></div>
                  <div
                    v-else-if="
                      !list.addlist.includes('严重超量') &&
                      list.addlist.includes('轻微超量')
                    "
                    style="
                      background-color: rgb(255, 170, 0);
                      width: 24px;
                      height: 24px;
                      border-radius: 12px;
                      margin-right: 10px;
                      margin-top: 10px;
                    "
                  ></div>
                  <div
                    v-else
                    style="
                      background-color: lightgreen;
                      width: 24px;
                      height: 24px;
                      border-radius: 12px;
                      margin-right: 10px;
                      margin-top: 10px;
                    "
                  ></div>
                </div>
              </div>
              <template #right>
                <van-button
                  style="float: right; height: 100%"
                  square
                  :type="type"
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
    <div style="height: 50px"></div>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import Showtop from "@/components/line/showtop.vue";
import TopNav from "@/components/line/topNav.vue";
import Foodlist from "@/components/food/foodlist.vue";
import Api from "@/api/Api";
import store from "@/store";
export default {
  components: { Showtop, TopNav, Foodlist },
  setup() {
    const router = useRouter();
    const state = reactive({
      tabValue: 0,
      list: [],
      list1: [],
      loading: false,
      finished: false,
      menuList: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      user: {
        food_c: [],
      },
      buttontext: "待收藏",
      type: "primary",
    });
    const onChange = (index) => {
      // console.log(index + 1);
    };
    onMounted(() => {
      Api.findallfood()
        .then((data) => {
          Object.assign(state.menuList, data);
          console.log(state.menuList);
          for (var key in state.menuList) {
          if (state.menuList[key].name == store.state.index) {
            state.tabValue = state.menuList[key].id - 1;
            console.log(state.tabValue);

          }
        }
        })
        .catch((err) => {
          console.log(err);
        });

        setTimeout(() => {
          Api.getonesort(store.state.index)
            .then((data) => {
              Object.assign(state.list, data.rows);
              Object.assign(state.list1, data.rows);
              for (var i = 0; i < state.list1.length; i++) {
                state.list1[i].addlist = [];

                if (
                  state.list1[i].detail_weight1 != "" &&
                  state.list1[i].detail_weight1 != null
                ) {
                  state.list1[i].addlist.push(state.list1[i].detail_resource1);
                }
                if (
                  state.list1[i].detail_weight2 != "" &&
                  state.list1[i].detail_weight2 != null
                ) {
                  state.list1[i].addlist.push(state.list1[i].detail_resource2);
                }
                if (
                  state.list1[i].detail_weight3 != "" &&
                  state.list1[i].detail_weight3 != null
                ) {
                  state.list1[i].addlist.push(state.list1[i].detail_resource3);
                }
              }

              console.log(state.list, state.tabValue);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 10);
        setTimeout(() => {
          console.log(state.list1, 1);
        }, 1000);
      var user = JSON.parse(localStorage.getItem("user"));
      Api.getoneuser(user[0].name)
        .then((data) => {
          Object.assign(state.user, data[0]);
          setTimeout(() => {
            state.user.food_c = data[0].food_collect.split(",");
            console.log(state.user);
          }, 20);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    let menuvalue = "";
    //左侧菜单点击联动you侧
    const handleMenulist = (index) => {
      menuvalue = index;
      state.list = [];
      console.log(index);
      value1.value = 0;
      value2.value = "a";
      Api.getonesort(index).then((data) => {
        state.list = data.rows;
        state.list1 = data.rows;

        for (var i = 0; i < state.list1.length; i++) {
          state.list1[i].addlist = [];

          if (
            state.list1[i].detail_weight1 != "" &&
            state.list1[i].detail_weight1 != null
          ) {
            state.list1[i].addlist.push(state.list1[i].detail_resource1);
          }
          if (
            state.list1[i].detail_weight2 != "" &&
            state.list1[i].detail_weight2 != null
          ) {
            state.list1[i].addlist.push(state.list1[i].detail_resource2);
          }
          if (
            state.list1[i].detail_weight3 != "" &&
            state.list1[i].detail_weight3 != null
          ) {
            state.list1[i].addlist.push(state.list1[i].detail_resource3);
          }
        }
      });
      setTimeout(() => {
        console.log(state.list, 1);
      }, 1000);

      console.log(state.tabValue);
    };

    const onLoad = () => {
      // 异步更新数据
    };
    const addcollect1=(val)=>{
      state.user.food_c.push(val);
      state.user.food_collect = state.user.food_c.join(",");
        console.log(state.user);

        Api.updateuser(state.user)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
    }
    const deletecollect1=(val)=>{
      state.user.food_c.splice(state.user.food_c.indexOf(val), 1);
      state.user.food_collect = state.user.food_c.join(",");
        console.log(state.user);

        Api.updateuser(state.user)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
    }
    const addcollect = (val) => {
      console.log(val);
      if (state.buttontext == "待收藏") {
        state.user.food_c.push(val);
      } else if (state.buttontext == "已收藏") {
        state.user.food_c.splice(state.user.food_c.indexOf(val), 1);
      }
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
    const opencell = (val) => {
      if (state.user.food_c.includes(val)) {
        state.buttontext = "已收藏";
        state.type = "danger";
      } else {
        state.buttontext = "待收藏";
        state.type = "primary";
      }
    };

    const loading = ref(false);
    const onRefresh = () => {
      state.list = [];
      Api.getonesort(menuvalue)
        .then((data) => {
          Object.assign(state.list, data.rows);
          Object.assign(state.list1, data.rows);
          console.log(state.list, 1);
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        // showToast('刷新成功');
        loading.value = false;
      }, 1000);
    };
    //筛选
    const value1 = ref(0);
    const value2 = ref("a");
    const option1 = [
      { text: "全部", value: 0 },
      { text: "放心吃", value: 1 },
      { text: "谨慎吃", value: 2 },
    ];
    const option2 = [
      { text: "默认排序", value: "a" },
      { text: "食物名称", value: "b" },
      { text: "倒序排序", value: "c" },
    ];
    const Searchss = (listss) => {
      return (listss = listss.filter((item) => {
        return (
          !item.addlist.includes("严重超量") &&
          !item.addlist.includes("轻微超量")
        );
      }));
    };
    const Searchs = (listss) => {
      return (listss = listss.filter((item) => {
        return (
          !item.addlist.includes("健康") && !item.addlist.includes("轻微超量")
        );
      }));
    };
    const change = (value) => {
      if (value == 0) state.list = state.list1;
      else if (value == 1) state.list = Searchss(state.list1);
      else if (value == 2) state.list = Searchs(state.list1);
    };
    const change1 = (value) => {
      let lists = state.list;
      if (value == "a") state.list = sortKeyT(lists, "id");
      else if (value == "b") state.list = sortKeyT(lists, "name");
      else if (value == "c") state.list = sortKeyF(lists, "id");
    };
    //排序
    function sortKeyF(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x > y ? -1 : x < y ? 1 : 0;
      });
    }
    function sortKeyT(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    return {
      ...toRefs(state),
      handleMenulist,
      onChange,
      onLoad,
      addcollect,
      opencell,
      loading,
      onRefresh,
      value1,
      value2,
      option1,
      option2,
      change,
      change1,
      deletecollect1,
      addcollect1
    };
  },
};
</script>
<style>
.menu_detail {
  height: calc(100vh - 140px);
  display: flex;
}

.menu_list {
  display: flex;
  width: auto;
  height: 100%;
  background-color: var(--van-gray-0);
}

/* 选中标签三角标识 */
.van-sidebar-item--select:before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 10px solid #3adbde;
  border-bottom: 5px solid transparent;
  -webkit-transform: translateY(-50%);
  background-color: #fff;
  transform: translateY(-50%);
  content: "";
}
</style>
