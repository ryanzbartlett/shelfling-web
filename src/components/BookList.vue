<script setup lang="ts">
import { useLibraryBook, useLibraryBooksQuery } from '@/composables/useLibraryBooksQuery';
import { usePermissions } from '@/composables/usePermissions';
import type { Library, LibraryBook } from '@/types/shelflingApi';

const props = defineProps<{
    library: Library;
}>();

const emit = defineEmits<{
    edit: [book: LibraryBook];
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
</script>

<template>
    <div class="book-list">
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
                        added {{ new Date(book.created_at).toLocaleString() }} | copies: {{ book.exemplar_count }}
                    </div>
                </div>
                <div>
                    <button
                        v-if="canEditLibrary(library)"
                        @click="() => emit('edit', book)"
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
    </div>
</template>
