<script setup lang="ts">
import LibraryUsersForm from '@/components/LibraryUsersForm.vue';
import type { Library } from '@/types/shelflingApi';
import { usePermissions } from '@/composables/usePermissions';
import LibraryUsers from '@/components/LibraryUsers.vue';

defineProps<{
    library: Library;
}>();

const { canManageLibraryUsers } = usePermissions();
</script>

<template>
    <div class="library-settings-view space-y-4">
        <div class="space-y-2">
            <div class="border p-4 space-y-3">
                <h3>Users</h3>
                <LibraryUsers :library="library" />
                <LibraryUsersForm v-if="canManageLibraryUsers(library)" :library-id="library.id" />
            </div>
        </div>
    </div>
</template>
