<template>
  <div style="background-color: white">
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <showtop Text="发现"></showtop>
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
      </form>
      <span style="display: flex; color: rgb(140, 140, 140); margin-left: 10px"
        >历史记录
        <div v-if="historyList.length > 0">
          <div
            style="color: rgb(140, 140, 140); margin-left: 150px"
            @click="empty()"
          >
            <van-icon name="delete-o" />
            <span style="font-size: 14px">清空记录</span>
          </div>
        </div>
        <div v-else></div
      ></span>
      <div style="display: flex; margin: 2.5%; width: 95%; flex-wrap: wrap">
        <div
          v-for="(item, index) in historyList"
          :key="index"
          @click="goSearchDetail(item)"
        >
          <van-tag
            size="large"
            type="primary"
            plain
            color="rgb(140, 140, 140)"
            style="margin-right: 10px; margin-bottom: 5px; margin-top: 5px"
          >
            {{ item }}
          </van-tag>
        </div>
      </div>

      <van-dropdown-menu active-color="#5493e9">
        <van-dropdown-item v-model="value1" :options="menulist1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <div style="margin-top: 20px">
      <div v-if="search_list.length > 0" style="margin-top: 1rem">
        <span style="color: rgb(140, 140, 140); margin-left: 10px"
          >识别结果</span
        >
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
      <div v-if="search_list.length <= 0 && ifloading" style="margin-top: 2rem">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </div>

    <div style="height: 100px"></div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import Showtop from "@/components/line/showtop.vue";
import TopNav from "@/components/line/topNav.vue";
import Api from "@/api/Api";
import store from "@/store";
import axios from "axios";

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
      search_list: [],
      ifloading: false,
      menulist1:[]
    });
    const value1 = ref(0);
    const value2 = ref("a");
    const option1 = [{ text: "全部种类", value: 0 }];
    const option2 = [
      { text: "默认排序", value: "a" },
      { text: "食物名称", value: "b" },
      { text: "倒序排序", value: "c" },
    ];

    onMounted(() => {
      Api.findallfood()
        .then((data) => {
          Object.assign(state.menuList, data);
          console.log(state.menuList);
          setTimeout(() => {
        for (var i = 0; i < state.menuList.length; i++) {
          state.menulist1.push({ text: state.menuList[i].name, value: i+1 });
        }
        state.menulist1.push({ text: "全部种类", value: 0 });
      }, 100);
        })
        .catch((err) => {
          console.log(err);
        });

      Api.getonesort("")
        .then((data) => {
          Object.assign(state.FoodList, data.rows);
          console.log(state.FoodList);
        })
        .catch((err) => {
          console.log(err);
        });
      
    });
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
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      state.ifloading = true;
      let postObject = {};
      console.log(file);
      compress(file.content, 2, function (base64) {
        console.log(base64);
        postObject.image=base64
      });
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
              if (item.probability > 0.3 && item.name != "非菜") {
                state.search_list.push(item);
              }
            });
            data.ingredient.result.forEach((item, index, arr) => {
              if (item.score > 0.3 && item.name != "非果蔬食材") {
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
        store.state.search = val.name;
        console.log(store.state.search);
        //跳转到搜索结果页
        router.push({
          path: "/search_detail",
        });
      }
    };
    return {
      ...toRefs(state),
      value,
      onSearch,
      onCancel,
      value1,
      value2,
      option1,
      option2,
      afterRead,
      goSearchImg,
    };
  },
  data() {
    return {
      search_val: "", //搜索的内容
      historyList: [], //历史搜索记录，存本地
      token:
        "24.87a96c87e2bf20528718c0f8e1c52a58.2592000.1684391184.282335-32543178",
      data: "",
      picPath: "",
    };
  },
  mounted() {
    //如果本地存储的数据historyList有值，直接赋值给data中的historyList
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
    }
  },
  methods: {
    // 搜索
    get_search() {
      if (this.search_val == "") {
        this.$toast("请输入搜索内容");
        return false;
      } else {
        // 没有搜索记录，把搜索值push进数组首位，存入本地
        if (!this.historyList.includes(this.search_val)) {
          this.historyList.unshift(this.search_val);
          if (this.historyList.length > 11) {
            this.historyList.pop();
            localStorage.setItem(
              "historyList",
              JSON.stringify(this.historyList)
            );
          } else
            localStorage.setItem(
              "historyList",
              JSON.stringify(this.historyList)
            );
        } else {
          //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
          let i = this.historyList.indexOf(this.search_val);
          this.historyList.splice(i, 1);
          this.historyList.unshift(this.search_val);
          if (this.historyList.length > 11) {
            this.historyList.pop();
            localStorage.setItem(
              "historyList",
              JSON.stringify(this.historyList)
            );
          } else
            localStorage.setItem(
              "historyList",
              JSON.stringify(this.historyList)
            );
        }
        this.$store.state.search = this.search_val;
        console.log(this.$store.state.search);
        //跳转到搜索结果页
        this.$router.push({
          path: "/search_detail",
        });
      }
    },

    //点击历史搜索，跳转搜索结果页
    goSearchDetail(title) {
      this.$store.state.search = title;
      console.log(this.$store.state.search);
      this.$router.push({
        path: "/search_detail",
      });
    },

    //清空历史搜索记录
    empty() {
      this.$toast.success("清空历史搜索成功");
      localStorage.removeItem("historyList");
      this.historyList = [];
    },
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
