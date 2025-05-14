<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';

defineProps<{
    id: string;
}>();
</script>

<template>
    <LayoutDefault class="library-view">
        <h2>Library</h2>
        <p>{{ id }}</p>
    </LayoutDefault>
</template>
