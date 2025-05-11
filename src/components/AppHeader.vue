<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const router = useRouter();

async function logOut() {
    await shelflingApi.logOut();
    router.push('/login');
}
</script>

<template>
    <header class="app-header">
        <h1>Shelfling</h1>
        <div>
            <div v-if="userStore.user">
                {{ userStore.user.name }}
                <button @click="logOut">
                    Log Out
                </button>
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
.app-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
}
</style>
