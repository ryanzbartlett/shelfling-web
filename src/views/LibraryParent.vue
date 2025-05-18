<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { useQuery } from '@tanstack/vue-query';

const props = defineProps<{
    id: string;
}>();

const {
    data: library,
    isFetching: fetchingLibrary,
} = useQuery({
    queryKey: ['library', props.id],
    queryFn: () => shelflingApi.getLibrary(props.id),
});
</script>

<template>
    <LayoutDefault class="library-parent">
        <div v-if="fetchingLibrary">Loading library...</div>
        <div v-else-if="library" class="space-y-4">
            <header class="flex justify-between items-center">
                <h2>{{ library.name }}</h2>
                <div class="space-x-2">
                    <RouterLink :to="{ name: 'Library' }">Books</RouterLink>
                    <RouterLink :to="{ name: 'LibrarySettings' }">Settings</RouterLink>
                </div>
            </header>
            <hr>
            <RouterView :library="library" />
        </div>
    </LayoutDefault>
</template>
