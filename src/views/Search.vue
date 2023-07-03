<template>
  <div style="background-color: white">
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <showtop Text="搜索"></showtop>
    <div>
      <form action="/">
        <van-search
          v-model="search_val"
          show-action
          placeholder="请输入搜索关键词"
          @search="get_search"
        >
          <template #action>
            <van-uploader :after-read="afterRead">
              <img
                src="@/assets/相机_o.png"
                style="width: 30px; margin-top: 8px"
                @click="clickFile"
              />
            </van-uploader>
          </template>
        </van-search>
        <input
          class="hide_file"
          ref="leftFile"
          id="upload"
          type="file"
          @change="getFile($event)"
          accept="image/*"
        />
      </form>
      <van-dropdown-menu active-color="#5493e9">
        <van-dropdown-item
          v-model="value1"
          :options="menuList"
          @change="change"
        />
        <van-dropdown-item
          v-model="value2"
          :options="option2"
          @change="change1"
        />
      </van-dropdown-menu>
    </div>
    <div v-if="search_list.length > 0 && !ifloading" style="margin-top: 0.5rem">
      <span style="color: rgb(140, 140, 140); margin-left: 10px">识别结果</span>
      <div style="display: flex; margin: 2.5%; width: 95%; flex-wrap: wrap">
        <div
          v-for="(item, index) in search_list"
          :key="index"
          @click="goSearchImg(item)"
        >
          <van-tag
            size="large"
            type="primary"
            plain
            color="rgb(140, 140, 140)"
            style="margin-right: 10px; margin-bottom: 5px; margin-top: 5px"
          >
            {{ item.name }}
          </van-tag>
        </div>
      </div>
    </div>
    <div
      v-if="search_list.length <= 0 && ifloading"
      style="margin-bottom: 0.5rem; margin-top: 0.5rem"
    >
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <div style="margin-left: 5px">
      <van-list
        v-model="loading"
        :finished="finished"
        loading-text="加载中，请稍等"
        finished-text="没有更多了"
        error-text="加载错误了"
        :immediate-check="true"
      >
        <van-form v-for="list in tableDatass" :key="list.id" v-lazy="list">
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
              <img
                :src="list.picurl"
                style="width: 60px; height: 54px; margin: 5px"
              />
              <div
                style="display: flex; flex-direction: column; margin-left: 5px"
              >
                <span
                  class="van-ellipsis"
                  style="
                    font-size: 16px;
                    font-weight: 500;
                    margin-top: 2px;
                    width: 5rem;
                  "
                >
                  {{ list.name }}
                </span>
                <span
                  class="van-ellipsis"
                  style="
                    font-size: 12px;
                    margin-top: 3px;
                    width: 5rem;
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
                      width: 60px;
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
                      list.detail_weight2 != '' && list.detail_weight2 != null
                    "
                    style="
                      display: flex;
                      align-items: center;
                      width: 60px;
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
                      width: 60px;
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
</template>


<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import Showtop from "@/components/line/showtop.vue";
import TopNav from "@/components/line/topNav.vue";
import Api from "@/api/Api";
import store from "@/store";
export default {
  components: { Showtop, TopNav },
  setup() {
    const router = useRouter();
    const value = ref("");
    const onSearch = (val) => {
      console.log(val);
    };
    const onCancel = () => {
      console.log("取消");
    };
    const state = reactive({
      menuList: [{ text: "全部种类", value: 0 }],
      FoodList: [],
      search_val: "", //搜索的内容
      historyList: [], //历史搜索记录，存本地
      tableData: [],
      tableDatas: [],
      tableDatass: [],
      loading: false,
      finished: false,
      list: [],
      search_list: [],
      ifloading: false,
      user: {
        food_c: [],
      },
      buttontext: "待收藏",
      type: "primary",
    });

    const value1 = ref("全部种类");
    const value2 = ref("a");
    const option1 = [{ text: "全部种类", value: "全部种类" }];
    const option2 = [
      { text: "默认排序", value: "a" },
      { text: "食物名称", value: "b" },
      { text: "倒序排序", value: "c" },
    ];

    onMounted(() => {
      Api.findallfood()
        .then((data) => {
          Object.assign(state.menuList, data);
          setTimeout(() => {
            for (var i = 0; i < state.menuList.length; i++) {
              state.menuList[i].text = state.menuList[i].name;
              state.menuList[i].value = state.menuList[i].name;
            }
            state.menuList.push({ text: "全部种类", value: "全部种类" });
            console.log(state.menuList);
          }, 20);
        })
        .catch((err) => {
          console.log(err);
        });
      state.search_val = store.state.search;
      //如果本地存储的数据historyList有值，直接赋值给data中的historyList
      if (JSON.parse(localStorage.getItem("historyList"))) {
        state.historyList = JSON.parse(localStorage.getItem("historyList"));
      }
      Api.getonesort("all")
        .then((data) => {
          Object.assign(
            state.tableData,
            Searchs(data.rows, store.state.search)
          );
          Object.assign(
            state.tableDatass,
            Searchs(data.rows, store.state.search)
          );
          Object.assign(state.tableDatas, data.rows);
          console.log(state.tableData);
          console.log(state.tableDatas);
          for (var i = 0; i < state.tableData.length; i++) {
            state.tableData[i].addlist = [];

            if (
              state.tableData[i].detail_weight1 != "" &&
              state.tableData[i].detail_weight1 != null
            ) {
              state.tableData[i].addlist.push(
                state.tableData[i].detail_resource1
              );
            }
            if (
              state.tableData[i].detail_weight2 != "" &&
              state.tableData[i].detail_weight2 != null
            ) {
              state.tableData[i].addlist.push(
                state.tableData[i].detail_resource2
              );
            }
            if (
              state.tableData[i].detail_weight3 != "" &&
              state.tableData[i].detail_weight3 != null
            ) {
              state.tableData[i].addlist.push(
                state.tableData[i].detail_resource3
              );
            }
          }
          for (var i = 0; i < state.tableDatas.length; i++) {
            state.tableDatas[i].addlist = [];

            if (
              state.tableDatas[i].detail_weight1 != "" &&
              state.tableDatas[i].detail_weight1 != null
            ) {
              state.tableDatas[i].addlist.push(
                state.tableDatas[i].detail_resource1
              );
            }
            if (
              state.tableDatas[i].detail_weight2 != "" &&
              state.tableDatas[i].detail_weight2 != null
            ) {
              state.tableDatas[i].addlist.push(
                state.tableDatas[i].detail_resource2
              );
            }
            if (
              state.tableDatas[i].detail_weight3 != "" &&
              state.tableDatas[i].detail_weight3 != null
            ) {
              state.tableDatas[i].addlist.push(
                state.tableDatas[i].detail_resource3
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setTimeout(() => {
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
      }, 30);
    });
    const Searchs = (tableDatas, input) => {
      return (tableDatas = tableDatas.filter((item) => {
        if (item.name && item.english_name) {
          return (
            item.name.indexOf(input) >= 0 ||
            item.english_name.indexOf(input) >= 0
          );
        }
      }));
    };
    const Searchss = (tableDatas, input) => {
      return (tableDatas = tableDatas.filter((item) => {
        return item.sort.indexOf(input) >= 0;
      }));
    };

    const get_search = () => {
      value1.value = "全部种类";
      value2.value = "a";
      if (state.search_val != "") {
        state.tableData = Searchs(state.tableDatas, state.search_val);
        setTimeout(() => {
          state.tableDatass = state.tableData;
        }, 20);
      }

      if (state.search_val == "") {
        this.$toast("请输入搜索内容");
        return false;
      } else {
        // 没有搜索记录，把搜索值push进数组首位，存入本地
        if (!state.historyList.includes(state.search_val)) {
          state.historyList.unshift(state.search_val);
          if (state.historyList.length > 11) {
            state.historyList.pop();
            localStorage.setItem(
              "historyList",
              JSON.stringify(state.historyList)
            );
          } else
            localStorage.setItem(
              "historyList",
              JSON.stringify(state.historyList)
            );
        } else {
          //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
          let i = state.historyList.indexOf(state.search_val);
          state.historyList.splice(i, 1);
          state.historyList.unshift(state.search_val);
          if (state.historyList.length > 11) {
            state.historyList.pop();
            localStorage.setItem(
              "historyList",
              JSON.stringify(state.historyList)
            );
          } else
            localStorage.setItem(
              "historyList",
              JSON.stringify(state.historyList)
            );
        }
      }
      console.log(state.historyList);
    };
    const change = (value) => {
      if (value == "全部种类") state.tableDatass = state.tableData;
      else state.tableDatass = Searchss(state.tableData, value);
    };
    const change1 = (value) => {
      let list = state.tableDatass;
      if (value == "a") state.tableDatass = sortKeyT(list, "id");
      else if (value == "b") state.tableDatass = sortKeyT(list, "name");
      else if (value == "c") state.tableDatass = sortKeyF(list, "id");
    };
    //图片压缩
    function compress(
      base64, // 源图片
      rate, // 缩放比例
      callback // 回调
    ) {
      //处理缩放，转格式
      var _img = new Image();
      _img.src = base64;
      _img.onload = function () {
        var _canvas = document.createElement("canvas");
        var w = this.width / rate;
        var h = this.height / rate;
        _canvas.setAttribute("width", w);
        _canvas.setAttribute("height", h);
        _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        var base64 = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob(function (blob) {
          if (blob.size > 700 * 960) {
            //如果还大，继续压缩
            compress(base64, rate, callback);
          } else {
            callback(base64);
            return base64;
          }
        }, "image/jpeg");
      };
    }
    //上传图片
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      state.search_list.length = 0;
      state.ifloading = true;
      let postObject = {};
      console.log(file);
      compress(file.content, 2, function (base64) {
        console.log(base64);
        postObject.image = base64;
      });
      // postObject.imgUrl =
      //   "https://aip.bdstatic.com/portal-pc-node/dist/1591263471100/images/technology/imagerecognition/general/1.jpg";
      console.log(postObject);
      setTimeout(() => {
        Api.imgmessage(postObject).then((data) => {
          if (data) {
            console.log(data);
            data.advanced_general.result.forEach((item, index, arr) => {
              item.name = item.keyword;
              if (item.score > 0.3) {
                state.search_list.push(item);
              }
            });
            data.dishs.result.forEach((item, index, arr) => {
              item.score = item.probability;
              if (item.probability > 0.3) {
                state.search_list.push(item);
              }
            });
            data.ingredient.result.forEach((item, index, arr) => {
              if (item.score > 0.3) {
                state.search_list.push(item);
              }
            });
            setTimeout(() => {
              state.ifloading = false;
              console.log(state.search_list);
            }, 20);
          } else {
            state.ifloading = false;
          }
        });
      }, 1000);
    };
    const goSearchImg = (val) => {
      if (val.name != "非果蔬食材" && val.name != "非菜") {
        value1.value = "全部种类";
        value2.value = "a";
        state.search_val = val.name;
        if (val.name != "") {
          state.tableData = Searchs(state.tableDatas, val.name);
          setTimeout(() => {
            state.tableDatass = state.tableData;
            state.search_list.length = 0;
          }, 20);
        }
      }
    };
    // let i = ref(0);
    const onLoad = () => {
      // if (state.tableData.length > 30) {
      //   var j;
      //   for (var i = state.list.length, j = 0; j < 15; i++, j++) {
      //    state.list.push(state.tableData[i]);
      //   }
      //   // console.log(state.list);
      //   // 加载状态结束
      //   state.loading = false;
      //   // 数据全部加载完成
      //   if (state.list.length >= state.tableData.length) {
      //     state.finished = true;
      //   }
      // } else {
      //   Object.assign(state.list,state.tableData)
      //   state.loading = false;
      // }
    };

    const addcollect1 = (val) => {
      state.user.food_c.push(val);
      state.user.food_collect = state.user.food_c.join(",");
      console.log(state.user);

      Api.updateuser(state.user)
        .then((data) => {})
        .catch((err) => {
          console.log(err);
        });
    };
    const deletecollect1 = (val) => {
      state.user.food_c.splice(state.user.food_c.indexOf(val), 1);
      state.user.food_collect = state.user.food_c.join(",");
      console.log(state.user);

      Api.updateuser(state.user)
        .then((data) => {})
        .catch((err) => {
          console.log(err);
        });
    };
    //左滑收藏
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
      value,
      onSearch,
      onCancel,
      value1,
      value2,
      option1,
      option2,
      get_search,
      onLoad,
      change,
      change1,
      goSearchImg,
      afterRead,
      addcollect,
      opencell,
      deletecollect1,
      addcollect1,
    };
  },
};
</script>
<style lang="less" scoped>
.hide_file {
  display: none;
}
.camera {
  position: relative;
  z-index: 2;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 138px;
  height: 138px;
  background: #e7e7e7;
  border-radius: 6px;
  text-align: center;
  .bigImg {
    width: 138px;
    height: 138px;
  }
  .icon {
    width: 40px;
    margin-top: 40px;
  }
  .text {
    display: block;
    line-height: 22px;
    font-size: 15px;
    color: #999;
    margin-top: 8px;
  }
}
</style>