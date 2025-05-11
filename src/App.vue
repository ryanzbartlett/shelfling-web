<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { useUserStore } from '@/stores/userStore';
import { shelflingApi } from '@/api/shelflingApi';

const userStore = useUserStore();

async function setUser() {
    if (!shelflingApi.isAuthenticated()) return;

    try {
        const user = await shelflingApi.getUser();
        userStore.setUser(user);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        userStore.clearUser();
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
