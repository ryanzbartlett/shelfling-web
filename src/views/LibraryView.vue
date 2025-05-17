<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';

defineProps<{
    id: string;
}>();
</script>

<template>
    <LayoutDefault class="library-view flex flex-col gap-4">
        <header class="flex justify-between items-center">
            <h2>Library</h2>
            <div>
                <RouterLink :to="{ name: 'LibrarySettings' }">Settings</RouterLink>
            </div>
        </header>
        <hr />
        <div>
            Details
        </div>
    </LayoutDefault>
</template>
