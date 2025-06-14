<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { shelflingApi } from '@/api/shelflingApi';

const props = defineProps<{
    libraryId: string;
    bookId: string;
}>();

const {
    data: libraryBook,
} = useQuery({
    queryKey: ['libraryBook', props.libraryId, props.bookId],
    queryFn: () => shelflingApi.getLibraryBook(props.libraryId, props.bookId),
});
</script>

<template>
    <div class="book-view">
        <pre>{{ libraryBook }}</pre>
    </div>
</template>
