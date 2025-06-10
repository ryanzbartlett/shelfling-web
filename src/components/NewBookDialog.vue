<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue';
import BookForm from '@/components/BookForm.vue';

const isVisible = defineModel<boolean>({ required: true });

function onCreateBookSuccess() {
    isVisible.value = false;
}
</script>

<template>
    <BaseDialog v-model="isVisible">
        <BookForm @success="onCreateBookSuccess" />
    </BaseDialog>
</template>
