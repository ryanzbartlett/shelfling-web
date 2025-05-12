<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue';
import LibraryForm from '@/components/LibraryForm.vue';

const isVisible = defineModel<boolean>({ required: true });

function onCreateLibrarySuccess() {
    isVisible.value = false;
}
</script>

<template>
    <BaseDialog v-model="isVisible">
        <LibraryForm @success="onCreateLibrarySuccess" />
    </BaseDialog>
</template>
