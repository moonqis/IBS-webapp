<template>
  <div style="display: flex">
    <div class="flexStyle">
      <div
        v-for="index in list"
        :key="index"
        style="margin-right: 20px;display: flex;"
      >
        <img class="contentStyle" :src="index.picurl "/>
        <div style="display: flex; flex-direction: column; ">
          <span>{{index.name}}</span>
          <span>{{index.eglish_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, toRefs, onMounted } from "vue";

export default {
  setup() {
    const state = reactive({
      list:[
        {
          picurl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name:'香蕉',
          eglish_name:'banana',
        },{
          picurl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name:'苹果',
          eglish_name:'apple',
        },{
          picurl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name:'梨',
          eglish_name:'peal',
        },{
          picurl:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name:'香蕉',
          eglish_name:'banana',
        },
      ]
    });
    return{
      ...toRefs(state)
    }
  },
  data() {
    return {
      cj: 1,
    };
  },
  methods: {},
};
</script>
<style>
.flexStyle {
  width: 95%;
  height: 80px;
  display: flex;
  /* justify-content: space-between; */
  /* 设置超出滚动 */
  overflow-x: auto;
}
.contentStyle {
  width: 50px;
  height: 50px;
  display: inline-block;
  background: #a3a2a2;
  /* 超出滚动的关键，没有它元素会自动缩小，不会滚动 */
  flex-shrink: 0;
  margin-right: 10px;
}
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
</style>
    