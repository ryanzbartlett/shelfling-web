<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function onSuccess() {
    router.push('/');
}
</script>

<template>
    <div class="login-view">
        <LoginForm @success="onSuccess" />
    </div>
</template>
