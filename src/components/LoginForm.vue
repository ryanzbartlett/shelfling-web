<script setup lang="ts">
import { ref } from 'vue';
import { shelflingApi } from '@/api/shelflingApi';

const emit = defineEmits<{
    success: [];
}>();

const email = ref('');
const password = ref('');

const logInPending = ref(false);
const handleLogin = async () => {
    try {
        logInPending.value = true;

        await shelflingApi.logIn({
            email: email.value,
            password: password.value,
        });

        emit('success');
    } catch (error) {
        console.error(error);
    } finally {
        logInPending.value = false;
    }
};
</script>

<template>
    <div class="login-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="handleLogin"
        >
            <div class="flex flex-col gap-2">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        required
                    >
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    :disabled="logInPending"
                >
                    <template v-if="logInPending">
                        Logging in...
                    </template>
                    <template v-else>
                        Log In
                    </template>
                </button>
            </div>
        </form>
    </div>
</template>
