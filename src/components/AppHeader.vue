<script setup lang="ts">
import { useShelflingApi } from '@/composables/useShelflingApi';
import { useUserStore } from '@/stores/userStore';
import { Icon } from '@iconify/vue';
import AppNav from '@/components/AppNav.vue';

const { logOut } = useShelflingApi();

const userStore = useUserStore();
</script>

<template>
    <header class="app-header flex justify-between items-center border-b h-[4.5rem] px-4">
        <RouterLink
            :to="{ name: 'Home' }"
            class="home-link"
        >
            <h1>Shelfling</h1>
        </RouterLink>
        <AppNav />
        <div>
            <div
                v-if="userStore.user"
                class="flex items-center gap-2"
            >
                <RouterLink :to="{ name: 'Account' }">
                    {{ userStore.user.name }}
                </RouterLink>
                <Icon
                    icon="mdi:logout"
                    class="cursor-pointer"
                    @click="logOut"
                />
            </div>
            <div v-else>
                <RouterLink to="/login">
                    Log In
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped>
.router-link-active:not(.home-link) {
    text-decoration: underline;
    text-underline-offset: 0.25em;
}
</style>
