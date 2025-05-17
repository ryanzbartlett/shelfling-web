<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { shelflingApi } from '@/api/shelflingApi';
import type { AddLibraryUsersParams } from '@/types/shelflingApi';
import { LibraryUserRoles } from '@/types/shelflingApi';

const props = defineProps<{
    libraryId: string;
}>();

const emit = defineEmits<{
    success: [];
}>();

interface Member {
    email: string;
    role: 1 | 2 | 3;
}

const getDefaultMember = (): Member => ({ email: '', role: LibraryUserRoles.Viewer });

const members = ref<Member[]>([getDefaultMember()]);

function addMember() {
    members.value.push(getDefaultMember());
}

function removeMember(index: number) {
    if (members.value.length > 1) {
        members.value.splice(index, 1);
    }
}

function submitForm() {
    addLibraryUsers({
        users: members.value,
    });
}

const {
    mutate: addLibraryUsers,
    isPending,
} = useMutation({
    mutationFn: (params: AddLibraryUsersParams) => shelflingApi.addLibraryUsers(props.libraryId, params),
    onSuccess: () => {
        members.value = [getDefaultMember()];
        emit('success');
    },
});
</script>

<template>
    <div class="library-users-form border p-4">
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
            <div v-for="(member, index) in members" :key="index" class="member-row flex items-center gap-4">
                <input
                    type="email"
                    v-model="member.email"
                    placeholder="Email address"
                    required
                    class="flex-grow"
                />
                <select v-model="member.role" required class="w-32">
                    <option value="" disabled>Select role</option>
                    <option :value="LibraryUserRoles.Owner">Owner</option>
                    <option :value="LibraryUserRoles.Editor">Editor</option>
                    <option :value="LibraryUserRoles.Viewer">Viewer</option>
                </select>
                <button
                    v-if="members.length > 1"
                    type="button"
                    class="px-2 py-1"
                    @click="removeMember(index)"
                >
                    Remove
                </button>
            </div>
            <div class="flex justify-between">
                <button type="button" class="px-4 py-2" @click="addMember">Add User</button>
                <button type="submit" :disabled="isPending" class="px-4 py-2">Submit</button>
            </div>
        </form>
    </div>
</template>
