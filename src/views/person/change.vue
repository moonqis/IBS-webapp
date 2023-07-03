<template>
  <div>
    <!-- <top-nav style="position: absolute; bottom: 0px"></top-nav> -->
    <showtop Text="编辑资料"></showtop>
    <div>
      <van-cell-group inset>
        <!-- 输入任意文本 -->
        <van-field v-model="user.name" label="账号" label-align="center" />
        <van-field v-model="user.make_name" label="昵称" label-align="center" />
        <van-field
          v-model="user.english_name"
          label="英文名"
          label-align="center"
        />
        <div style="display: flex">
          <van-field
            v-model="user.english_name"
            label="英文名"
            label-align="center"
            label-width="6.2em"
            style="max-width: 6.3em"
          />
          <van-radio-group
            v-model="user.sex"
            direction="horizontal"
            style="margin-left: 30px"
          >
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </div>
        <van-field
          v-model="user.address"
          is-link
          readonly
          label="地址"
          placeholder="选择城市"
          @click="showPicker = true"
          label-align="center"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-area
            v-model="value"
            title="选择地址"
            :area-list="areaList"
            @confirm="confirm"
            @cancel="cancel"
          />
        </van-popup>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          v-model="user.tel"
          type="tel"
          label="手机号"
          label-align="center"
        />

        <van-cell-group inset>
          <van-field
            v-model="user.state"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
            label-align="center"
            label-width="4.9em"
          />
        </van-cell-group>
      </van-cell-group>
    </div>
    <div style="text-align: center">
      <van-button
        plain
        type="primary"
        style="width: 200px; margin-top: 50px"
        @click="getdia()"
        >确认修改</van-button
      >
    </div>
    <van-dialog v-model:show="show" title=" " @confirm="Update" confirmButtonColor="#5493e9">
        <div style="text-align: center;margin: 20px;font-size: 17px;margin-bottom: 25px;">
        是否确认更新资料</div>
    </van-dialog>
    <van-dialog v-model:show="show1" title=" ">
        <div style="text-align: center;margin: 20px;font-size: 17px;margin-bottom: 25px;">
        请修改之后再提交</div>
    </van-dialog>
    <div style="height: 100px"></div>

  </div>
</template>
    
    <script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { showToast } from "vant";
import topNav from "@/components/line/topNav.vue";
import showtop from "@/components/line/showtop.vue";
import { areaList } from "@vant/area-data";
import Api from "@/api/Api";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  components: {
    topNav,
    showtop,
  },
  setup() {
    const router = useRouter();

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
        id: 1,
      },
      value: [],
    });
    let showPicker = ref(false);

    const cancel = () => {
      showPicker.value = false;
    };
    const confirm = (event) => {
      for (var i = 0; i < event.length; i++) {
        state.value.push(event[i].name);
      }
      var address = state.value.join("/");
      setTimeout(() => {
        state.value = [];
        state.user.address = address;
        showPicker.value = false;
      }, 20);
    };
    const show = ref(false);
    const show1 = ref(false);

    const getdia = () => {
      show.value = true;
    };
    const Update = () => {
      Api.updateuser(state.user)
        .then((data) => {
          if (data.message == "更新成功") {
            show.value = false;
          }
          console.log(data);
          router.push('/person')
        })
        .catch((err) => {
          console.log(err);
        //   showToast('提示内容');
        show1.value=true
        setTimeout(()=>{
            show1.value=false
        },1500)

        });
    };
    return {
      ...toRefs(state),
      areaList,
      showPicker,
      cancel,
      confirm,
      Update,
      show,
      show1,
      getdia,
    };
  },
};
</script>
    
    <style lang="less" scoped>
</style>