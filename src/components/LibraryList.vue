<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import { LibraryTypes, type Library } from '@/types/shelflingApi';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
    libraryDeleted: [payload: string];
}>();

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

const deleteLibraryPending = ref(false);
async function deleteLibrary(id: string) {
    try {
        deleteLibraryPending.value = true;
        await shelflingApi.deleteLibrary(id);
        emit('libraryDeleted', id);
    } catch (error) {
        console.error(error);
    } finally {
        deleteLibraryPending.value = false;
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
        <div v-else-if="libraries">
            <ul v-if="libraries.length > 0">
                <li v-for="library in libraries" :key="library.id" class="flex items-center gap-2">
                    <div class="flex items-center gap-2">
                        <Icon :icon="library.type === LibraryTypes.Book ? 'mdi:book' : 'mdi:filmstrip'" inline />
                        {{ library.name }}
                    </div>
                    <div>
                        <Icon icon="mdi:delete-circle" class="cursor-pointer" inline @click="deleteLibrary(library.id)" />
                    </div>
                </li>
            </ul>
            <div v-else>
                No libraries yet. Go make some! 🤪
            </div>
        </div>
        <div v-else>
            Something went wrong ☹️
        </div>
    </div>
</template>
