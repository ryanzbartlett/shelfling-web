<script setup lang="ts">
import { useLibraries, useLibrary } from '@/composables/useLibraries';
import { LibraryTypes } from '@/types/shelflingApi';
import { Icon } from '@iconify/vue';
import { usePermissions } from '@/composables/usePermissions';

const emit = defineEmits<{
    libraryDeleted: [payload: string];
}>();

const { canDeleteLibrary } = usePermissions();

const {
    data: libraries,
    isFetching: fetchingLibraries,
} = useLibraries();

const {
    deleteLibary,
} = useLibrary({
    onDeleteSuccess: (id) => {
        emit('libraryDeleted', id);
    },
});
</script>

<template>
    <div class="library-list">
        <div v-if="fetchingLibraries">
            Loading libraries...
        </div>
        <div v-else-if="libraries">
            <ul v-if="libraries.length > 0">
                <li
                    v-for="library in libraries"
                    :key="library.id"
                    class="flex items-center gap-2"
                >
                    <RouterLink
                        :to="{ name: 'Library', params: { id: library.id } }"
                        class="flex items-center gap-2"
                    >
                        <Icon
                            :icon="library.type === LibraryTypes.Book ? 'mdi:book' : 'mdi:filmstrip'"
                            inline
                        />
                        {{ library.name }}
                    </RouterLink>
                    <div v-if="canDeleteLibrary(library)">
                        <Icon
                            icon="mdi:delete-circle"
                            class="cursor-pointer"
                            inline
                            @click="deleteLibary(library.id)"
                        />
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
