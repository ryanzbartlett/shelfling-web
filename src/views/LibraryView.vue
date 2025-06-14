<script setup lang="ts">
import EditBookDialog from '@/components/EditBookDialog.vue';
import NewBookDialog from '@/components/NewBookDialog.vue';
import { useLibraryBooksQuery } from '@/composables/useLibraryBooksQuery';
import type { Library, LibraryBook } from '@/types/shelflingApi';
import { ref } from 'vue';

const props = defineProps<{
    library: Library;
}>();

const {
    data: libraryBooks,
} = useLibraryBooksQuery(props.library.id);

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
                    <button @click="() => openEditBookDialog(book)">
                        Edit
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
