import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue'),
        },
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

export default router;
