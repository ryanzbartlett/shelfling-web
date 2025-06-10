<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

const userStore = useUserStore();

interface NavItem {
    id: number;
    label: string;
    route: RouteLocationNamedRaw;
}

const makeNavItems = (items: Omit<NavItem, 'id'>[]) => {
    return items.map<NavItem>((i, idx) => {
        return { ...i, id: idx + 1 };
    });
};

const defaultItems = makeNavItems([]);

const authItems = makeNavItems([
    {
        label: 'Libraries',
        route: { name: 'Libraries' },
    },
]);

const navItems = computed(() => userStore.user ? authItems : defaultItems);
</script>

<template>
    <nav>
        <ul class="flex items-center gap-2">
            <li
                v-for="item in navItems"
                :key="item.id"
            >
                <RouterLink :to="item.route">
                    {{ item.label }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
a {
    &.router-link-active {
        text-decoration: underline;
        text-underline-offset: 0.25em;
    }
}
</style>
