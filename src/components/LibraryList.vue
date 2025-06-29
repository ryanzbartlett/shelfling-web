<script setup lang="ts">
import { useLibraries, useLibrary } from '@/composables/useLibraries';
import { usePermissions } from '@/composables/usePermissions';
import { LibraryTypes, type Library } from '@/types/shelflingApi';
import { getRelativeTime } from '@/utils/date';
import { useConfirm } from 'primevue/useconfirm';

const emit = defineEmits<{
    libraryDeleted: [payload: number];
}>();

const confirmDelete = useConfirm();

const {
    canEditLibrary,
    canDeleteLibrary,
} = usePermissions();

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

function onClickDelete(e: MouseEvent, library: Library) {
    confirmDelete.require({
        target: e.currentTarget as HTMLElement,
        header: 'Delete Library',
        message: `Are you sure you want to delete "${library.name}"? This action cannot be undone.`,
        acceptProps: {
            label: 'Delete',
            severity: 'danger',
        },
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
        },
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteLibary(library.id),
    });
}
</script>

<template>
    <div class="library-list">
        <div v-if="fetchingLibraries">
            Loading libraries...
        </div>
        <div v-else-if="libraries">
            <ol
                v-if="libraries.length > 0"
                class="flex flex-col gap-2"
            >
                <li
                    v-for="library in libraries"
                    :key="library.id"
                >
                    <Card>
                        <template #content>
                            <div class="flex gap-4 items-center">
                                <div class="text-2xl">
                                    <i
                                        :class="{
                                            'pi pi-book': library.type === LibraryTypes.Book,
                                            'pi pi-play-circle': library.type === LibraryTypes.Movie
                                        }"
                                        :style="{ fontSize: 'inherit' }"
                                    />
                                </div>
                                <div class="grow flex flex-col gap-1">
                                    <RouterLink
                                        :to="{ name: 'Library', params: { libraryId: library.id } }"
                                        class="text-lg font-semibold"
                                    >
                                        {{ library.name }}
                                    </RouterLink>
                                    <div
                                        class="text-sm opacity-65"
                                        :title="new Date(library.updated_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })"
                                    >
                                        Last updated: {{ getRelativeTime(+new Date(library.updated_at)) }}
                                    </div>
                                </div>
                                <div class="flex gap-1">
                                    <Button
                                        v-if="canEditLibrary(library)"
                                        icon="pi pi-pen-to-square"
                                        variant="text"
                                        rounded
                                        aria-label="Edit library"
                                        disabled
                                        @click.stop="null"
                                    />
                                    <Button
                                        v-if="canDeleteLibrary(library)"
                                        icon="pi pi-trash"
                                        variant="text"
                                        severity="danger"
                                        rounded
                                        aria-label="Delete library"
                                        @click.stop="onClickDelete($event, library)"
                                    />
                                </div>
                            </div>
                        </template>
                    </Card>
                </li>
            </ol>
            <div v-else>
                No libraries yet. Go make some! 🤪
            </div>
        </div>
        <div v-else>
            Something went wrong ☹️
        </div>
        <ConfirmDialog />
    </div>
</template>
