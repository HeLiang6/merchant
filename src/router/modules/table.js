/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/order',
  component: Layout,
  name: 'order',
  children: [
    // {
    //   path: 'order1',
    //   component: () => import('@/views/table/tableIndex'),
    //   name: 'tableIndex',
    //   meta: { title: '订单管理' }
    // },
    {
      path: '',
      component: () => import('@/views/order/index'),
      name: 'order',
      meta: { title: '订单管理', icon: 'money' },
    },
    // {
    //   path: 'details',
    //   component: () => import('@/views/table/components/details'),
    //   name: 'details',
    //   meta: { title: '订单详情' }
    // }
  ],
}
export default tableRouter
