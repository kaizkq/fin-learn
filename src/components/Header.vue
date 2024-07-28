<template>
  <a-layout-header>
    <h1>Your App Name</h1>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style scoped>
.ant-layout-header {
  background: #fff;
  padding: 0 50px;
  line-height: 64px;
}
</style>