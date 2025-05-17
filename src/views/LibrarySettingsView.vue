<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import LibraryUsersForm from '@/components/LibraryUsersForm.vue';
import { useQuery } from '@tanstack/vue-query';
import { shelflingApi } from '@/api/shelflingApi';
import type { Library } from '@/types/shelflingApi';
import { usePermissions } from '@/composables/usePermissions';

const props = defineProps<{
    library: Library;
}>();

const { canManageLibraryUsers } = usePermissions();

const {
    data: libraryUsers,
    isFetching: fetchingLibraryUsers,
} = useQuery({
    queryKey: ['libraryUsers', props.library.id],
    queryFn: () => shelflingApi.getLibraryUsers(props.library.id),
});
</script>

<template>
    <LayoutDefault class="library-view space-y-4">
        <h2>Library Settings</h2>
        <hr />
        <div class="space-y-2">
            <h3>Users</h3>
            <div>
                <div v-if="fetchingLibraryUsers">Loading users...</div>
                <ul v-else>
                    <li v-for="user in libraryUsers" :key="user.id">
                        {{ user.name }} | {{ user.email }} | {{ user.role }}
                    </li>
                </ul>
            </div>
            <LibraryUsersForm v-if="canManageLibraryUsers(library)" :library-id="library.id" />
        </div>
    </LayoutDefault>
</template>
