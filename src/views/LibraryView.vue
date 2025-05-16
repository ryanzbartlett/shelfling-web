<script setup lang="ts">
import { ref } from 'vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { useMutation } from '@tanstack/vue-query';
import { shelflingApi } from '@/api/shelflingApi';
import type { AddLibraryUsersParams } from '@/types/shelflingApi';

const props = defineProps<{
    id: string;
}>();

interface Member {
    email: string;
    role: 1 | 2 | 3;
}

const getDefaultMember = (): Member => ({ email: '', role: 3 });

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
} = useMutation({
    mutationFn: (params: AddLibraryUsersParams) => shelflingApi.addLibraryUsers(props.id, params),
});
</script>

<template>
    <LayoutDefault class="library-view">
        <h2>Library</h2>
        <hr />
        <form @submit.prevent="submitForm">
            <div v-for="(member, index) in members" :key="index" class="member-row" style="margin-bottom: 1rem;">
                <input
                    type="email"
                    v-model="member.email"
                    placeholder="Email address"
                    required
                    style="margin-right: 1rem;"
                />
                <select v-model="member.role" required style="margin-right: 1rem;">
                    <option value="" disabled>Select role</option>
                    <option :value="1">Owner</option>
                    <option :value="2">Editor</option>
                    <option :value="3">Viewer</option>
                </select>
                <button type="button" @click="removeMember(index)" v-if="members.length > 1">Remove</button>
            </div>
            <button type="button" @click="addMember" style="margin-right: 1rem;">Add Row</button>
            <button type="submit">Submit</button>
        </form>
    </LayoutDefault>
</template>
