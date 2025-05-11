import type { RouteRecordRaw } from 'vue-router';

const authRoutes: RouteRecordRaw[] = [
    {
        path: '/libraries',
        name: 'Libraries',
        component: () => import('@/views/LibrariesView.vue'),
    },
];

export {
    authRoutes,
};
