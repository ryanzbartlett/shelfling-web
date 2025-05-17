<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';

defineProps<{
    id: string;
}>();
</script>

<template>
    <LayoutDefault class="library-view flex flex-col gap-4">
        <div>
            Details
        </div>
    </LayoutDefault>
</template>
