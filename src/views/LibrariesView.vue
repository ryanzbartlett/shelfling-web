<script setup lang="ts">
import LibraryList from '@/components/LibraryList.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import CreateLibraryDialog from '@/components/CreateLibraryDialog.vue';
import { ref } from 'vue';

const isCreateLibraryDialogVisible = ref(false);

function showCreateLibraryDialog() {
    isCreateLibraryDialogVisible.value = true;
}

function onLibraryDeleted() {}
</script>

<template>
    <LayoutDefault>
        <header class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold">
                My Libraries
            </h2>
            <div>
                <button @click="showCreateLibraryDialog">
                    &plus; New Library
                </button>
            </div>
        </header>
        <CreateLibraryDialog v-model="isCreateLibraryDialogVisible" />
        <hr class="my-4 opacity-25">
        <LibraryList @library-deleted="onLibraryDeleted" />
    </LayoutDefault>
</template>
