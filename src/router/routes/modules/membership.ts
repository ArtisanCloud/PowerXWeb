import { DEFAULT_LAYOUT } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const PROFILE: AppRouteRecordRaw = {
  path: '/membership',
  name: 'Membership',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.membership',
    requiresAuth: true,
    icon: 'icon-file',
    order: 4,
  },
  children: [
    {
      path: 'list',
      name: 'MembershipList',
      component: () => import('@/views/membership/list/index.vue'),
      meta: {
        hideInMenu: false,
        locale: 'menu.membership.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'purchase',
      name: 'Purchase',
      component: () => import('@/views/membership/purchase/index.vue'),
      meta: {
        hideInMenu: false,
        locale: 'menu.membership.purchase',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'detail',
      name: 'Detail',
      component: () => import('@/views/membership/detail/index.vue'),
      meta: {
        hideInMenu: true,
        locale: 'menu.membership.detail',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PROFILE;
