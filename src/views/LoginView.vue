<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { shelflingApi } from '@/api/shelflingApi';

const router = useRouter();
const userStore = useUserStore();

async function onSuccess() {
    try {
        userStore.setUser(await shelflingApi.getUser());
        router.push('/');
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="login-view">
        <LoginForm @success="onSuccess" />
    </div>
</template>
