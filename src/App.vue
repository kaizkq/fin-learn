<!-- App.vue -->
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img src="@/assets/logokai.png" alt="Logo" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="dashboard">
          <router-link to="/">
            <dashboard-outlined />
            <span>主页</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="fee-calculator">
          <router-link to="/fee-calculator">
            <calculator-outlined />
            <span>费用计算器</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="referral-links">
          <router-link to="/referral-links">
            <link-outlined />
            <span>推荐链接</span>
          </router-link>
        </a-menu-item>
        <!-- Add more menu items as needed -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff">
        <h1 style="margin-left: 16px">Stock Trading Tools</h1>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Fin-learn ©2024 Created by Kai
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DashboardOutlined, CalculatorOutlined, LinkOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    DashboardOutlined,
    CalculatorOutlined,
    LinkOutlined
  },
  setup() {
    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<string[]>(['dashboard'])

    return {
      collapsed,
      selectedKeys
    }
  }
})
</script>

<style>
.logo {
  height: 32px;
  margin: 16px;
  text-align: center;
}
.logo img {
  height: 100%;
  width: auto;
}
</style>
