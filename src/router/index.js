import Vue from 'vue'
import Router from 'vue-router'

// const Home = resolve => {
//   require.ensure(['@/pages/home'], () => {
//     resolve(require('@/pages/home'))
//   })
// }

// 资金管理
const PayIndex = resolve => {
  require.ensure(['@/pages/Payment/index'], () => {
    resolve(require('@/pages/Payment/index'))
  })
}
const Money = resolve => {
  require.ensure(['@/pages/Payment/money'], () => {
    resolve(require('@/pages/Payment/money'))
  })
}
const Addbank = resolve => {
  require.ensure(['@/pages/Payment/addbank'], () => {
    resolve(require('@/pages/Payment/addbank'))
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/',
      redirect: '/Payment/index'
    },
    {
      path: '/Payment/index',
      name: 'PayIndex',
      component: PayIndex
    },
    {
      path: '/Payment/addbank',
      name: 'Addbank',
      component: Addbank
    },
    {
      path: '/Payment/money',
      name: 'Money',
      component: Money
    }
  ]
})
