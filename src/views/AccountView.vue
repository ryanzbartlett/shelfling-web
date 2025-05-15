<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <LayoutDefault class="account-view flex flex-col gap-4">
        <h2>My Account</h2>
        <form>
            <div class="flex flex-col gap-2">
                <div class="form-group">
                    <label for="user-name">Name</label>
                    <input id="user-name" type="text" :value="userStore.user?.name" readonly />
                </div>
                <div class="form-group">
                    <label for="user-email">Email</label>
                    <input id="user-email" type="email" :value="userStore.user?.email" readonly />
                </div>
            </div>
        </form>
    </LayoutDefault>
</template>
