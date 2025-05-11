import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { shelflingApi } from '@/api/shelflingApi';

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
            path: '/logout',
            name: 'Logout',
            component: () => import('@/views/LogoutView.vue'),
        },
        {
            path: '/libraries',
            name: 'Libraries',
            component: () => import('@/views/LibrariesView.vue'),
            meta: {
                requiresAuth: true,
            },
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
