<script setup lang="ts">
import { ref } from 'vue';
import { shelflingApi } from '@/api/shelflingApi';

const emit = defineEmits<{
    success: [];
}>();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    await shelflingApi.logIn({
        email: email.value,
        password: password.value,
    });

    emit('success');
};
</script>

<template>
    <div class="login-form">
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Log In</button>
        </form>
    </div>
</template>
