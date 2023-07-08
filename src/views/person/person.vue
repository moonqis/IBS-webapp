<template>
  <div>
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <showtop Text="我的资料"></showtop>
    <div>
      <van-cell-group inset>
        <!-- 输入任意文本 -->

        <van-cell style="height: 3rem">
          <template #title>
            <div
              style="
                align-items: center;
                margin-top: 1rem;
                margin-left: 10px;
                font-size: 15px;
                font-family: 微软雅黑;
                color: #666666;
              "
            >
              头像
              <van-uploader :after-read="onRead" multiple :max-count="1">

              <van-icon
              name="edit"
              size="20px"
              style="margin-bottom: -3px; margin-left: 10px"
            />
            </van-uploader>
            </div>
          </template>
          <van-uploader :after-read="onRead" multiple :max-count="1">
            <van-image
              round
              width="1.8rem"
              height="1.8rem"
              :src="user.picurl"
              style="margin: 30px"
            />
          </van-uploader>
        </van-cell>

        <van-field
          v-model="user.name"
          label="账号"
          label-align="center"
          :readonly="true"
          right-icon="arrow"
          input-align="right"
        />
        <van-field
          v-model="user.make_name"
          label="昵称"
          label-align="center"
          :readonly="true"
          right-icon="arrow"
          input-align="right"
        />
        <van-field
          v-model="user.english_name"
          label="英文名"
          label-align="center"
          :readonly="true"
          right-icon="arrow"
          input-align="right"
        />
        <div style="display: flex">
          <van-field
            v-model="user.sex"
            label="性别"
            label-align="center"
            label-width="6.2em"
            :readonly="true"
            right-icon="arrow"
            input-align="right"
          />
        </div>
        <van-field
          v-model="user.role"
          label="角色"
          label-align="center"
          :readonly="true"
          right-icon="arrow"
          input-align="right"
        />
        <van-field
          v-model="user.address"
          label="地址"
          placeholder="选择城市"
          @click="showPicker = true"
          label-align="center"
          right-icon="arrow"
          input-align="right"
          :readonly="true"
        />

        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          v-model="user.tel"
          type="tel"
          label="手机号"
          label-align="center"
          :readonly="true"
          right-icon="arrow"
          input-align="right"
        />

        <van-cell-group inset>
          <van-field
            v-model="user.state"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            placeholder="个人描述"
            show-word-limit
            label-align="center"
            label-width="4.6em"
            :readonly="true"
            input-align="right"
          />
        </van-cell-group>
      </van-cell-group>
    </div>
    <div style="text-align: center">
      <van-button
        plain
        type="primary"
        to="person_change"
        style="width: 200px; margin-top: 50px"
        >编辑资料</van-button
      >
    </div>
    <div style="height: 100px"></div>

  </div>
</template>
  
  <script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { showToast } from "vant";
import topNav from "@/components/line/topNav.vue";
import showtop from "@/components/line/showtop.vue";
import Api from "@/api/Api";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    topNav,
    showtop,
  },
  setup() {
    const state = reactive({
      user: {
        name: "1",
        make_name: "11",
        english_name: "111",
        role: "",
        tel: "",
        address: "11",
        state: "",
        sex: "男",
      },
      value: [],
    });
    const format = new FormData();

    onMounted(() => {
      var user = JSON.parse(localStorage.getItem("user"));
      // console.log(user[0])
      Api.getoneuser(user[0].name)
        .then((data) => {
          Object.assign(state.user, data[0]);
          console.log(state.user)
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const onRead = (file) => {
       console.log(file)
      format.append("avatar", file.file);
      format.append("id", state.user.id);
      console.log(format.get('id'))
      console.log(format.get('avatar'))

      setTimeout(() => {
        if (format.get("avatar")) {
          axios
            .post("http://localhost:3000/api/user/uploadpic", format)
            .then((data) => {
              if (data.message == "创建出错") {
                console.log("创建出错");
              } else {
                console.log("提交成功");
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
        }
      },1000);
    };

    const cancel = () => {};
    const confirm = (event) => {};

    return {
      ...toRefs(state),
      cancel,
      confirm,
      onRead,
    };
  },
};
</script>
  
  <style lang="less" scoped>
</style>
