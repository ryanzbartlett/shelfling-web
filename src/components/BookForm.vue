<script setup lang="ts">
import { useLibraryBook } from '@/composables/useLibraryBooksQuery';
import { reactive, ref } from 'vue';

const props = defineProps<{
    libraryId: string;
}>();

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
    isbn.value = '';
}

const {
    createLibraryBook,
    createLibraryBookPending,
} = useLibraryBook(props.libraryId, {
    onCreateSuccess: () => {
        resetFormFields();
        emit('success');
    },
});

const isbn = ref('');

const getFromIsbnPending = ref(false);

async function getFromIsbn() {
    getFromIsbnPending.value = true;

    try {
        const result = await fetch(`https://openlibrary.org/search.json?isbn=${isbn.value}`);
        const data = await result.json();
        const book = data.docs[0];
        if (!book) return;

        newBook.author = book.author_name[0];
        newBook.title = book.title;
    } catch (error) {
        console.error(error);
    } finally {
        getFromIsbnPending.value = false;
    }
}
</script>

<template>
    <div class="book-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="() => getFromIsbn()"
        >
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input
                    id="isbn"
                    v-model="isbn"
                    type="text"
                    minlength="10"
                    maxlength="13"
                    required
                >
            </div>
            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="getFromIsbnPending"
                >
                    Search
                </button>
            </div>
        </form>
        <form
            class="flex flex-col gap-4"
            @submit.prevent="() => createLibraryBook(newBook)"
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
                    :disabled="createLibraryBookPending"
                >
                    Add
                </button>
            </div>
        </form>
    </div>
</template>
