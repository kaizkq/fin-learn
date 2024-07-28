<!-- src/components/ReferralLink.vue -->
<template>
  <div class="referral-links">
    <h2>推荐链接</h2>
    <p>您可以使用以下链接注册账户，感谢您的支持！</p>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'link'">
          <a :href="text" target="_blank">{{ text }}</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ReferralLink',
  setup() {
    const columns = [
      {
        title: '平台',
        dataIndex: 'platform',
        key: 'platform'
      },
      {
        title: '推荐链接',
        dataIndex: 'link',
        key: 'link'
      }
    ]

    const data = [
      {
        key: '1',
        platform: 'Tiger',
        link: 'https://tigr.link/9nmYkl'
      },
      {
        key: '2',
        platform: 'Webull',
        link: 'https://www.webull.com.au/s/Q2cauOr0PufFumhuQmna'
      },
      {
        key: '3',
        platform: 'Moomoo',
        link: 'https://j.au.moomoo.com/01aTsl?income=309526c9e2ef143ce16431e85738457fa79e6d7850d333fbc980f2114f9c4315'
      },
      {
        key: '4',
        platform: 'IBKR',
        link: 'https://ibkr.com/referral/kaiqi654'
      }
    ]

    return {
      columns,
      data
    }
  }
})
</script>

<style scoped>
.referral-links {
  padding: 24px;
}
</style>
