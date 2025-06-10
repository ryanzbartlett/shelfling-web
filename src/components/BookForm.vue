<script setup lang="ts">
import { reactive, ref } from 'vue';

const emit = defineEmits<{
    success: [];
}>();

const getDefaultBook = () => ({
    title: '',
    author: '',
});

const newBook = reactive<{
    title: string;
    author: string;
}>(getDefaultBook());

function resetFormFields() {
    Object.assign(newBook, getDefaultBook());
}

const createBookPending = ref(false);

async function createBook() {
    console.log({
        title: newBook.title,
        author: newBook.author,
    });
    resetFormFields();
    emit('success');
}
</script>

<template>
    <div class="book-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="() => createBook()"
        >
            <div class="form-group">
                <label for="title">Title</label>
                <input
                    id="title"
                    v-model="newBook.title"
                    type="text"
                    maxlength="255"
                    required
                >
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input
                    id="author"
                    v-model="newBook.author"
                    type="text"
                    maxlength="255"
                    required
                >
            </div>
            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="createBookPending"
                >
                    Add
                </button>
            </div>
        </form>
    </div>
</template>
