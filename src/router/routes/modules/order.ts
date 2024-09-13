import { DEFAULT_LAYOUT } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const PROFILE: AppRouteRecordRaw = {
  path: '/order',
  name: 'Order',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.order',
    requiresAuth: true,
    icon: 'icon-unordered-list',
    order: 4,
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/order/list/index.vue'),
      meta: {
        hideInMenu: false,
        locale: 'menu.order.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'detail',
      name: 'Detail',
      component: () => import('@/views/order/detail/index.vue'),
      meta: {
        hideInMenu: true,
        locale: 'menu.order.detail',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PROFILE;
