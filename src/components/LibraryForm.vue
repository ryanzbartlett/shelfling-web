<script setup lang="ts">
import { shelflingApi } from '@/api/shelflingApi';
import { LibraryTypes, type LibraryType } from '@/types/shelflingApi';
import { reactive, ref } from 'vue';

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

const createLibraryPending = ref(false);

async function createLibrary() {
    try {
        createLibraryPending.value = true;
        await shelflingApi.createLibrary(newLibrary);
        resetFormFields();
        emit('success');
    } catch (error) {
        console.error(error);
    } finally {
        createLibraryPending.value = false;
    }
}
</script>

<template>
    <div class="library-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="createLibrary"
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
