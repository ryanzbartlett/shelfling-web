<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
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
    <LayoutDefault class="login-view flex items-center justify-center">
        <LoginForm class="w-100 max-w-[20rem]" @success="onSuccess" />
    </LayoutDefault>
</template>
