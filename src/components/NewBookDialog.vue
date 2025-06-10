<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue';
import BookForm from '@/components/BookForm.vue';
import type { Library } from '@/types/shelflingApi';

const isVisible = defineModel<boolean>({ required: true });

defineProps<{
    library: Library;
}>();

function onCreateBookSuccess() {
    isVisible.value = false;
}
</script>

<template>
    <BaseDialog v-model="isVisible">
        <BookForm
            :library-id="library.id"
            @success="onCreateBookSuccess"
        />
    </BaseDialog>
</template>
