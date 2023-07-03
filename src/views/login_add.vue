<template>
  <div class="login-bg">
    <div class="login-contain">
      <div class="login-header">
        <p>欢迎登录</p>
      </div>
      <div class="form-group">
        <div class="form-item">
          <label for="username">
            <img src="../assets/img/user.png" />
          </label>
          <input
            v-model="user.name"
            id="username"
            type="text"
            placeholder="请输入账号"
            autocomplete="new-password"
          />
        </div>
        <div class="form-item">
          <label for="password">
            <img src="../assets/img/password.png" alt="" />
          </label>
          <input
            v-model="user.password"
            id="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
          />
        </div>
        <div class="form-item">
          <label for="password">
            <img src="../assets/img/password.png" alt="" />
          </label>
          <input
            v-model="user.password1"
            id="password1"
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
          />
        </div>
      </div>
    </div>
    <div class="button-group">
      <button @click="$router.push('/login')" class="login-btn" id="doLogin">
        去登录
      </button>
      <button @click="loginEvent" class="login-btn" id="doLogin">注册</button>
    </div>
    <van-notify v-model:show="show" type="warning">
      <van-icon name="bell" style="margin-right: 4px" />
      <span>{{ text }}</span>
    </van-notify>
    <van-notify v-model:show="show1" type="success">
      <van-icon name="bell" style="margin-right: 4px" />
      <span>{{ text }}</span>
    </van-notify>
  </div>
</template>
  
  <script>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store/index.js";
import Api from "@/api/Api";
// import { showToast } from 'vant';

export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      user: {
        name: "",
        password: "",
        password1: "",
        picurl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        role: "用户",
        food_collect1: [0],
        food_collect: "",
        sex: "",
        address: "",
        tel: "",
        state: "",
        create_date: "",
      },
      formLabelWidth: "110px",
      getuser: {},
    });
    const loginEvent = () => {
    //   state.user.food_collect = JSON.stringify(food_collect1);

      if (state.user.name && state.user.password && state.user.password) {
        if (state.user.password == state.user.password1) {
          Api.getoneuser(state.user.name)
            .then((data) => {
              console.log(data);

              if (data.length > 0) {
                text.value = "账号已存在";
                show.value = true;
                setTimeout(() => {
                  show.value = false;
                }, 1000);
              } else {
                state.user.create_date = new Date();

                Api.createuser(state.user)
                  .then((data) => {
                    text.value = "注册成功";
                    show1.value = true;
                    setTimeout(() => {
                      show.value = false;
                      router.push("/login");
                    }, 1000);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          text.value = "密码输入不一致";
          show.value = true;
          setTimeout(() => {
            show.value = false;
          }, 1000);
        }
      } else {
        text.value = "请输入账号密码";
        show.value = true;
        setTimeout(() => {
          show.value = false;
        }, 1000);
      }
    };
    const show = ref(false);
    const show1 = ref(false);

    const text = ref("错误信息");

    return {
      ...toRefs(state),
      loginEvent,
      router,
      show,
      text,
      show1,
    };
  },
};
</script>
  
  
  <style lang="less" scoped>
a,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
}
.login-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 10000;
  background: rgb(127, 215, 206);
  color: #ffffff;
  background-size: 100% 100%;
}
.login-contain {
  width: 85%;
  margin: 0 auto;
}
.login-header {
  margin-top: 100px;

  padding: 5%;
}
.login-header p {
  font-size: 32px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: 0.1em 0.15em 0.1em #74c3ca;
}
.login-logo {
  padding: 5%;
}
.login-logo img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.login-logo p {
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 2%;
}
.form-group {
  padding: 5%;
}
.form-group .form-item {
  margin-top: 5%;
  padding: 0 10px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.1);
}
.form-group .form-item input {
  outline: none;
  border: 0;
  background-color: transparent !important;
  color: #ffffff;
  height: 40px;
  font-size: 18px;
  width: 55%;
  margin-left: 12%;
}

.form-group .form-item input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ffffff;
  font-size: 16px;
}
.form-group .form-item input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ffffff;
  font-size: 16px;
}
.form-group .form-item input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ffffff;
  font-size: 16px;
}
.form-group .form-item input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ffffff;
  font-size: 16px;
}
.form-group .form-item label img {
  width: 25px;
  position: absolute;
  margin-top: 5px;
}
.form-group .form-item button {
  outline: none;
  background: transparent;
  border: 1px #00cc99 dashed;
  color: #ffffff;
  height: 30px;
  border-radius: 5px;
  float: right;
  padding: 1%;
}
.button-group {
  padding: 5%;
}
.button-group button {
  outline: none;
  border: 0;
  width: 90%;
  height: 35px;
  margin-top: 4%;
  border-radius: 20px;
  margin-left: 4%;
  color: #ffffff;
  font-size: 18px;
}
.button-group .login-btn {
  background-color: #ffffff;
  color: #74c3ca;
}
</style>