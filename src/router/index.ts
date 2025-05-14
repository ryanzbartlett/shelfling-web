import { createRouter, createWebHistory } from 'vue-router';
import { shelflingApi } from '@/api/shelflingApi';
import publicRoutes from './routes/publicRoutes';
import authRoutes from './routes/authRoutes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...publicRoutes,
        ...authRoutes,
        {
            path: '/not-found',
            name: 'NotFound',
            component: () => import('@/views/NotFound.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: { name: 'NotFound' },
        },
    ],
});

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !shelflingApi.isAuthenticated()) {
        return {
            name: 'Login',
            query: {
                from: to.path,
            },
        };
    }
});

export default router;
