<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    success: [];
}>();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    const res = await fetch('http://api.shelfling.test/api/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    });

    console.log(res);

    // TODO: store auth token

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
