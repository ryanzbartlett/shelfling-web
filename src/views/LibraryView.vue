<script setup lang="ts">
import { useLibraryBooksQuery } from '@/composables/useLibraryBookQuery';
import type { Library } from '@/types/shelflingApi';

const props = defineProps<{
    library: Library;
}>();

const {
    data: libraryBooks,
} = useLibraryBooksQuery(props.library.id);
</script>

<template>
    <div class="library-view space-y-4">
        <ol class="space-y-2">
            <li v-for="book in libraryBooks" :key="book.id" class="border rounded-md">
                <pre>{{ book }}</pre>
            </li>
        </ol>
    </div>
</template>
