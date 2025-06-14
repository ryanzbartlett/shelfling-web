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
        path: '/libraries/:libraryId',
        name: 'LibraryParent',
        component: () => import('@/views/LibraryParent.vue'),
        props: true,
        children: [
            {
                path: '',
                name: 'Library',
                component: () => import('@/views/LibraryView.vue'),
            },
            {
                path: 'settings',
                name: 'LibrarySettings',
                component: () => import('@/views/LibrarySettingsView.vue'),
            },
        ],
    },
    {
        path: '/libraries/:libraryId/books/:bookId',
        name: 'Book',
        component: () => import('@/views/BookView.vue'),
        props: true,
    },
];

export default routes.map((route: RouteRecordRaw) => {
    set(route, 'meta.requiresAuth', true);
    return route;
});
