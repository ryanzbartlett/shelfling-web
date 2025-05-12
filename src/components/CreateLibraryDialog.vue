<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import LibraryForm from '@/components/LibraryForm.vue';

const isVisible = defineModel<boolean>({ required: true });

const createLibraryDialog = useTemplateRef('createLibraryDialog');

function assertCreateLibraryDialog() {
    if (!createLibraryDialog.value) throw new Error('Create library dialog missing');
    return createLibraryDialog.value;
}

function showCreateLibraryDialog() {
    assertCreateLibraryDialog().showModal();
}

function closeCreateLibraryDialog() {
    assertCreateLibraryDialog().close();
}

function onCreateLibrarySuccess() {
    closeCreateLibraryDialog();
}

function toggleCreateLibraryDialog(show: boolean) {
    if (show) {
        showCreateLibraryDialog();
    } else {
        closeCreateLibraryDialog();
    }
}

watch(isVisible, toggleCreateLibraryDialog);
</script>

<template>
    <dialog ref="createLibraryDialog" class="m-auto">
        <LibraryForm @success="onCreateLibrarySuccess" />
    </dialog>
</template>
