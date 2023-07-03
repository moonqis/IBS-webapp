<template>
  <div>
    <van-skeleton title avatar :row="3" :loading="loading">
      <div>11</div>
    </van-skeleton>
    <!-- <van-skeleton title avatar :row="3" /> -->
    <van-skeleton>
      <template #template>
        <div :style="{ display: 'flex', width: '100%' }">
          <!-- <van-skeleton-image /> -->
          <div :style="{ flex: 1, marginLeft: '16px' }">
                 
          </div>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const loading = ref(true);

    onMounted(() => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    });

    return {
      loading,
    };
  },
};
</script>
