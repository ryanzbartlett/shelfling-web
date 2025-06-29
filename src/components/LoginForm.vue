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
            <div class="flex flex-col gap-4">
                <FloatLabel variant="on">
                    <InputText
                        id="email"
                        v-model="email"
                        type="email"
                        required
                        fluid
                    />
                    <label for="email">Email</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Password
                        id="password"
                        v-model="password"
                        :feedback="false"
                        required
                        toggle-mask
                        fluid
                    />
                    <label for="password">Password</label>
                </FloatLabel>
            </div>
            <div>
                <Button
                    :label="logInPending ? 'Logging in...' : 'Log In'"
                    type="submit"
                    :loading="logInPending"
                    fluid
                />
            </div>
        </form>
    </div>
</template>
