<template>
  <a-layout-sider width="200">
    <a-menu mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1">Fee-Rate Calculator</a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Sidebar',
});
</script>