<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import { LibraryTypes, type Library } from '@/types/shelflingApi';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

const libraries = ref<Library[]>();
const loadingLibraries = ref(false);

async function getLibraries() {
    try {
        loadingLibraries.value = true;
        libraries.value = await shelflingApi.getLibraries();
    } catch (error) {
        console.error(error);
    } finally {
        loadingLibraries.value = false;
    }
}

onMounted(() => {
    getLibraries();
});
</script>

<template>
    <div class="library-list">
        <div v-if="loadingLibraries">
            Loading libraries...
        </div>
        <ul v-else-if="libraries">
            <li v-for="library in libraries" :key="library.id" class="flex items-center gap-2">
                <Icon :icon="library.type === LibraryTypes.Book ? 'mdi:book' : 'mdi:filmstrip'" inline />
                {{ library.name }}
            </li>
        </ul>
        <div v-else>
            Something went wrong ☹️
        </div>
    </div>
</template>
