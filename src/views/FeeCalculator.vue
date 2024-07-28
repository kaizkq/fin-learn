<template>
  <div class="fee-calculator">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form :model="formState" @finish="onFinish" layout="vertical">
          <a-form-item label="股票市场" name="market">
            <a-select v-model:value="formState.market">
              <a-select-option value="US">美国股票</a-select-option>
              <a-select-option value="AU">澳洲股票</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="交易类型" name="transactionType">
            <a-select v-model:value="formState.transactionType">
              <a-select-option value="buy">买入</a-select-option>
              <a-select-option value="sell">卖出</a-select-option>
              <a-select-option value="buySell">买入+卖出</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="平台" name="platform">
            <a-select v-model:value="formState.platform">
              <a-select-option value="tiger">老虎证券</a-select-option>
              <a-select-option value="webull">微牛</a-select-option>
              <a-select-option value="moomoo">富途牛牛</a-select-option>
              <a-select-option value="ibkr">盈透证券</a-select-option>
              <a-select-option value="superhero">Superhero</a-select-option>
              <a-select-option value="commsec">Commsec</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="股票价格" name="stockPrice">
            <a-input-number
              v-model:value="formState.stockPrice"
              :min="0"
              :step="0.01"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item label="股数" name="quantity">
            <a-input-number
              v-model:value="formState.quantity"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">计算</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="12">
        <h3>计算结果：</h3>
        <p>
          交易金额: {{ tradeValue.toFixed(2) }} {{ formState.market === 'US' ? '美元' : '澳元' }}
        </p>
        <template v-if="formState.transactionType === 'buySell'">
          <h4>买入费用：</h4>
          <a-table :dataSource="buyTableData" :columns="columns" :pagination="false">
            <template #footer>
              <strong
                >买入总费用： {{ buyTotalFee.toFixed(2) }}
                {{ formState.market === 'US' ? '美元' : '澳元' }}</strong
              >
            </template>
          </a-table>
          <h4>卖出费用：</h4>
          <a-table :dataSource="sellTableData" :columns="columns" :pagination="false">
            <template #footer>
              <strong
                >卖出总费用： {{ sellTotalFee.toFixed(2) }}
                {{ formState.market === 'US' ? '美元' : '澳元' }}</strong
              >
            </template>
          </a-table>
          <h3>
            总计费用： {{ (buyTotalFee + sellTotalFee).toFixed(2) }}
            {{ formState.market === 'US' ? '美元' : '澳元' }}
          </h3>
        </template>
        <template v-else>
          <a-table :dataSource="tableData" :columns="columns" :pagination="false">
            <template #footer>
              <strong
                >总费用： {{ totalFee.toFixed(2) }}
                {{ formState.market === 'US' ? '美元' : '澳元' }}</strong
              >
            </template>
          </a-table>
        </template>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { message } from 'ant-design-vue'

interface FormState {
  market: 'US' | 'AU'
  transactionType: 'buy' | 'sell' | 'buySell'
  platform: string
  stockPrice: number
  quantity: number
}

interface Fee {
  name: string
  value: number
}

interface CalculationResult {
  totalFee: number
  feeBreakdown: Fee[]
}

export default defineComponent({
  name: 'FeeCalculator',
  setup() {
    const formState = reactive<FormState>({
      market: 'US',
      transactionType: 'buy',
      platform: 'tiger',
      stockPrice: 0,
      quantity: 0
    })

    const result = ref<CalculationResult>({ totalFee: 0, feeBreakdown: [] })

    const tradeValue = computed(() => formState.stockPrice * formState.quantity)

    const calculateFees = (isSellOrder: boolean): CalculationResult => {
      const fees: Fee[] = []
      let totalFee = 0

      const addFee = (name: string, value: number) => {
        fees.push({ name, value: Math.ceil(value * 100) / 100 })
        totalFee += value
      }

      switch (formState.platform) {
        case 'ibkr':
          if (formState.market === 'US') {
            addFee('固定部分', 0.005 * formState.quantity)
            addFee('浮动部分', 0.0035 * formState.quantity)
            addFee('SEC交易费', 0.0000278 * tradeValue.value)
            if (isSellOrder) {
              addFee('FINRA交易活动费', 0.000166 * formState.quantity)
            }
            addFee('清算费', 0.0002 * formState.quantity)
            addFee('转手费', totalFee * 0.000175)
          } else {
            const baseFee = Math.max(6.6, (0.088 * tradeValue.value) / 100)
            addFee('基本费用', baseFee)
            addFee('每笔交易费', 5.5)
          }
          break
        case 'superhero':
          if (formState.market === 'US') {
            addFee('基本费用', 2)
            if (tradeValue.value > 20000) {
              addFee('附加费用', (tradeValue.value - 20000) * 0.0001)
            }
          } else {
            addFee('基本费用', 2)
            if (tradeValue.value > 20000) {
              addFee('附加费用', (tradeValue.value - 20000) * 0.0001)
            }
          }
          break
        case 'webull':
          if (formState.market === 'US') {
            addFee('交易费用', Math.max(0.00025 * tradeValue.value, 0))
            if (isSellOrder) {
              addFee('SEC费用', Math.max(0.0000278 * tradeValue.value, 0.01))
              addFee('TAF费用', Math.min(Math.max(0.000166 * formState.quantity, 0.01), 8.3))
            }
          } else {
            addFee('交易费用', Math.max(0.0003 * tradeValue.value, 4.9))
          }
          break
        case 'moomoo':
          if (formState.market === 'US') {
            addFee('基本费用', 0.99)
            addFee('结算费', Math.min(0.003 * formState.quantity, 0.01 * tradeValue.value))
            if (isSellOrder) {
              addFee('SEC费用', Math.max(0.0000278 * tradeValue.value, 0.01))
              addFee('交易活动费', Math.min(Math.max(0.000166 * formState.quantity, 0.01), 8.3))
            }
          } else {
            addFee('交易费用', Math.max(3, 0.0003 * tradeValue.value))
          }
          break
        case 'tiger':
          if (formState.market === 'US') {
            addFee('交易费用', Math.max(0.013 * formState.quantity, 2))
            if (isSellOrder) {
              addFee('SEC费用', Math.max(0.0000278 * tradeValue.value, 0.01))
              addFee('交易活动费', Math.min(Math.max(0.000166 * formState.quantity, 0.01), 8.3))
            }
          } else {
            addFee('交易费用', Math.max(0.00055 * tradeValue.value, 5.5))
          }
          break
        case 'commsec':
          if (formState.market === 'US') {
            addFee('交易费用', Math.max(5, 0.0012 * tradeValue.value))
          } else {
            if (tradeValue.value <= 1000) {
              addFee('交易费用', 5)
            } else if (tradeValue.value <= 3000) {
              addFee('交易费用', 10)
            } else if (tradeValue.value <= 10000) {
              addFee('交易费用', 19.95)
            } else if (tradeValue.value <= 25000) {
              addFee('交易费用', 29.95)
            } else {
              addFee('交易费用', 0.0012 * tradeValue.value)
            }
          }
          break
      }

      return { totalFee: Math.ceil(totalFee * 100) / 100, feeBreakdown: fees }
    }

    const onFinish = () => {
      if (formState.stockPrice <= 0 || formState.quantity <= 0) {
        message.error('请输入有效的股票价格和股数。')
        return
      }

      if (formState.transactionType === 'buySell') {
        const buyResult = calculateFees(false)
        const sellResult = calculateFees(true)
        result.value = {
          totalFee: buyResult.totalFee + sellResult.totalFee,
          feeBreakdown: [
            ...buyResult.feeBreakdown.map((fee) => ({ ...fee, name: `买入 - ${fee.name}` })),
            ...sellResult.feeBreakdown.map((fee) => ({ ...fee, name: `卖出 - ${fee.name}` }))
          ]
        }
      } else {
        result.value = calculateFees(formState.transactionType === 'sell')
      }
    }

    const columns = [
      {
        title: '费用项目',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '金额',
        dataIndex: 'value',
        key: 'value',
        align: 'right' as const,
        render: (text: number) => text.toFixed(2)
      }
    ]

    const tableData = computed(() => result.value.feeBreakdown)
    const totalFee = computed(() => result.value.totalFee)

    const buyTableData = computed(() =>
      result.value.feeBreakdown.filter((fee) => fee.name.startsWith('买入'))
    )
    const sellTableData = computed(() =>
      result.value.feeBreakdown.filter((fee) => fee.name.startsWith('卖出'))
    )
    const buyTotalFee = computed(() => buyTableData.value.reduce((sum, fee) => sum + fee.value, 0))
    const sellTotalFee = computed(() =>
      sellTableData.value.reduce((sum, fee) => sum + fee.value, 0)
    )

    return {
      formState,
      onFinish,
      columns,
      tableData,
      totalFee,
      tradeValue,
      buyTableData,
      sellTableData,
      buyTotalFee,
      sellTotalFee
    }
  }
})
</script>
