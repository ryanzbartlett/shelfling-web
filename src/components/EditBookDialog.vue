<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue';
import BookForm from '@/components/BookForm.vue';
import { useLibraryBook } from '@/composables/useLibraryBooksQuery';
import type { CreateLibraryBookParams, Library, LibraryBook } from '@/types/shelflingApi';
import { pick } from 'lodash-es';
import { reactive, watch } from 'vue';

const isVisible = defineModel<boolean>({ required: true });

const props = defineProps<{
    library: Library;
    book: LibraryBook | undefined;
}>();

const params = reactive<CreateLibraryBookParams>({
    author: '',
    title: '',
});

watch(isVisible, (val) => {
    if (val) {
        Object.assign(params, pick(props.book, ['author', 'title']));
    }
});

const {
    updateLibraryBook,
    updateLibraryBookPending,
} = useLibraryBook(props.library.id, {
    onUpdateSuccess: () => {
        isVisible.value = false;
    },
});
</script>

<template>
    <BaseDialog v-model="isVisible">
        <BookForm
            v-model="params"
            :disabled="updateLibraryBookPending"
            submit-text="Update"
            @submit="() => updateLibraryBook({ bookId: props.book!.id, params })"
        />
    </BaseDialog>
</template>
