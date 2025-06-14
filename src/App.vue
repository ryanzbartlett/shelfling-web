<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { useUserStore } from '@/stores/userStore';
import { shelflingApi } from '@/api/shelflingApi';
import { AxiosError } from 'axios';

const userStore = useUserStore();

async function setUser() {
    if (!shelflingApi.isAuthenticated()) return;

    try {
        const user = await shelflingApi.getUser();
        userStore.setUser(user);
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                shelflingApi.revokeAccess();
            }
        }

        console.error('Failed to fetch user:', error);
    }
}

onMounted(async () => {
    await setUser();
});
</script>

<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>
