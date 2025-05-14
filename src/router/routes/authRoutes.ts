import type { RouteRecordRaw } from 'vue-router';
import { set } from 'lodash-es';

const routes: RouteRecordRaw[] = [
    {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/AccountView.vue'),
    },
    {
        path: '/libraries',
        name: 'Libraries',
        component: () => import('@/views/LibrariesView.vue'),
    },
    {
        path: '/libraries/:id',
        name: 'Library',
        component: () => import('@/views/LibraryView.vue'),
        props: true,
    },
];

export default routes.map((route: RouteRecordRaw) => {
    set(route, 'meta.requiresAuth', true);
    return route;
});
