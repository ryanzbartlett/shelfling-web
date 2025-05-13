<script setup lang="ts">
import { useLibrary } from '@/composables/useLibraries';
import { LibraryTypes, type LibraryType } from '@/types/shelflingApi';
import { reactive } from 'vue';

const emit = defineEmits<{
    success: [];
}>();

const getDefaultLibrary = () => ({
    name: '',
    type: LibraryTypes.Book,
});

const newLibrary = reactive<{
    name: string;
    type: LibraryType;
}>(getDefaultLibrary());

function resetFormFields() {
    Object.assign(newLibrary, getDefaultLibrary());
}

const {
    createLibrary,
    createLibraryPending,
} = useLibrary({
    onCreateSuccess: () => {
        resetFormFields();
        emit('success');
    },
});
</script>

<template>
    <div class="library-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="() => createLibrary(newLibrary)"
        >
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    id="name"
                    v-model="newLibrary.name"
                    type="text"
                    maxlength="255"
                    required
                />
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <select
                    id="type"
                    v-model="newLibrary.type"
                    required
                >
                    <option :value="1">Book</option>
                    <option :value="2">Movie</option>
                </select>
            </div>
            <div>
                <button
                    type="submit"
                    :disabled="createLibraryPending"
                >
                    Create
                </button>
            </div>
        </form>
    </div>
</template>
