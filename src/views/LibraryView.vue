<script setup lang="ts">
import EditBookDialog from '@/components/EditBookDialog.vue';
import NewBookDialog from '@/components/NewBookDialog.vue';
import { useLibraryBooksQuery, useLibraryBook } from '@/composables/useLibraryBooksQuery';
import { usePermissions } from '@/composables/usePermissions';
import type { Library, LibraryBook } from '@/types/shelflingApi';
import { ref } from 'vue';

const props = defineProps<{
    library: Library;
}>();

const { canEditLibrary } = usePermissions();

const {
    data: libraryBooks,
} = useLibraryBooksQuery(props.library.id);

const {
    deleteLibraryBook,
    deleteLibraryBookPending,
} = useLibraryBook(props.library.id, {
    onDeleteSuccess: () => {},
});

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
        <ol class="space-y-2">
            <li
                v-for="book in libraryBooks"
                :key="book.id"
                class="border rounded-md p-3 flex justify-between"
            >
                <div>
                    <div class="font-medium">
                        <RouterLink :to="{ name: 'Book', params: { bookId: book.id } }">
                            {{ book.title }}
                        </RouterLink>
                    </div>
                    <div class="text-sm">
                        by {{ book.author }}
                    </div>
                    <div class="text-xs opacity-65">
                        added {{ new Date(book.created_at).toLocaleString() }}
                    </div>
                </div>
                <div>
                    <button
                        v-if="canEditLibrary(library)"
                        @click="() => openEditBookDialog(book)"
                    >
                        Edit
                    </button>
                    <button
                        v-if="canEditLibrary(library)"
                        class="text-red-500"
                        :disabled="deleteLibraryBookPending"
                        @click="() => deleteLibraryBook(book.id)"
                    >
                        Del
                    </button>
                </div>
            </li>
        </ol>
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
