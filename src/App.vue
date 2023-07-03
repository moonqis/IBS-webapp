<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
    <top-nav v-if="isdisplay" style="position: fixed; bottom: 0px"></top-nav>
    <!-- <van-sticky v-if="isdisplay" :offset-bottom="0" position="bottom">
      <top-nav></top-nav>
    </van-sticky> -->
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";
import topNav from "./components/line/topNav.vue";
import router from "./router";
export default {
  components: { topNav },
  setup() {
    const state = reactive({
      isdisplay: true,
      user: {},
    });

    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        //要执行的方法
        console.log(toPath, "toPath");
        if (toPath == "/login" || toPath == "/res" || toPath == "/food") {
          state.isdisplay = false;
        } else {
          state.isdisplay = true;
        }
      },
      { immediate: true, deep: true }
    );
    onMounted(() => {
      document.addEventListener("plusready", function () {
        var webview = plus.webview.currentWebview();
       plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
            if (e.canBack) {
              webview.back();
              // webview.close(-1); //返回上一页
            } else {
              //webview.close(); //hide,quit
              //plus.runtime.quit();
              //首页返回键处理
              //处理逻辑：1秒内，连续两次按返回键，则退出应用；
              var first = null;
              plus.key.addEventListener(
                "backbutton",
                function () {
                  //首次按键，提示‘再按一次退出应用’
                  if (!first) {
                    first = new Date().getTime();
                    this.$toast({ message: "再按一次退出应用" });
                    setTimeout(function () {
                      first = null;
                    }, 1000);
                  } else {
                    if (new Date().getTime() - first < 1500) {
                      webview.close();
                    }
                  }
                },
                false
              );
            }
          });
        });
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑";
}
.icon {
  width: 0.3rem;
  height: 0.3rem;
  /* vertical-align: -0.15rem; */
  fill: currentColor;
  overflow: hidden;
}

a {
  color: #333;
  text-decoration: none;
}
.slide-fade {
  position: fixed;
  left: 0;
  right: 0;
  width: 80%;
  background-color: white;
}
// .slide-fade {  `
//   position: fixed;
//   left: 0;
//   right: 0;
//   width: 80%;
//   background-color: white;
// }
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  top: 0;
  right: 0;
  position: absolute;
  transform: translateX(-100px) scale(0.5);
  opacity: 1;
}
// .slide-fade-leave-to {
//   left: 0;
//   top: 0;
//   right: 0;
//   position: absolute;
//   transform: translateX(-100px) translateY(-4px) rotate(-10deg) scale(0.5);
//   opacity: 1;
// }
.slide-fade-enter-active {
  background-color: white;
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.7s ease;
  background-color: white;
  transform: translateX(400px) scale(0.8);
  z-index: 100;
}
/* .fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter {
  transform: translateX(100%);
  opacity: 0.5;
}
.fade-leave-to {
  transform: translateX(-50%);
    opacity: 0;

} */
</style>
