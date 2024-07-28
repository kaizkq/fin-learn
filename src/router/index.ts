// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import FeeCalculator from '../views/FeeCalculator.vue'
import ReferralLink from '../views/ReferralLink.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/fee-calculator',
    name: 'FeeCalculator',
    component: FeeCalculator
  },
  {
    path: '/referral-links',
    name: 'ReferralLinks',
    component: ReferralLink
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
