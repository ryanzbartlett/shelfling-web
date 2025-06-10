<script setup lang="ts">
import NewBookDialog from '@/components/NewBookDialog.vue';
import { useLibraryBooksQuery } from '@/composables/useLibraryBooksQuery';
import type { Library } from '@/types/shelflingApi';
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
</script>

<template>
    <div class="library-view space-y-4">
        <button
            title="test"
            @click="openNewBookDialog"
        >
            Add Book
        </button>
        <ol class="space-y-2">
            <li
                v-for="book in libraryBooks"
                :key="book.id"
                class="border rounded-md p-3"
            >
                <div class="font-medium">
                    {{ book.title }}
                </div>
                <div class="text-sm">
                    by {{ book.author }}
                </div>
                <div class="text-xs opacity-65">
                    added {{ new Date(book.created_at).toLocaleString() }}
                </div>
            </li>
        </ol>
        <NewBookDialog
            v-model="isNewBookDialogVisible"
            :library="library"
        />
    </div>
</template>
