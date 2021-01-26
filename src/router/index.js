import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Block from '@/view/Block'
import Transaction from '@/view/Transaction'
// import Accounts from '@/view/Accounts'
// import store from '@/store'
// import {Message} from 'element-ui'

const HomeContent = () => import('@/view/HomeContent')
const BlockDetail = () => import('@/view/Block/blockDetail')
const TransactionDetail = () => import('@/view/Transaction/transactionDetail')
const AccountDetail = () => import('@/view/Accounts/accountDetail')
const error = () => import('@/view/common/404.vue')
// const features = () => import('@/view/features')
// const Wallet = () => import('@/view/wallet/index')
// const Account = () => import('@/view/account')
// const CreateKeys = () => import('@/view/createKeys')
// const ImportKey = () => import('@/view/importKey')
// const Producers = () => import('@/view/producers')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: 'home',
          name: '首页',
          component: HomeContent
        },
        {
          path: 'block',
          name: '区块',
          component: Block
        },
        {
          path: 'blockDetail',
          name: '详情',
          type: 'child', // 是否属于子路由
          component: BlockDetail
        },
        {
          path: 'accountDetail',
          name: '账户',
          type: 'child', // 是否属于子路由
          component: AccountDetail
        },
        {
          path: 'transaction',
          name: '交易',
          component: Transaction
        },
        {
          path: 'transactionDetail',
          name: '交易详情',
          type: 'child', // 是否属于子路由
          component: TransactionDetail
        },
        {
          path: '*',
          component: error
        }
      ]
      // children: [
      //   {
      //     name: 'features',
      //     path: 'features',
      //     component: features,
      //     alias: '/'
      //   },
      //   {
      //     name: 'createkeys',
      //     path: 'createkeys',
      //     component: CreateKeys
      //   },
      //   {
      //     name: 'wallet',
      //     path: 'wallet',
      //     component: Wallet,
      //     meta: {
      //       requiresAuth: true,
      //       needConnectNet: true
      //     }
      //   },
      //   {
      //     name: 'account',
      //     path: 'account',
      //     component: Account,
      //     meta: {
      //       needConnectNet: true
      //     }
      //   },
      //   {
      //     name: 'importkeys',
      //     path: 'importkeys',
      //     component: ImportKey,
      //     meta: {
      //       needConnectNet: true
      //     }
      //   },
      //   {
      //     name: 'producers',
      //     path: 'producers',
      //     component: Producers,
      //     meta: {
      //       requiresAuth: true,
      //       needConnectNet: true
      //     }
      //   },
      //   {
      //     name: 'test',
      //     path: 'test',
      //     component: () => import('@/view/test'),
      //     meta: {
      //       // requiresAuth: true,
      //       needConnectNet: true
      //     }
      //   },
      //   {
      //     name: 'setting',
      //     path: 'setting',
      //     component: () => import('@/view/setting')
      //   }
      // ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  // if (!store.state.eosConfig && to.matched.some(record => record.meta.needConnectNet)) {
  //   Message.warning('此选项需要先进行网络设置！')
  //   next({
  //     path: '/setting',
  //     query: { redirect: to.fullPath }
  //   })
  // } else {
  //   if (to.matched.some(record => record.meta.requiresAuth)) {
  //     if (!store.state.isOnline) {
  //       Message.warning('此选项需要先导入密匙！')
  //       next({
  //         path: '/importkeys',
  //         query: { redirect: to.fullPath }
  //       })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next()
  //   }
  // }
})

router.afterEach((to, from) => {
})

export default router
