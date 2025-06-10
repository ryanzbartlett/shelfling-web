<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { shelflingApi } from '@/api/shelflingApi';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const DEFAULT_USER_ROUTE_PATH = '/libraries';

async function onSuccess() {
    try {
        userStore.setUser(await shelflingApi.getUser());
        const redirect = (route.query.from ?? DEFAULT_USER_ROUTE_PATH) as string;
        router.push(redirect);
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    if (shelflingApi.isAuthenticated()) {
        router.replace(DEFAULT_USER_ROUTE_PATH);
    }
});
</script>

<template>
    <LayoutDefault class="login-view flex items-center justify-center">
        <LoginForm
            class="w-100 max-w-[20rem]"
            @success="onSuccess"
        />
    </LayoutDefault>
</template>
