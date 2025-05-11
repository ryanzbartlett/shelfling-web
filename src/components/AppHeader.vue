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
        <RouterLink to="/">
            <h1>Shelfling</h1>
        </RouterLink>
        <AppNav />
        <div>
            <div v-if="userStore.user" class="flex items-center gap-2">
                {{ userStore.user.name }}
                <Icon icon="mdi:logout" class="cursor-pointer" @click="logOut" />
            </div>
            <div v-else>
                <RouterLink to="/login">
                    Log In
                </RouterLink>
            </div>
        </div>
    </header>
</template>
