<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { Icon } from '@iconify/vue';

const userStore = useUserStore();
const router = useRouter();

async function logOut() {
    await shelflingApi.logOut();
    router.push('/login');
}
</script>

<template>
    <header class="app-header flex justify-between items-center border-b h-[4.5rem] px-4">
        <RouterLink to="/">
            <h1>Shelfling</h1>
        </RouterLink>
        <div>
            <div v-if="userStore.user" class="flex items-center gap-2">
                {{ userStore.user.name }}
                <Icon icon="mdi:logout" class="cursor-pointer" @click="logOut"><desc>test</desc></Icon>
            </div>
            <div v-else>
                <RouterLink to="/login">
                    Log In
                </RouterLink>
            </div>
        </div>
    </header>
</template>
