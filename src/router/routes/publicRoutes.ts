import { shelflingApi } from '@/api/shelflingApi';
import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
    },
    {
        path: '/logout',
        name: 'Logout',
        component: {},
        beforeEnter: async () => {
            if (shelflingApi.isAuthenticated()) {
                await shelflingApi.logOut();
            }
            return { name: 'Login' };
        },
    },
];
