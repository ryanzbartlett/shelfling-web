<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
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
    <div class="library-parent">
        <div v-if="fetchingLibrary">Loading library...</div>
        <div v-else-if="library">
            <header class="flex justify-between items-center">
                <h2>{{ library.name }}</h2>
                <div>
                    <RouterLink :to="{ name: 'Library' }">Details</RouterLink>
                    <RouterLink :to="{ name: 'LibrarySettings' }">Settings</RouterLink>
                </div>
            </header>
            <RouterView :library="library" />
        </div>
    </div>
</template>
