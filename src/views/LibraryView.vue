<script setup lang="ts">
import EditBookDialog from '@/components/EditBookDialog.vue';
import NewBookDialog from '@/components/NewBookDialog.vue';
import { usePermissions } from '@/composables/usePermissions';
import type { Library, LibraryBook } from '@/types/shelflingApi';
import { ref } from 'vue';
import BookList from '@/components/BookList.vue';

defineProps<{
    library: Library;
}>();

const { canEditLibrary } = usePermissions();

const isNewBookDialogVisible = ref(false);
function openNewBookDialog() {
    isNewBookDialogVisible.value = true;
}

const isEditBookDialogVisible = ref(false);
const activeBook = ref<LibraryBook>();
function openEditBookDialog(book: LibraryBook) {
    activeBook.value = book;
    isEditBookDialogVisible.value = true;
}
</script>

<template>
    <div class="library-view space-y-4">
        <button
            v-if="canEditLibrary(library)"
            title="test"
            @click="() => openNewBookDialog()"
        >
            Add Book
        </button>
        <BookList
            :library="library"
            @edit="openEditBookDialog"
        />
        <NewBookDialog
            v-model="isNewBookDialogVisible"
            :library="library"
        />
        <EditBookDialog
            v-model="isEditBookDialogVisible"
            :library="library"
            :book="activeBook"
        />
    </div>
</template>
