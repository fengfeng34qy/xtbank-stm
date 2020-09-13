export default [{
  path: '@/modules/test1/child.vue',
  page: () => import('@/modules/test1/child.vue')
}, {
  path: '@/modules/test2/test2.vue',
  page: () => import('@/modules/test2/test2.vue')
}, {
  path: '@/modules/remittance/remittance.vue',
  page: () => import('@/modules/remittance/remittance.vue')
}
];
