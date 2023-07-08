<template>
  <div>
    <showtop Text="反馈"></showtop>
    <!-- <top-nav style="position: fixed; bottom: 0px"></top-nav> -->

    <van-form @submit="onSubmit" v-model="feed">
      <!-- <van-cell-group inset> -->
      <van-field
        v-model="feed.title"
        name="标题"
        label="标题"
        placeholder="标题"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <!-- </van-cell-group> -->
      <!-- <van-cell-group inset> -->
      <van-field
        v-model="feed.state"
        rows="2"
        autosize
        label="描述"
        type="textarea"
        maxlength="80"
        placeholder="请填写问题描述"
        show-word-limit
      />
      <!-- </van-cell-group> -->
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="feed.type" direction="horizontal">
            <van-radio name="建议">建议</van-radio>
            <van-radio name="问题">问题</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader
            :after-read="onRead"
            v-model="fileList"
            multiple
            :max-count="1"
          />
          <!-- <img :src="feed.pic" alt="" style="height:300px;width:280px;background-color:antiquewhite"> -->
          <!-- </van-uploader> -->
        </template>
      </van-field>

      <van-field
        v-model="feed.name"
        name="称呼"
        label="称呼"
        placeholder="称呼（XX先生/女士）"
        :rules="[{ required: true, message: '请填写您的称呼' }]"
      />
      <van-field
        v-model="feed.telephone"
        name="联系方式"
        label="联系方式"
        placeholder="联系方式（电话/微信/QQ）"
        :rules="[{ required: true, message: '请填写您的联系方式' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit(feed)">
          提交
        </van-button>
      </div>
      <div style="width: 200px"></div>
    </van-form>

    <van-dialog
      v-model:show="show"
      confirmButtonColor="#5493e9"
      style="align-items: center; text-align: center"
      :showConfirmButton="false"
    >
      <div style="margin-block: 20px">提交成功，感谢您的反馈</div>
    </van-dialog>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue"
import showtop from "@/components/line/showtop.vue"
import axios from "axios"
import Api from "@/api/Api"
import TopNav from "@/components/line/topNav.vue"

export default {
  components: { showtop, TopNav },
  setup () {
    const state = reactive({
      feed: {
        name: "",
        telephone: "",
        title: "",
        state: "",
        author: "",
        type: "建议",
      },
    })
    const fileList = ref([])

    const format = new FormData()
    const onRead = (file) => {
      //  console.log(file)
      state.pub = "flase"
      // let formData = new window.FormData();
      format.append("avatar", file.file)
    }
    const onSubmit = (values) => {
      state.feed.create_date = new Date()
      console.log("submit", values)
      console.log(state.feed)
      Api.createfeed(state.feed)
        .then((data) => {
          // tlist=data
          if (data.message == "创建出错") {
            console.log("创建出错")
          } else {
            var id = data.id
            format.append("id", id)
            console.log(format.get("id"))
          }
        })
        .catch((err) => {
          console.log(err)
        })
      setTimeout(() => {
        if (format.get("avatar")) {
          axios
            .post("http://localhost:3000/api/feed/uploadpic", format)
            .then((data) => {
              if (data.message == "创建出错") {
                console.log("创建出错")
              } else {
                console.log("提交成功")
                show.value = true
                setTimeout(() => {
                  location.reload()
                }, 1000)
              }
            })
        } else {
          show.value = true
          setTimeout(() => {
            location.reload()
          }, 1000)
        }
      }, 600)
    }
    let show = ref(false)

    return {
      ...toRefs(state),
      onSubmit,
      onRead,
      show,
      fileList
    }
  },
};
</script>
