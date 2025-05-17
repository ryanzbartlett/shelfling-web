<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import LibraryUsersForm from '@/components/LibraryUsersForm.vue';

defineProps<{
    id: string;
}>();
</script>

<template>
    <LayoutDefault class="library-view space-y-4">
        <h2>Library Settings</h2>
        <hr />
        <div class="space-y-2">
            <h3>Users</h3>
            <LibraryUsersForm :library-id="id" />
        </div>
    </LayoutDefault>
</template>
