<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h1>欢迎使用 Fin-learn</h1>
    <a-typography>
      <a-typography-title :level="2">使用指南</a-typography-title>
      <a-typography-paragraph> </a-typography-paragraph>

      <a-typography-title :level="3">费用计算器</a-typography-title>
      <a-typography-paragraph>
        1. 在左侧菜单中点击"费用计算器"。<br />
        2. 选择股票市场（美国或澳洲）。<br />
        3. 选择交易类型（买入、卖出或买入+卖出）。<br />
        4. 选择交易平台。<br />
        5. 输入股票价格和股数。<br />
        6. 点击"计算"按钮查看详细的费用明细。
      </a-typography-paragraph>

      <a-typography-title :level="3">推荐链接</a-typography-title>
      <a-typography-paragraph>
        如果大家有需要注册，欢迎使用我的推荐链接，万分感激<br />
      </a-typography-paragraph>

      <a-typography-title :level="3">注意事项</a-typography-title>
      <a-typography-paragraph>
        • 费用计算器提供的结果仅供参考，实际费用可能会有所不同。<br />
        • 在进行实际交易前，请务必仔细阅读各平台的费用说明。<br />
        • 股票投资有风险，入市须谨慎。
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard'
})
</script>

<style scoped>
.dashboard {
  padding: 24px;
}
</style>
