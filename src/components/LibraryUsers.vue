<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import type { Library, LibraryUser } from '@/types/shelflingApi';
import { getUserRoleText } from '@/utils/libraries';
import { Icon } from '@iconify/vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useUserStore } from '@/stores/userStore';
import { usePermissions } from '@/composables/usePermissions';

const props = defineProps<{
    library: Library;
}>();

const queryClient = useQueryClient();
const userStore = useUserStore();
const { canManageLibraryUsers } = usePermissions();

const {
    data: libraryUsers,
    isFetching: fetchingLibraryUsers,
} = useQuery({
    queryKey: ['libraryUsers', props.library.id],
    queryFn: () => shelflingApi.getLibraryUsers(props.library.id),
});

const {
    mutate: removeUser,
} = useMutation({
    mutationFn: (userId: number) => shelflingApi.removeLibraryUsers(props.library.id, userId),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['libraryUsers', props.library.id] });
    },
});

const headers: { key: keyof LibraryUser; text: string }[] = [
    {
        key: 'name',
        text: 'Name',
    },
    {
        key: 'email',
        text: 'Email',
    },
    {
        key: 'role',
        text: 'Role',
    },
];

function canRemoveUser(user: LibraryUser) {
    const notCurrentUser = userStore.user?.id !== user.id;
    return canManageLibraryUsers(props.library)
        && notCurrentUser;
}
</script>

<template>
    <div class="library-users">
        <div v-if="fetchingLibraryUsers">Loading users...</div>
        <table v-else class="w-full text-left border-collapse border">
            <thead>
                <tr>
                    <th v-for="col in headers" :key="col.key" class="border py-1 px-2">
                        {{ col.text }}
                    </th>
                    <th class="border py-1 px-2">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in libraryUsers" :key="user.id">
                    <td v-for="col in headers" :key="col.key" class="border py-1 px-2">
                        <template v-if="col.key === 'role'">{{ getUserRoleText(user[col.key]) }}</template>
                        <template v-else>{{ user[col.key] }}</template>
                    </td>
                    <td class="border py-1 px-2">
                        <Icon
                            v-if="canRemoveUser(user)"
                            icon="mdi:delete-circle"
                            class="text-2xl text-red-800 cursor-pointer"
                            tabindex="0"
                            @click="removeUser(user.id)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
