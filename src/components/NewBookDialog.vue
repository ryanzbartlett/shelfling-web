<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue';
import BookForm from '@/components/BookForm.vue';
import IsbnSearchForm from '@/components/IsbnSearchForm.vue';
import { useLibraryBook } from '@/composables/useLibraryBooksQuery';
import type { CreateLibraryBookParams, Library } from '@/types/shelflingApi';
import { reactive, watch } from 'vue';

const isVisible = defineModel<boolean>({ required: true });

const props = defineProps<{
    library: Library;
}>();

const getDefaultParams = (): CreateLibraryBookParams => ({
    author: '',
    title: '',
});

const params = reactive<CreateLibraryBookParams>(getDefaultParams());

function resetParams() {
    Object.assign(params, getDefaultParams());
}

function onBookFound(book: { author_name: string[]; title: string }) {
    params.author = book.author_name[0];
    params.title = book.title;
}

watch(isVisible, (val) => {
    if (!val) {
        resetParams();
    }
});

const {
    createLibraryBook,
    createLibraryBookPending,
} = useLibraryBook(props.library.id, {
    onCreateSuccess: () => {
        isVisible.value = false;
    },
});
</script>

<template>
    <BaseDialog v-model="isVisible">
        <IsbnSearchForm
            @found="onBookFound"
        />
        <BookForm
            v-model="params"
            :disabled="createLibraryBookPending"
            @submit="() => createLibraryBook(params)"
        />
    </BaseDialog>
</template>
