<template>
    
    <div class="iconList">
        <div class="iconItem" @click="Goto('水果')">
                <img :src="icon1" class="icon1">  
            <span>水果</span>
        </div>
        <div class="iconItem"  @click="Goto('饮料')">
            <img :src="icon2" class="icon1">  

            <span>饮料</span>
        </div>
        <div class="iconItem" @click="Goto('乳制品')">
            <img :src="icon3" class="icon1">  

            <span>乳制品</span>
        </div>
        
        <div class="iconItem" @click="Goto('糖类')">
            <img :src="icon4" class="icon1">  

            <span>糖类</span>
        </div>
        

    </div>
    <div class="iconList">
        <div class="iconItem" @click="Goto('油脂')">
            <img :src="icon5" class="icon1">  

            <span>油脂</span>
        </div>
        <div class="iconItem" @click="Goto('小吃')">
            <img :src="icon6" class="icon1">  

            <span>小吃</span>
        </div>
        <div class="iconItem" @click="Goto('蔬菜')">
            <img :src="icon7" class="icon1">  

            <span>蔬菜</span>
        </div>
        
        <div class="iconItem" @click="Goto('蛋白质')">
            <img :src="icon8" class="icon1">  

            <span>蛋白质</span>
        </div>
        

    </div>
    <div class="iconList">
        <div class="iconItem" @click="Goto('碳水化合物')">
            <img :src="icon9" class="icon1">  

            <span style="width: 0.9rem;text-align: center;">碳水化合物</span>
        </div>
        <div class="iconItem" @click="Goto('豆类,坚果')">
            <img :src="icon10" class="icon1">  

            <span>豆类,坚果</span>
        </div>
        <div class="iconItem" @click="Goto('调味品')">
            <img :src="icon11" class="icon1">  

            <span>调味品</span>
        </div>
        
        <div class="iconItem" @click="Goto('膳食剂')">
            <img :src="icon12" class="icon1">  

            <span>膳食剂</span>
        </div>
        

    </div>
</template>

<script>
import router from '@/router'
import store from '@/store'
import { reactive, toRefs } from 'vue'

export default {
    setup() {
        const route = router
        const Goto=(index)=>{
            store.state.index=index
            route.push('/food')
        }
        const state=reactive({
            icon1:require("@/assets/icon/shiwutubiao-25.png"),
            icon2:require("@/assets/icon/shiwutubiao-21.png"),
            icon3:require("@/assets/icon/shiwutubiao-05.png"),
            icon4:require("@/assets/icon/shiwutubiao-12.png"),
            icon5:require("@/assets/icon/youhu.png"),
            icon6:require("@/assets/icon/shiwutubiao-04.png"),
            icon7:require("@/assets/icon/shucai.png"),
            icon8:require("@/assets/icon/shiwutubiao-06.png"),
            icon9:require("@/assets/icon/shiwutubiao-07.png"),
            icon10:require("@/assets/icon/jianguo.png"),
            icon11:require("@/assets/icon/tiaoliao_.png"),
            icon12:require("@/assets/icon/a-yaopinbaojianpin.png"),

        })
        return{
            Goto,
            ...toRefs(state)
        }
    },
}
</script>


<style lang="less" scoped>
    .iconList{
        width: 350px;
        display: flex;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        justify-content: space-between; //两边布局 向两边靠
        .iconItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon1{
                width: 0.9rem;
            }
            .icon{
                width: 0.9rem;
                height: 0.7rem;
            }
            span{
                margin-top: 2px;

                font-size: 0.25rem;
            }
        }

    }
</style>